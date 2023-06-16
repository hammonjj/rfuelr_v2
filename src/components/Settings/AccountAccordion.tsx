import { useState } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Typography, IconButton } from "@mui/material";
import useUser from "@hooks/useUser";
import EditIcon from '@mui/icons-material/Edit';

export default function AccountAccordion() {
  const user = useUser();
  const [expanded, setExpanded] = useState(false);

  return (
    <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)} disableGutters={true}>
      <AccordionSummary aria-controls="panel1d-content" id="vehicle-accordion" expandIcon={<ExpandMoreIcon />}>
        <Typography>Account</Typography>
      </AccordionSummary>
      <AccordionDetails style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography>{user?.email}</Typography>
        <IconButton
          aria-label="edit"
          onClick={() => {
          }}
        >
          <EditIcon />
        </IconButton>
      </AccordionDetails>
      <AccordionDetails style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography>Update Password</Typography>
        <IconButton
          aria-label="edit"
          onClick={() => {
          }}
        >
          <EditIcon />
        </IconButton>
      </AccordionDetails>
    </Accordion>
  );
}