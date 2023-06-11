import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import useVehicles, { Vehicle } from "../hooks/useVehicles";
import { useEffect, useState } from "react";

interface VehicleDropdownProps {
  setVehicle: (vehicle: Vehicle) => void
}

export default function VehicleDropdown(props: VehicleDropdownProps) {
  const { vehicles, isLoading } = useVehicles();
  const [vehicle, setVehicle] = useState('');

  function handleChange(event: SelectChangeEvent) {
    setVehicle(event.target.value);
    vehicles?.filter((vehicle) => vehicle.id === event.target.value)[0];
    props.setVehicle(vehicles?.filter((vehicle) => vehicle.id === event.target.value)[0]!);
  }
  
  useEffect(() => {
    if(vehicles?.length === 1 && vehicle === '') {
      setVehicle(vehicles[0].id!);
      props.setVehicle(vehicles[0]);
    }
  }, [vehicles]);

  return (
      <Select
        labelId="vehicle-select-label"
        id="vehicle-select"
        value={vehicle}
        label="Vehicle"
        onChange={handleChange}
        style={{ width: '100%' }}
        disabled={isLoading || vehicles?.length === 1}
      >
        {vehicles?.map((vehicle) => (
          <MenuItem key={vehicle.id} value={vehicle.id}>{vehicle.make + ' ' + vehicle.model}</MenuItem>
        ))}
      </Select>
  );
}