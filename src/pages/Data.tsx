import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import VehicleDropdown from "../components/VehicleDropdown";
import { Vehicle } from "hooks/useVehicles";
import { useState } from "react";
import useRefuels, { Refuel } from "../hooks/useRefuels";

function formatDate(date: Date) {
  const dt = new Date(date);

  var day = String(dt.getDate()).padStart(2, '0');
  var month = String(dt.getMonth() + 1).padStart(2, '0');
  var year = dt.getFullYear();

  return month + '/' + day + '/' + year;
}

export default function Data() {
  const [vehicle, setVehicle] = useState<Vehicle | null>();
  const { getRefuelsByVehicle } = useRefuels();

  let refuels: Refuel[] = [];
  if(vehicle) {
    refuels = getRefuelsByVehicle(vehicle);
  }

  return (
    <div>
      <h1>Data</h1>
      <div style={{marginBottom: "0.5rem"}}>
        <VehicleDropdown setVehicle={setVehicle}/>
      </div>
      <TableContainer component={Paper}>
        <Table >
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell align="right">PPG</TableCell>
              <TableCell align="right">Gallons</TableCell>
              <TableCell align="right">Miles</TableCell>
              <TableCell align="right">MPG</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {refuels.map((refuel) => (
              <TableRow
                key={refuel.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">{formatDate(refuel.date)}</TableCell>
                <TableCell align="right">${refuel.pricePerGallon}</TableCell>
                <TableCell align="right">{refuel.gallons}</TableCell>
                <TableCell align="right">{refuel.omit ? "N/A" : refuel.tripMiles}</TableCell>
                <TableCell align="right">{refuel.omit ? "N/A" : refuel.milesPerGallon.toFixed(2)}</TableCell>
                <TableCell align="right">D</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}