import { Card, CardContent, Typography } from "@mui/material";

interface BaseDashboardCardProps {
  title: string;
  value: string;
}

const style = {
  card: {
    marginBottom: "0.5rem"
  }
}

export default function BaseDashboardCard(props: BaseDashboardCardProps) {
  return (
    <Card style={style.card}>
      <CardContent>
      <Typography variant="h6">
          {props.title}
        </Typography>
        <Typography variant="body2">
          {props.value}
        </Typography>
      </CardContent>
    </Card>
  );
}

