import { DashboardCardProps, Refuel } from "@utils/types";
import BaseDashboardCard from "./BaseDashboardCard";

export default function AvgMpgDashboardCard(props: DashboardCardProps) {
  const avgMpg = getAvgMpg(props.refuels, props.ytd);

  return (
    <BaseDashboardCard title="Average MPG" value={avgMpg.toFixed(2)} />
  );
}

function getAvgMpg(refuels: Refuel[], ytd: boolean): number {
  if(refuels.length < 1) {
    return 0;
  }

  let filteredRefuels = ytd ? refuels : refuels.filter(refuel => {
    return (new Date(refuel.date)).getFullYear() === (new Date().getFullYear())
  });

  const gallons = filteredRefuels.reduce((sum, refuel) => sum + refuel.gallons, 0);
  const milesDriven = filteredRefuels.reduce((sum, refuel) => sum + refuel.tripMiles, 0);

  return milesDriven / gallons;
}
