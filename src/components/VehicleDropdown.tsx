import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import useVehicles from "@hooks/useVehicles";
import { useEffect, useState } from "react";
import { Vehicle } from "@utils/types";

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
    else if(vehicles?.filter((vehicle) => vehicle.is_primary === true).length! > 0 && vehicle === '') {
      setVehicle(vehicles?.filter((vehicle) => vehicle.is_primary === true)[0].id!);
      props.setVehicle(vehicles?.filter((vehicle) => vehicle.is_primary === true)[0]!);
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