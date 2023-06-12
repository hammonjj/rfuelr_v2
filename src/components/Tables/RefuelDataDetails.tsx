import { Box, Button, Typography } from "@mui/material";
import { Refuel } from "../../utils/types";

interface RefuelDataDetailsProps {
  refuel: Refuel;
  onDelete: (refuel: Refuel) => void;
}

//<TableCell align="right">{props.refuel.gallons.toFixed(2)}</TableCell>
export default function RefuelDataDetails(props: RefuelDataDetailsProps) {
  return (
    <Box sx={{ margin: 1, display: 'flex', flexDirection: 'column' }} key={props.refuel.id}>
      <Typography variant="h6" gutterBottom>
        Details
      </Typography> 
      <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <Button 
          variant="contained" 
          color="error" 
          sx={{ width: '75%' }}
          onClick={() => props.onDelete(props.refuel)}
        >
          Delete
        </Button>
      </Box>
    </Box>
    
  );
}
