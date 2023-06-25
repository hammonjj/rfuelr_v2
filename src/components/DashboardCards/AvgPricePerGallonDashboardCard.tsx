
import { DashboardCardProps, Refuel } from '@utils/types';
import BaseDashboardCard from './BaseDashboardCard';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis } from 'recharts';

export default function AvgPricePerGallonDashboardCard(props: DashboardCardProps) {
  const avgPricePerGallon = getAvgPricePerGallon(props.refuels, props.ytd);
  const avgPricePerGallonByMonth = getAvgPricePerGallonByMonth(props.refuels, props.ytd);

  return (
    <BaseDashboardCard title="Average Price Per Gallon" value={"$" +avgPricePerGallon.toFixed(2)}>
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

function getAvgPricePerGallon(refuels: Refuel[], ytd: boolean): number {
  if(refuels.length < 1) {
    return 0;
  }

  let filteredRefuels = ytd ? refuels : refuels.filter(refuel => {
    return (new Date(refuel.date)).getFullYear() === (new Date().getFullYear())
  });

  const pricePerGallon = filteredRefuels.reduce((sum, refuel) => sum + refuel.pricePerGallon, 0);
  const fillups = filteredRefuels.length;

  return pricePerGallon / fillups;
}

function getAvgPricePerGallonByMonth(refuels: Refuel[], ytd: boolean): { month: string, pricePerGallon: number }[] {
  if(refuels.length < 1) {
    return [];
  }

  let filteredRefuels = ytd ? refuels : refuels.filter(refuel => {
    return (new Date(refuel.date)).getFullYear() === (new Date().getFullYear())
  });

  let pricePerGallonByMonth: { [key: string]: number } = {};
  let fillupsByMonth: { [key: string]: number } = {};
  filteredRefuels.forEach(refuel => {
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
    const date = new Date(parseInt(year), parseInt(month)-1);

    avgPricePerGallonByMonth.push({
      month: date.toLocaleString('default', { month: 'short' }) + " " + year,
      pricePerGallon: pricePerGallon / fillups
    });
  });

  return avgPricePerGallonByMonth;
}