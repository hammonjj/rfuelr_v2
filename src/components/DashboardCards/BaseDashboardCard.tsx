import { Card, CardContent, Typography } from "@mui/material";

interface BaseDashboardCardProps {
  title: string;
  value: string;
}

export default function BaseDashboardCard(props: BaseDashboardCardProps) {
  return (
    <Card>
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