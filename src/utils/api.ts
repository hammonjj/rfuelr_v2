import { supabase } from './supabaseClient';

export type Method = 'get' | 'post';

export type Refuel = {
    vehicleId: number;
    date: Date;
    tripMiles: number;
    gallons: number;
    milesPerGallon: number;
    pricePerGallon: number;
    latitude: number;
    longitude: number;
};

export const submitRefuel = async (refuel: Refuel) => {
    const { error } = await supabase
        .from('Refuel.FillUps')
        .insert({
            date: refuel.date,
            trip_miles: refuel.tripMiles,
            miles_per_gallon: refuel.milesPerGallon,
            price_per_gallon: refuel.pricePerGallon,
            gallons: refuel.gallons,
            latitude: refuel.latitude,
            longitude: refuel.longitude,
            vehicle: refuel.vehicleId
        });

    return error;
};

export const getRefuels = async (vehicleId: number) => {
    const { data, error } = await supabase
        .from('Refuel.FillUps')
        .select('date, trip_miles, miles_per_gallon, price_per_gallon, gallons')
        .eq('vehicle', vehicleId);

    if(error) {
        console.log(error);
        return null;
    }

    return data;
};