
import { DashboardCardProps, Refuel } from '@utils/types';
import BaseDashboardCard from './BaseDashboardCard';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis } from 'recharts';

export default function AvgPricePerGallonDashboardCard(props: DashboardCardProps) {
  const avgPricePerGallon = getAvgPricePerGallon(props.refuels);
  const avgPricePerGallonByMonth = getAvgPricePerGallonByMonth(props.refuels);

  return (
    <BaseDashboardCard title="Average Price Per Gallon" value={"$" + avgPricePerGallon.toFixed(2)}>
      <BarChart width={300} height={300} data={avgPricePerGallonByMonth}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis type="number" tickCount={20} allowDecimals={false} 
          domain={([_dataMin, dataMax]) => {
            const min = Math.floor(0);
            const max = Math.ceil(dataMax + 3);
            return [min, max];
          }}
        />
        <Bar dataKey="pricePerGallon" fill="#8884d8" />
      </BarChart>
    </BaseDashboardCard>
  );
}

function getAvgPricePerGallon(refuels: Refuel[]): number {
  if(refuels.length < 1) {
    return 0;
  }

  const pricePerGallon = refuels.reduce((sum, refuel) => sum + refuel.pricePerGallon, 0);
  const fillups = refuels.length;

  return pricePerGallon / fillups;
}

function getAvgPricePerGallonByMonth(refuels: Refuel[]): { month: string, pricePerGallon: number }[] {
  if(refuels.length < 1) {
    return [];
  }

  let pricePerGallonByMonth: { [key: string]: number } = {};
  let fillupsByMonth: { [key: string]: number } = {};
  refuels.forEach(refuel => {
    const date = new Date(refuel.date);
    const month = date.getMonth()+1;
    const year = date.getFullYear();
    const key = month + "/" + year;

    if(pricePerGallonByMonth[key]) {
      pricePerGallonByMonth[key] += refuel.pricePerGallon;
      fillupsByMonth[key] += 1;
    } else {
      pricePerGallonByMonth[key] = refuel.pricePerGallon;
      fillupsByMonth[key] = 1;
    }
  });

  let avgPricePerGallonByMonth: { month: string, pricePerGallon: number }[] = [];
  Object.keys(pricePerGallonByMonth).forEach(key => {
    const pricePerGallon = pricePerGallonByMonth[key];
    const fillups = fillupsByMonth[key];
    const month = key.split("/")[0];
    const year = key.split("/")[1];

    avgPricePerGallonByMonth.push({
      month: month + "/" + year,
      pricePerGallon: pricePerGallon / fillups
    });
  });

  return avgPricePerGallonByMonth.reverse();
}