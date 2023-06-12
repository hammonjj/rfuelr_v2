import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Refuel } from "../../utils/types";
import RefuelDataTableRow from "./RefuelDataTableRow";

interface RefuelDataTableProps {
  refuels: Refuel[];
  deleteRefuel: (refuel: Refuel) => void;
}

export default function RefuelDataTable(props: RefuelDataTableProps) {
  return (
    <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Date</TableCell>
              <TableCell align="right">PPG</TableCell>
              <TableCell align="right">Miles</TableCell>
              <TableCell align="right">MPG</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.refuels.map((refuel) => (
              <RefuelDataTableRow key={refuel.id} refuel={refuel} onDelete={props.deleteRefuel}/>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  );
}