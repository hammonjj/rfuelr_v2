import { DashboardCardProps, Refuel } from "@utils/types";
import BaseDashboardCard from "./BaseDashboardCard";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

export default function MilesDrivenDashboardCard(props: DashboardCardProps) {
  const milesDriven = sumTripMiles(props.refuels);
  const milesDrivenByMonth = getRefuelsByMonth(props.refuels);

  return (
    <BaseDashboardCard title="Miles Driven" value={milesDriven.toFixed(2)}>
      <BarChart width={300} height={300} data={milesDrivenByMonth}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis type="number" tickCount={20} allowDecimals={false} domain={([dataMin, dataMax]) => {
          const min = Math.floor(dataMin - 300);
          const max = Math.ceil(dataMax + 100);
          return [min, max];
          }}
        />
        <Bar dataKey="miles" fill="#8884d8" />
      </BarChart>
    </BaseDashboardCard>
  );
}

function sumTripMiles(refuels: Refuel[]): number {
  if(refuels.length < 1) {
    return 0;
  }

  return refuels.reduce((sum, refuel) => sum + refuel.tripMiles, 0);
}

function getRefuelsByMonth(refuels: Refuel[]): { month: string, miles: number }[] {
  if(refuels.length < 1) {
    return [];
  }

  let milesDrivenByMonth: { [key: string]: number } = {};
  refuels.forEach(refuel => {
    const date = new Date(refuel.date);
    const month = date.getMonth()+1;
    const year = date.getFullYear();
    const key = month + "/" + year;
    
    if(milesDrivenByMonth[key] === undefined) {
      milesDrivenByMonth[key] = refuel.tripMiles;
    } else {
      milesDrivenByMonth[key] += refuel.tripMiles;
    }
  });

  return Object.keys(milesDrivenByMonth).map(key => {
    return {
      month: key,
      miles: milesDrivenByMonth[key]
    }
  }).reverse();
}