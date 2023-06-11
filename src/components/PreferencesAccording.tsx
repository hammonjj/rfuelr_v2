import { useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Typography, Switch } from "@mui/material";

export default function PreferencesAccordion() {
  const [expanded, setExpanded] = useState(false);

  return (
    <Accordion expanded={expanded} onChange={() => setExpanded(!expanded)}>
      <AccordionSummary aria-controls="panel1d-content" id="vehicle-accordion">
        <Typography>Preferences</Typography>
      </AccordionSummary>
      <AccordionDetails style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography>Dark Mode:</Typography>
        <Switch defaultChecked />
      </AccordionDetails>
    </Accordion>
  );
}
