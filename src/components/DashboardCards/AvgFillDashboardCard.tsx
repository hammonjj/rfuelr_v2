import { DashboardCardProps, Refuel } from "@utils/types";
import BaseDashboardCard from "./BaseDashboardCard";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

export default function AvgFillDashboardCard(props: DashboardCardProps) {
  const avgFill = getAvgFill(props.refuels, props.ytd);
  const avgFillByMonth = getAvgFillByMonth(props.refuels, props.ytd);

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

function getAvgFillByMonth(refuels: Refuel[], ytd: boolean): { month: string, gallons: number }[] {
  if(refuels.length < 1) {
    return [];
  }

  let filteredRefuels = ytd ? refuels : refuels.filter(refuel => {
    return (new Date(refuel.date)).getFullYear() === (new Date().getFullYear())
  });

  let gallonsByMonth: { [key: string]: number } = {};
  let fillupsByMonth: { [key: string]: number } = {};
  filteredRefuels.forEach(refuel => {
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