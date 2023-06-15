import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@utils/supabaseClient';
import useUser from './useUser';
import { Vehicle } from '@utils/types';

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
        ['vehicles'], 
        getVehicles,
        { enabled: user !== null });

    async function getVehicles(): Promise<Vehicle[]> {
        const { data, error } = await supabase
            .from('Refuel.Vehicles')
            .select('make, model, id, odometer')
            .eq('user', user!.id);
    
        if(error) {
            console.log(error);
            return [];
        }
    
        return data as Vehicle[];
    }

    const addVehicleMutation = useMutation(addVehicle, {
        onSuccess: (newVehicle) => {
            queryClient.setQueryData(['vehicles'], (oldVehicles: Vehicle[] | undefined) => {
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
            queryClient.setQueryData(['vehicles'], (oldVehicles: Vehicle[] | undefined) => {
                return oldVehicles?.filter(vehicle => vehicle.id !== deletedVehicleId)
            });
        },
    });

    const updateVehicleMutation = useMutation(updateVehicle, {
        onSuccess: (updatedVehicle) => {
            queryClient.setQueryData(['vehicles'], (oldVehicles: Vehicle[] | undefined) => {
                return oldVehicles?.map(vehicle => {
                    if(vehicle.id === updatedVehicle.id) {
                        return updatedVehicle;
                    }
                    return vehicle;
                })
            });
        },
    });

    async function updateVehicle(updatedVehicle: Vehicle) {
        const { error } = await supabase
            .from('Refuel.Vehicles')
            .update({ make: updatedVehicle.make, model: updatedVehicle.model, odometer: updatedVehicle.odometer })
            .eq('id', updatedVehicle.id);

        if (error) {
            console.log(error);
            throw error;
        }

        return updatedVehicle;
    }

    return { 
        vehicles, 
        isLoading, 
        error, 
        addVehicle: addVehicleMutation.mutateAsync, 
        deleteVehicle: deleteVehicleMutation.mutate,
        updateVehicle: updateVehicleMutation.mutateAsync, 
    };
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