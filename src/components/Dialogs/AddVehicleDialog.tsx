import { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import useToast from "@hooks/useToast";

interface AddVehicleDialogProps {
  open: boolean;
  handleClose: () => void;
  onSubmit: (make: string, model: string, odometer: number) => Promise<void>;
}

export default function AddVehicleDialog(props: AddVehicleDialogProps) {
  const { showSuccess, showError } = useToast();
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [odometer, setOdometer] = useState(0);

  function handleClose() {
    setMake('');
    setModel('');
    setOdometer(0);
    props.handleClose();
  }

  async function handleSubmit() {
    try {
      await props.onSubmit(make, model, odometer);

      handleClose();
      showSuccess("Vehicle added successfully!");
    }
    catch (error: any) {
      showError("Unable to add vehicle: " + error.message);
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
          value={odometer || ""}
          onChange={(event) => {
            event.target.value === "" ? 
              setOdometer(0) : setOdometer(parseInt(event.target.value))}}
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