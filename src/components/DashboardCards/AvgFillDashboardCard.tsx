import { DashboardCardProps, Refuel } from "../../utils/types";
import BaseDashboardCard from "./BaseDashboardCard";

export default function AvgFillDashboardCard(props: DashboardCardProps) {
  const avgFill = getAvgFill(props.refuels, props.ytd);

  return (
    <BaseDashboardCard title="Average Fill" value={avgFill.toFixed(2)} />
  );
}

function getAvgFill(refuels: Refuel[], ytd: boolean): number {
  if(refuels.length < 1) {
    return 0;
  }

  let filteredRefuels = ytd ? refuels : refuels.filter(refuel => {
    return (new Date(refuel.date)).getFullYear() === (new Date().getFullYear())
  });

  const gallons = filteredRefuels.reduce((sum, refuel) => sum + refuel.gallons, 0);
  const fillups = filteredRefuels.length;

  return gallons / fillups;
}