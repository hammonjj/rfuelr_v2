import { useEffect, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { Vehicle } from "@utils/types";
import useToast from "@hooks/useToast";

interface EditVehicleDialogProps {
  open: boolean;
  vehicle: Vehicle | undefined;
  handleClose: () => void;
  onSubmit: (vehicle: Vehicle) => Promise<void>;
}

export default function EditVehicleDialog(props: EditVehicleDialogProps) {
  const { showSuccess, showError } = useToast();
  const [make, setMake] = useState(props.vehicle ? props.vehicle.make : "");
  const [model, setModel] = useState(props.vehicle ? props.vehicle.model : "");
  const [odometer, setOdometer] = useState(props.vehicle ? props.vehicle.odometer : 0);

  useEffect(() => {
    setMake(props.vehicle ? props.vehicle.make : "");
    setModel(props.vehicle ? props.vehicle.model : "");
    setOdometer(props.vehicle ? props.vehicle.odometer : 0);
  }, [props.vehicle]);

  function handleClose() {
    props.handleClose();
  }

  async function handleSubmit() {
    const editedVehicle = {
      id: props.vehicle!.id,
      make: make,
      model: model,
      odometer: odometer
    }

    try {
      await props.onSubmit(editedVehicle);

      handleClose();
      showSuccess("Vehicle edited successfully");
    } catch (error: any) {
      showError("Unable to edit vehicle: " + error.message);
    }
  }

  return (
    <Dialog
      open={props.open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <DialogTitle>Add Vehicle</DialogTitle>
      <DialogContent>
        <TextField
          margin="normal"
          required
          fullWidth
          id="make"
          label="Vehicle Make"
          name="make"
          autoFocus
          value={make}
          onChange={(e) => {
            setMake(e.target.value);
          }}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="model"
          label="Vehicle Model"
          name="model"
          value={model}
          onChange={(e) => {
            setModel(e.target.value);
          }}
        />
        <TextField
  required
  id="odometer"
  label="Current Odometer"
  inputMode="numeric"
  type="number"
  value={odometer}
  onChange={(event) => {
    setOdometer(parseInt(event.target.value))
  }}
/>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button 
          onClick={handleSubmit} 
          disabled={make === '' || model === '' || odometer === 0}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}