import { DashboardCardProps, Refuel } from "@utils/types";
import BaseDashboardCard from "./BaseDashboardCard";

export default function AvgCostDashboardCard(props: DashboardCardProps) {
  const avgCost = getAvgCost(props.refuels, props.ytd);

  return (
    <BaseDashboardCard title="Average Cost" value={"$" + avgCost.toFixed(2)}>
      
    </BaseDashboardCard>
  );
}

function getAvgCost(refuels: Refuel[], ytd: boolean): number {
  if(refuels.length < 1) {
    return 0;
  }

  let filteredRefuels = ytd ? refuels : refuels.filter(refuel => {
    return (new Date(refuel.date)).getFullYear() === (new Date().getFullYear())
  });

  const cost = filteredRefuels.reduce(
    (sum, refuel) => sum + (refuel.gallons * refuel.pricePerGallon), 0);

  return cost / filteredRefuels.length;
}