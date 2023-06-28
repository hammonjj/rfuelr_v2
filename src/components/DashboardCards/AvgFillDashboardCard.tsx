import { DashboardCardProps, Refuel } from "@utils/types";
import BaseDashboardCard from "./BaseDashboardCard";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

export default function AvgFillDashboardCard(props: DashboardCardProps) {
  const avgFill = getAvgFill(props.refuels);
  const avgFillByMonth = getAvgFillByMonth(props.refuels);

  return (
    <BaseDashboardCard title="Average Fill" value={avgFill.toFixed(2)}>
      <BarChart width={300} height={300} data={avgFillByMonth}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis type="number" tickCount={20} allowDecimals={false} 
            domain={([dataMin, dataMax]) => {
              const min = Math.floor(dataMin - 4);
              const max = Math.ceil(dataMax + 3);
              return [min, max];
            }}
          />
          <Bar dataKey="gallons" fill="#8884d8" />
        </BarChart>
    </BaseDashboardCard>
  );
}

function getAvgFill(refuels: Refuel[]): number {
  if(refuels.length < 1) {
    return 0;
  }

  const gallons = refuels.reduce((sum, refuel) => sum + refuel.gallons, 0);
  const fillups = refuels.length;

  return gallons / fillups;
}

function getAvgFillByMonth(refuels: Refuel[]): { month: string, gallons: number }[] {
  if(refuels.length < 1) {
    return [];
  }

  let gallonsByMonth: { [key: string]: number } = {};
  let fillupsByMonth: { [key: string]: number } = {};
  refuels.forEach(refuel => {
    const date = new Date(refuel.date);
    const month = date.getMonth()+1;
    const year = date.getFullYear();
    const key = month + "/" + year;

    if(gallonsByMonth[key]) {
      gallonsByMonth[key] += refuel.gallons;
      fillupsByMonth[key] += 1;
    } else {
      gallonsByMonth[key] = refuel.gallons;
      fillupsByMonth[key] = 1;
    }
  });

  let avgFillByMonth: { month: string, gallons: number }[] = [];
  Object.keys(gallonsByMonth).forEach(month => {
    avgFillByMonth.push({
      month: month,
      gallons: gallonsByMonth[month] / fillupsByMonth[month]
    });
  });

  return avgFillByMonth.sort((a, b) => {
    return parseInt(a.month) - parseInt(b.month);
  });
}