import React, { useState } from "react";
import useVehicles from "../hooks/useVehicles";
import DeleteIcon from '@mui/icons-material/Delete';
import { Accordion, AccordionDetails, AccordionSummary, Button, IconButton, Typography } from "@mui/material";
import AddVehicleModal from "./AddVehicleModal";
import ConfirmDialog from "./ConfirmDialog";

export default function VehicleAccordion() {
  const [expanded, setExpanded] = useState(false);
  const [addVehicleModalOpen, setAddVehicleModalOpen] = useState(false);
  const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
  const { vehicles, isLoading, addVehicle, deleteVehicle } = useVehicles();

  function onVehicleSubmit(make: string, model: string) {
    addVehicle({
      make: make,
      model: model,
      id: undefined
    });

    setAddVehicleModalOpen(false);
  }

  return (
    <>
      <AddVehicleModal open={addVehicleModalOpen} handleClose={() => setAddVehicleModalOpen(false)} onSubmit={onVehicleSubmit} />
      <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)}>
        <AccordionSummary aria-controls="panel1d-content" id="vehicle-accordion">
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