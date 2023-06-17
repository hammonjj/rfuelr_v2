import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Refuel } from "@utils/types";

interface RefuelDataDetailsProps {
  refuel: Refuel;
  onDelete: (refuel: Refuel) => void;
}

export default function RefuelDataDetails(props: RefuelDataDetailsProps) {
  return (
    <Box sx={{ margin: 1, display: 'flex', flexDirection: 'column' }} key={props.refuel.id}>
      <Typography variant="h6" gutterBottom>
        Details
      </Typography> 
      <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <TableContainer component={Paper}>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Metric</TableCell>
                <TableCell align="right">Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                  <TableCell component="th" scope="row">Price Per Gallon</TableCell>
                  <TableCell align="right">${props.refuel.pricePerGallon.toFixed(2)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">Gallons Pumped</TableCell>
                  <TableCell align="right">{props.refuel.gallons.toFixed(2)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">Miles Per Gallon</TableCell>
                  <TableCell align="right">
                    {props.refuel.milesPerGallon === 0 ? "N/A" : props.refuel.milesPerGallon.toFixed(2)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">Total Cost</TableCell>
                  <TableCell align="right">${(props.refuel.pricePerGallon * props.refuel.gallons).toFixed(2)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">Miles Driven</TableCell>
                  <TableCell align="right">
                    {props.refuel.tripMiles === 0 ? "N/A" : props.refuel.tripMiles}</TableCell>
                </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Button 
          variant="contained" 
          color="error" 
          sx={{ width: '75%', marginTop: "1rem", marginBottom: "0.5rem" }}
          onClick={() => props.onDelete(props.refuel)}
        >
          Delete
        </Button>
      </Box>
    </Box>
    
  );
}
