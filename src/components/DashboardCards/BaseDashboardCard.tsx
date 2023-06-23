import { Card, CardContent, Collapse, Divider, Typography } from "@mui/material";
import { useState } from "react";

interface BaseDashboardCardProps {
  title: string;
  value: string;
  children?: React.ReactNode;
}

const style = {
  card: {
    marginBottom: "0.5rem"
  }
}

export default function BaseDashboardCard(props: BaseDashboardCardProps) {
  const [graphOpen, setGraphOpen] = useState(false);
  
  return (
    <Card style={style.card} onClick={() => setGraphOpen((prevValue) => {return !prevValue;})}>
      <CardContent>
      <Typography variant="h6">
          {props.title}
        </Typography>
        <Typography variant="body2">
          {props.value}
        </Typography>
        <Collapse in={graphOpen} timeout="auto" unmountOnExit>
          <Divider style={{marginTop: "0.5rem", marginBottom: "1.5rem"}} />
        {props.children}
        </Collapse>
      </CardContent>
    </Card>
  );
}

