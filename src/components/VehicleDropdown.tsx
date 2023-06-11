import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import useVehicles from "../hooks/useVehicles";
import { useState } from "react";

interface VehicleDropdownProps {
  //setVehicle: (vehicle: Vehicle) => void
}

export default function VehicleDropdown(props: VehicleDropdownProps) {
  const { vehicles } = useVehicles();
  const [vehicle, setVehicle] = useState('');

  function handleChange(event: SelectChangeEvent) {
    setVehicle(event.target.value);
    //props.setVehicle(event.target.value as unknown as Vehicle);
  }
  
  return (
    <>
      <Select
        labelId="vehicle-select-label"
        id="vehicle-select"
        value={vehicle}
        label="Vehicle"
        onChange={handleChange}
        style={{ width: '100%' }}
      >
        {vehicles?.map((vehicle) => (
          <MenuItem key={vehicle.id} value={vehicle.id}>{vehicle.make + ' ' + vehicle.model}</MenuItem>
        ))}
      </Select>
    </>
  );
}