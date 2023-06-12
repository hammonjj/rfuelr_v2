import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useUser from "./useUser";
import useVehicles from "./useVehicles";
import { supabase } from "../utils/supabaseClient";
import { Refuel, RefuelSubmission, Vehicle } from "../utils/types";

export default function useRefuels() {
  const user = useUser();
  const { vehicles, updateVehicle } = useVehicles();
  const queryClient = useQueryClient();

  const { data: refuels, isLoading, error } = useQuery(
    ["refuels"],
    getRefuels,
    { 
      enabled: user !== null && 
        vehicles !== undefined && 
        vehicles?.length > 0
    });

  async function getRefuels() {
    const vehicleIds = vehicles!.map(vehicle => vehicle.id);

    const { data, error } = await supabase
      .from('Refuel.FillUps')
      .select('id, date, vehicle, price_per_gallon, miles_per_gallon, gallons, omit, trip_miles')
      .in('vehicle', vehicleIds)
      .order('date', { ascending: false });

    if (error) {
      console.log(error);
      throw error;
    }

    const refuels = data.map((refuel) => {
      return {
        id: refuel.id,
        date: refuel.date,
        vehicle: vehicles!.find(vehicle => vehicle.id === refuel.vehicle),
        pricePerGallon: refuel.price_per_gallon,
        milesPerGallon: refuel.miles_per_gallon,
        gallons: refuel.gallons,
        omit: refuel.omit,
        tripMiles: refuel.trip_miles,
      }
    });

    return refuels as unknown as Refuel[];
  }

  const addRefuelMutation = useMutation(addRefuel, {
    onSuccess: (newRefuel) => {
      let vehicle = newRefuel.vehicle;
      vehicle.odometer = vehicle.odometer + newRefuel.tripMiles;
      updateVehicle(vehicle);

      queryClient.setQueryData(['refuels'], (oldRefuels: Refuel[] | undefined) => {
        return [...oldRefuels || [], newRefuel]
      });
    },
  });

  async function addRefuel(newRefuel: RefuelSubmission) {
    const newRefuelObj = { 
      date: newRefuel.date,
      vehicle: newRefuel.vehicle.id,
      price_per_gallon: newRefuel.pricePerGallon,
      miles_per_gallon: newRefuel.milesPerGallon,
      gallons: newRefuel.gallons,
      omit: newRefuel.omit,
      trip_miles: newRefuel.tripMiles,
    };

    const { data, error } = await supabase
      .from('Refuel.FillUps')
      .insert(newRefuelObj)
      .select('id, date, vehicle, price_per_gallon, miles_per_gallon, gallons, omit, trip_miles')
      .limit(1)
      .single();

    if (error) {
      console.log(error);
      throw error;
    }

    return { ...newRefuel, id: data.id } as unknown as Refuel;
  }

  const deleteRefuelMutation = useMutation(deleteRefuel, {
    onSuccess: (deletedRefuelId) => {
      if(deletedRefuelId === refuels![0].id) {
        const vehicle = refuels?.find(refuel => refuel.id === deletedRefuelId)?.vehicle;
        vehicle!.odometer = vehicle!.odometer - refuels![0].tripMiles;
        updateVehicle(vehicle!);
      }

      queryClient.setQueryData(['refuels'], (oldRefuels: Refuel[] | undefined) => {
        return oldRefuels?.filter(refuel => refuel.id !== deletedRefuelId)
      });
    },
  });

  async function deleteRefuel(refuelId: string) {
    const { error } = await supabase
      .from('Refuel.FillUps')
      .delete()
      .match({ id: refuelId });

    if (error) {
      console.log(error);
      throw error;
    }

    return refuelId;
  }

  function getRefuelsByVehicle(vehicle: Vehicle) {
    return refuels === undefined ? [] : 
      refuels?.filter(refuel => refuel.vehicle.id === vehicle.id);
  }
  
  return { 
    getRefuelsByVehicle, 
    isLoading, 
    error, 
    addRefuel: addRefuelMutation.mutate, 
    deleteRefuel: deleteRefuelMutation.mutate 
  };
}