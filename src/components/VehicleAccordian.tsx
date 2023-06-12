import React, { useState } from "react";
import useVehicles from "../hooks/useVehicles";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddVehicleModal from "./AddVehicleModal";
import ConfirmDialog from "./ConfirmDialog";
import EditVehicleModal from "./EditVehicleModal";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Button, IconButton, Typography } from "@mui/material";
import { Vehicle } from "../utils/types";

export default function VehicleAccordion() {
  const [expanded, setExpanded] = useState(false);
  const [addVehicleModalOpen, setAddVehicleModalOpen] = useState(false);
  const [editVehicleModalOpen, setEditVehicleModalOpen] = useState(false);
  const [editVehicle, setEditVehicle] = useState<Vehicle>();
  const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
  const { vehicles, isLoading, addVehicle, deleteVehicle, updateVehicle } = useVehicles();

  function onVehicleSubmit(make: string, model: string, odometer: number) {
    addVehicle({
      make: make,
      model: model,
      id: undefined,
      odometer: odometer,
    });

    setAddVehicleModalOpen(false);
  }

  return (
    <>
      <EditVehicleModal open={editVehicleModalOpen} vehicle={editVehicle} handleClose={() => setEditVehicleModalOpen(false)} onSubmit={updateVehicle} />
      <AddVehicleModal open={addVehicleModalOpen} handleClose={() => setAddVehicleModalOpen(false)} onSubmit={onVehicleSubmit} />
      <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)} disableGutters={true}>
        <AccordionSummary aria-controls="panel1d-content" id="vehicle-accordion" expandIcon={<ExpandMoreIcon />}>
          <Typography>Vehicles</Typography>
        </AccordionSummary>
        {isLoading ? (
          <AccordionDetails>
            <Typography>Loading</Typography>
          </AccordionDetails>
        ) : (
          vehicles?.map((vehicle) => (
            <React.Fragment key={vehicle.id}>
              <ConfirmDialog
                title={"Confirm Vehicle Deletion"}
                children={`Are you sure you want to delete your ${vehicle.make} ${vehicle.model}? This cannot be undone.`}
                open={confirmDeleteModalOpen}
                setOpen={setConfirmDeleteModalOpen}
                onConfirm={() => deleteVehicle(vehicle.id!)} 
              />
              <AccordionDetails style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography>
                  {vehicle.make + ' ' + vehicle.model}
                </Typography>
                <Typography>
                  {vehicle.odometer}
                </Typography>
                <IconButton
                  aria-label="edit"
                  onClick={() => {
                    setEditVehicleModalOpen(true)
                    setEditVehicle(vehicle);
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  onClick={() => setConfirmDeleteModalOpen(true)}
                >
                  <DeleteIcon />
                </IconButton>
              </AccordionDetails>
            </React.Fragment>
          ))
        )}
        <AccordionDetails key={"save-button"}>
          <Button variant="contained" onClick={() => setAddVehicleModalOpen(true)}>Add Vehicle</Button>
        </AccordionDetails>
      </Accordion>
    </>
  );
}