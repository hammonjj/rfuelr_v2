import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Switch, TextField, Typography } from "@mui/material";
import VehicleDropdown from "@components/VehicleDropdown";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from "react";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs';
import useRefuels from "@hooks/useRefuels";
import { Vehicle } from "@utils/types";
import useToast from "@hooks/useToast";
import useLocation from "@hooks/useLocation";

interface SubmitRefuelDialogProps {
  open: boolean;
  handleClose: () => void;
}

export default function SubmitRefuelDialog(props: SubmitRefuelDialogProps) {
  const { showError, showSuccess } = useToast();
  const { location, error} = useLocation();
  const { addRefuel, getRefuelsByVehicle } = useRefuels();
  const [vehicle, setVehicle] = useState<Vehicle | null>();
  const [date, setDate] = useState<Date | null>(new Date());
  const [gallons, setGallons] = useState<number | null>(null);
  const [odometer, setOdometer] = useState<number | null>(null);
  const [omit, setOmit] = useState<boolean>(false);
  const [pricePerGallon, setPricePerGallon] = useState<number | null>(null);

  const vehicleRefuels = vehicle ? getRefuelsByVehicle(vehicle) : [];

  async function onSubmit() {
    const omitFromMetrics = vehicleRefuels.length === 0 ? true : omit;
    const tripMiles = omitFromMetrics ? 0 : odometer! - vehicle?.odometer!;
    const milesPerGallon = omitFromMetrics ? 0 : (odometer! - vehicle?.odometer!) / gallons!;

    try {
      await addRefuel({
        vehicle: vehicle!,
        date: date!,
        gallons: gallons!,
        odometer: odometer!,
        omit: omitFromMetrics,
        pricePerGallon: pricePerGallon!,
        milesPerGallon: milesPerGallon,
        tripMiles: tripMiles,
        latitude: location ? location?.latitude : null,
        longitude: location ? location?.longitude : null
      });
  
      handleClose();
      showSuccess("Refuel submitted successfully");
    } catch (error: any) {
      showError("Unable to submit refuel request: " + error.message);
    }
  }

  function handleClose() {
    setVehicle(null);
    setDate(new Date());
    setGallons(null);
    setOdometer(null);
    setOmit(false);
    setPricePerGallon(null);

    props.handleClose();
  }
  
  return (
    <Dialog open={props.open} fullWidth={true} PaperProps={{ style: { width: '90%', margin: 'auto' }}}>
      <DialogTitle>Submit Refuel</DialogTitle>
      <DialogContent style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <VehicleDropdown setVehicle={setVehicle}/>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Date"
            value={date ? dayjs(date) : null}
            onChange={(newValue) => setDate(newValue ? newValue?.toDate() : null)}
          />
        </LocalizationProvider>
        <TextField
          required
          id="gallons"
          label="Gallons Pumped"
          inputMode="decimal"
          type="number"
          value={gallons || ""}
          onChange={(event) => {
            event.target.value === "" ? 
              setGallons(0) : setGallons(parseFloat(event.target.value))}}
        />
        <TextField
            required
            id="price-per-gallon"
            label="Price per Gallon"
            inputMode="decimal"
            type="number"
            value={pricePerGallon || ""}
            onChange={(event) => {
              event.target.value === "" ?
                setPricePerGallon(0) : setPricePerGallon(parseFloat(event.target.value))}}
            InputProps={{
              startAdornment: <span>$</span>
            }}
        />
        <TextField
          required
          id="odometer"
          label="odometer"
          inputMode="numeric"
          type="number"
          value={odometer || ""}
          onChange={(event) => {
            event.target.value === "" ? 
              setOdometer(0) : setOdometer(parseInt(event.target.value))}}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography>Omit from Metrics:</Typography>
          <Switch 
            checked={omit || vehicleRefuels.length === 0} 
            onChange={(event) => setOmit(event.target.checked)}
            disabled={vehicleRefuels.length === 0}/>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button 
          onClick={onSubmit}
          disabled={vehicle === null || date === null || gallons === null || odometer === null || pricePerGallon === null}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
