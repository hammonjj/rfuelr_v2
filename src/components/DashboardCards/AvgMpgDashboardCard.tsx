import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { DashboardCardProps, Refuel } from "@utils/types";
import BaseDashboardCard from "./BaseDashboardCard";

export default function AvgMpgDashboardCard(props: DashboardCardProps) {
  const avgMpg = getAvgMpg(props.refuels, props.ytd);
  const avgMpgByMonth = getAvgMpgByMonth(props.refuels, props.ytd);

  return (
      <BaseDashboardCard title="Average MPG" value={avgMpg.toFixed(2)} >
          <BarChart width={300} height={300} data={avgMpgByMonth}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />      
            <YAxis type="number" tickCount={20} allowDecimals={false} domain={([dataMin, dataMax]) => { 
              const min = Math.floor(dataMin - 5);
              const max = Math.ceil(dataMax + 5);
              return [min, max]; 
              }} 
            />
            <Bar dataKey="mpg" fill="#8884d8" />
          </BarChart>                   
      </BaseDashboardCard>
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

function getAvgMpgByMonth(refuels: Refuel[], ytd: boolean): { month: string, mpg: number }[] {
  if(refuels.length < 1) {
    return [];
  }

  let filteredRefuels = ytd ? refuels : refuels.filter(refuel => {
    return (new Date(refuel.date)).getFullYear() === (new Date().getFullYear())
  });

  let milesDrivenByMonth: { [key: string]: number } = {};
  let gallonsByMonth: { [key: string]: number } = {};
  filteredRefuels.forEach(refuel => {
    const date = new Date(refuel.date);
    const month = date.getMonth()+1;
    const year = date.getFullYear();
    const key = month + "/" + year;
    
    if(milesDrivenByMonth[key] === undefined) {
      milesDrivenByMonth[key] = refuel.tripMiles;
    } else {
      milesDrivenByMonth[key] += refuel.tripMiles;
    }
    if(gallonsByMonth[key] === undefined) {
      gallonsByMonth[key] = refuel.gallons;
    } else {
      gallonsByMonth[key] += refuel.gallons;
    }
  });

  //Create a dictionary of the average mpg for each month
  let avgMpg: { month: string, mpg: number }[] = [];
  Object.keys(milesDrivenByMonth).forEach(key => {
    avgMpg.push({ month: key, mpg: parseFloat((milesDrivenByMonth[key] / gallonsByMonth[key]).toFixed(2)) });
  });

  return avgMpg.reverse();
}