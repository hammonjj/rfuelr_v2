import { Collapse, TableCell, TableRow } from "@mui/material";
import { Refuel } from "../../utils/types";
import { formatDate } from "../../utils/helpers";
import { useState } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import RefuelDataDetails from "./RefuelDataDetails";

interface RefuelDataTableRowProps {
  refuel: Refuel;
  onDelete: (refuel: Refuel) => void;
}

export default function RefuelDataTableRow(props: RefuelDataTableRowProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow
        key={props.refuel.id}
        sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
        onClick={() => setOpen(!open)}
      >
        <TableCell>
          {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </TableCell>
        <TableCell component="th" scope="row">{formatDate(props.refuel.date)}</TableCell>
        <TableCell align="right">${props.refuel.pricePerGallon.toFixed(2)}</TableCell>
        <TableCell align="right">{props.refuel.omit ? "N/A" : props.refuel.tripMiles}</TableCell>
        <TableCell align="right">{props.refuel.omit ? "N/A" : props.refuel.milesPerGallon.toFixed(2)}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <RefuelDataDetails refuel={props.refuel} onDelete={props.onDelete}/>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}