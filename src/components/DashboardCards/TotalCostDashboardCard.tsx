import { DashboardCardProps, Refuel } from "@utils/types";
import BaseDashboardCard from "./BaseDashboardCard";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

export default function TotalCostDashboardCard(props: DashboardCardProps) {
  const totalCost = getTotalCost(props.refuels);
  const totalCostByMonth = getTotalCostByMonth(props.refuels);

  return (
    <BaseDashboardCard title="Total Cost" value={"$" + totalCost.toFixed(2)}>
      <BarChart width={300} height={300} data={totalCostByMonth}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis type="number" tickCount={20} allowDecimals={false} 
            domain={([_dataMin, dataMax]) => {
              const min = 0;
              const max = Math.ceil(dataMax + 10);
              return [min, max];
              }}
            tickFormatter={tick => {
              return "$" + tick;
            }}
          />
          <Bar dataKey="cost" fill="#8884d8" />
        </BarChart>
    </BaseDashboardCard>
  );
}

function getTotalCost(refuels: Refuel[]): number {
  if(refuels.length < 1) {
    return 0;
  }

  return refuels.reduce((sum, refuel) => sum + (refuel.gallons * refuel.pricePerGallon), 0);
}

function getTotalCostByMonth(refuels: Refuel[]): { month: string, cost: number }[] {
  if(refuels.length < 1) {
    return [];
  }

  let costByMonth: { [key: string]: number } = {};
  refuels.forEach(refuel => {
    const date = new Date(refuel.date);
    const month = date.getMonth()+1;
    const year = date.getFullYear();
    const key = month + "/" + year;
    
    if(costByMonth[key] === undefined) {
      costByMonth[key] = refuel.gallons * refuel.pricePerGallon;
    } else {
      costByMonth[key] += refuel.gallons * refuel.pricePerGallon;
    }
  });

  return Object.keys(costByMonth).map(key => {
    return {
      month: key,
      cost: costByMonth[key]
    };
  }).reverse();
}