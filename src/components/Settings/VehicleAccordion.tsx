import { useState } from "react";
import useVehicles from "@hooks/useVehicles";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddVehicleDialog from "../Dialogs/AddVehicleDialog";
import ConfirmDialog from "../Dialogs/ConfirmDialog";
import EditVehicleDialog from "../Dialogs/EditVehicleDialog";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Vehicle } from "@utils/types";
import { Accordion, AccordionDetails, AccordionSummary, Button, IconButton, Typography } from "@mui/material";

export default function VehicleAccordion() {
  const [expanded, setExpanded] = useState(false);
  const [addVehicleModalOpen, setAddVehicleModalOpen] = useState(false);
  const [editVehicleModalOpen, setEditVehicleModalOpen] = useState(false);
  const [editVehicle, setEditVehicle] = useState<Vehicle>();
  const [vehicleToDelete, setVehicleToDelete] = useState<Vehicle>();
  const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
  const { vehicles, isLoading, addVehicle, deleteVehicle, updateVehicle } = useVehicles();

  async function onVehicleSubmit(make: string, model: string, odometer: number) {
    addVehicle({
      make: make,
      model: model,
      id: undefined,
      odometer: odometer,
      is_primary: false
    });

    setAddVehicleModalOpen(false);
  }

  async function onVehicleUpdate(vehicle: Vehicle) {
    updateVehicle(vehicle);
  } 

  return (
    <>
      <ConfirmDialog
        title={"Confirm Vehicle Deletion"}
        children={`Are you sure you want to delete your 
          ${vehicleToDelete ? vehicleToDelete.make + " " + vehicleToDelete.model : ""}? This cannot be undone.`}
        open={confirmDeleteModalOpen}
        setOpen={setConfirmDeleteModalOpen}
        onConfirm={() => deleteVehicle(vehicleToDelete!.id!)} 
      />
      <EditVehicleDialog 
        open={editVehicleModalOpen} 
        vehicle={editVehicle} 
        handleClose={() => setEditVehicleModalOpen(false)} 
        onSubmit={onVehicleUpdate} 
      />
      <AddVehicleDialog 
        open={addVehicleModalOpen} 
        handleClose={() => setAddVehicleModalOpen(false)} 
        onSubmit={onVehicleSubmit} 
      />
      <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)} >
        <AccordionSummary aria-controls="panel1d-content" id="vehicle-accordion" expandIcon={<ExpandMoreIcon />}>
          <Typography>Vehicles</Typography>
        </AccordionSummary>
        {isLoading ? (
          <AccordionDetails>
            <Typography>Loading</Typography>
          </AccordionDetails>
        ) : (
          vehicles?.map((vehicle) => (
            <AccordionDetails 
              key={vehicle.id}
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <Typography>
                {vehicle.make + ' ' + vehicle.model}
              </Typography>
              <Typography>
                {vehicle.odometer}
              </Typography>
              <IconButton
                aria-label="edit"
                onClick={() => {
                  setEditVehicle(vehicle);
                  setEditVehicleModalOpen(true);
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                aria-label="delete"
                onClick={() => {
                  setVehicleToDelete(vehicle);
                  setConfirmDeleteModalOpen(true)
                }}
              >
                <DeleteIcon />
              </IconButton>
            </AccordionDetails>
          ))
        )}
        <AccordionDetails key={"save-button"}>
          <Button variant="contained" onClick={() => setAddVehicleModalOpen(true)}>Add Vehicle</Button>
        </AccordionDetails>
      </Accordion>
    </>
  );
}