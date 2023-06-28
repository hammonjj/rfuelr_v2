import { DashboardCardProps, Refuel } from "@utils/types";
import BaseDashboardCard from "./BaseDashboardCard";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
//import { useTooltipContext } from "@hooks/useTooltipContext";

export default function AvgCostDashboardCard(props: DashboardCardProps) {
  const avgCost = getAvgCost(props.refuels);
  const avgCostByMonth = getAvgFillCostByMonth(props.refuels);
/*
  const { openTooltip, closeTooltip } = useTooltipContext();

  const tooltipStyle = {
    backgroundColor: "white",
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: "1%",
    fontFamily: "helvetica, sans-serif",
    fontSize: "16px",
    padding: ".5%"
  };
*/
  return (
    <BaseDashboardCard title="Average Cost" value={"$" + avgCost.toFixed(2)}>
      <BarChart width={300} height={300} data={avgCostByMonth}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis type="number" tickCount={20} allowDecimals={false} 
            domain={([_dataMin, dataMax]) => {
              const min = 0;
              const max = Math.ceil(dataMax + 5);
              return [min, max];
              }}
            tickFormatter={tick => {
              return "$" + tick;
            }}
          />
          <Bar 
            dataKey="cost" 
            fill="#8884d8" 
            onMouseEnter={e => {
              console.log("e: ", e);
              }
            }
            onMouseLeave={() => {
              console.log("Leaving")
            }}
            />
        </BarChart>
    </BaseDashboardCard>
  );
}

function getAvgCost(refuels: Refuel[]): number {
  if(refuels.length < 1) {
    return 0;
  }

  const cost = refuels.reduce(
    (sum, refuel) => sum + (refuel.gallons * refuel.pricePerGallon), 0);

  return cost / refuels.length;
}

function getAvgFillCostByMonth(refuels: Refuel[]): { month: string, cost: number }[] {
  if(refuels.length < 1) {
    return [];
  }

  let costByMonth: { [key: string]: number } = {};
  let fillupsByMonth: { [key: string]: number } = {};
  refuels.forEach(refuel => {
    const date = new Date(refuel.date);
    const month = date.getMonth()+1;
    const year = date.getFullYear();
    const key = month + "/" + year;
    
    if(costByMonth[key] === undefined) {
      costByMonth[key] = refuel.gallons * refuel.pricePerGallon;
      fillupsByMonth[key] = 1;
    } else {
      costByMonth[key] += refuel.gallons * refuel.pricePerGallon;
      fillupsByMonth[key]++;
    }
  });

  let avgCostByMonth: { month: string, cost: number }[] = [];
  for(let key in costByMonth) {
    avgCostByMonth.push({
      month: key,
      cost: costByMonth[key] / fillupsByMonth[key]
    });
  }

  return avgCostByMonth.sort((a, b) => {
    const aMonth = parseInt(a.month.split("/")[0]);
    const aYear = parseInt(a.month.split("/")[1]);
    const bMonth = parseInt(b.month.split("/")[0]);
    const bYear = parseInt(b.month.split("/")[1]);

    if(aYear === bYear) {
      return aMonth - bMonth;
    } else {
      return aYear - bYear;
    }
  });
}