import useRefuels from "../hooks/useRefuels";
import { useState } from "react";
import VehicleDropdown from "../components/VehicleDropdown";
import { Refuel, Vehicle } from "../utils/types";
import AvgMpgDashboardCard from "../components/DashboardCards/AvgMpgDashboardCard";
import MilesDrivenDashboardCard from "../components/DashboardCards/MilesDrivenDashboardCard";
import AvgFillDashboardCard from "../components/DashboardCards/AvgFillDashboardCard";
import TotalCostDashboardCard from "../components/DashboardCards/TotalCostDashboardCard";

export default function Home() {
  const [vehicle, setVehicle] = useState<Vehicle | null>();
  const { getRefuelsByVehicle } = useRefuels();

  let refuels: Refuel[] = [];
  if(vehicle) {
    refuels = getRefuelsByVehicle(vehicle);
  }

  return (
    <div style={{marginBottom: "5rem"}}>
      <h1>Home</h1>
      
      <div style={{marginBottom: "0.5rem"}}>
        <VehicleDropdown setVehicle={setVehicle}/>
      </div>

      <h2>Year to Date</h2>
      <AvgMpgDashboardCard refuels={refuels} ytd={true}/>
      <MilesDrivenDashboardCard refuels={refuels} ytd={true}/>
      <AvgFillDashboardCard refuels={refuels} ytd={true}/>
      <TotalCostDashboardCard refuels={refuels} ytd={true}/>

      <h2>Lifetime</h2>
      <AvgMpgDashboardCard refuels={refuels} ytd={false}/>
      <MilesDrivenDashboardCard refuels={refuels} ytd={false}/>
      <AvgFillDashboardCard refuels={refuels} ytd={true}/>
      <TotalCostDashboardCard refuels={refuels} ytd={true}/>
    </div>
  );
}