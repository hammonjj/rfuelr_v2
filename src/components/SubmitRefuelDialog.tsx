import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import VehicleDropdown from "./VehicleDropdown";

interface SubmitRefuelDialogProps {
  open: boolean;
  handleClose: () => void;
  onSubmit: () => void; //Make Refuel Object
}

export default function SubmitRefuelDialog(props: SubmitRefuelDialogProps) {
  function handleClose() {
    props.handleClose();
  }

  return (
    <Dialog open={props.open}>
      <DialogTitle>Submit Refuel</DialogTitle>
      <DialogContent>
        <VehicleDropdown/>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
}