import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../utils/supabaseClient';
import useUser from './useUser';

export interface Vehicle {
    make: string;
    model: string;
    id: string | undefined;
    odometer: number;
}

interface NewVehicle {
    make: string;
    model: string;
    user: string;
    odometer: number;
}

export default function useVehicles() {
    const user = useUser();
    const queryClient = useQueryClient();

    const { data: vehicles, isLoading, error } = useQuery(
        ['vehicles', user ? user?.id : ""], 
        getVehicles,
        { enabled: user !== null });

    const addVehicleMutation = useMutation(addVehicle, {
        onSuccess: (newVehicle) => {
            queryClient.setQueryData(['vehicles', user ? user?.id : ""], (oldVehicles: Vehicle[] | undefined) => {
                return [...oldVehicles || [], newVehicle]
            });
        },
    });

    async function addVehicle(newVehicle: Vehicle) {
        const newVehicleObj = { ...newVehicle, user: user!.id } as NewVehicle;
    
        const { data, error } = await supabase
            .from('Refuel.Vehicles')
            .insert(newVehicleObj)
            .select('make, model, id, odometer')
            .limit(1)
            .single();
      
        if (error) {
            console.log(error);
            throw error;
        }
        
        return data as unknown as Vehicle;
    }

    const deleteVehicleMutation = useMutation(deleteVehicle, {
        onSuccess: (deletedVehicleId) => {
            queryClient.setQueryData(['vehicles', user ? user?.id : ""], (oldVehicles: Vehicle[] | undefined) => {
                return oldVehicles?.filter(vehicle => vehicle.id !== deletedVehicleId)
            });
        },
    });

    return { 
        vehicles, 
        isLoading, 
        error, 
        addVehicle: addVehicleMutation.mutate, 
        deleteVehicle: deleteVehicleMutation.mutate 
    };
}

async function getVehicles({ queryKey }: { queryKey: [string, string] }): Promise<Vehicle[]> {
    const { data, error } = await supabase
        .from('Refuel.Vehicles')
        .select('make, model, id, odometer')
        .eq('user', queryKey[1]);

    if(error) {
        console.log(error);
        return [];
    }

    return data as Vehicle[];
}

async function deleteVehicle(vehicleId: string) {
    const { error } = await supabase
        .from('Refuel.Vehicles')
        .delete()
        .eq('id', vehicleId);
  
    if (error) {
        console.log(error);
        throw error;
    }
  
    return vehicleId;
}