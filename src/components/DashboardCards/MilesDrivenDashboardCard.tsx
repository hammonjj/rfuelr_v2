import { DashboardCardProps, Refuel } from "../../utils/types";
import BaseDashboardCard from "./BaseDashboardCard";

export default function MilesDrivenDashboardCard(props: DashboardCardProps) {
  const milesDriven = sumTripMiles(props.refuels, props.ytd);

  return (
    <BaseDashboardCard title="Miles Driven" value={milesDriven.toFixed(2)} />
  );
}

function sumTripMiles(refuels: Refuel[], ytd: boolean): number {
  if(refuels.length < 1) {
    return 0;
  }

  let filteredRefuels = ytd ? refuels : refuels.filter(refuel => {
    return (new Date(refuel.date)).getFullYear() === (new Date().getFullYear())
  });

  return filteredRefuels.reduce((sum, refuel) => sum + refuel.tripMiles, 0);
}