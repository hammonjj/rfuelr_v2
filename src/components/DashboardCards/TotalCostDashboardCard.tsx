import { DashboardCardProps, Refuel } from "@utils/types";
import BaseDashboardCard from "./BaseDashboardCard";

export default function TotalCostDashboardCard(props: DashboardCardProps) {
  const totalCost = sumCost(props.refuels, props.ytd);

  return (
    <BaseDashboardCard title="Total Cost" value={totalCost.toFixed(2)} />
  );
}

function sumCost(refuels: Refuel[], ytd: boolean): number {
  if(refuels.length < 1) {
    return 0;
  }

  let filteredRefuels = ytd ? refuels : refuels.filter(refuel => {
    return (new Date(refuel.date)).getFullYear() === (new Date().getFullYear())
  });

  return filteredRefuels.reduce((sum, refuel) => sum + (refuel.gallons * refuel.pricePerGallon), 0);
}