import { useQuery } from '@tanstack/react-query';
import { supabase } from '../utils/supabaseClient'
import useUser from './useUser';

interface Vehicle {
    make: string;
    model: string;
    id: string;
}

export default function useVehicles() {
    const user = useUser();

    const { data: vehicles, error } = useQuery(
        ['vehicles', user!.id], 
        getVehicles,
        { enabled: user !== null });

    return { vehicles, error };
}

async function getVehicles({ queryKey }: { queryKey: [string, string] }): Promise<Vehicle[]> {
    //if(queryKey[1] === null) {
    //    console.log('No user found - User null');
    //    return [];
    //}

    const { data, error } = await supabase
        .from('Refuel.Vehicles')
        .select('make, model, id')
        .eq('user', queryKey[1]);

    if(error) {
        console.log(error);
        return [];
    }

    return data as Vehicle[];
}