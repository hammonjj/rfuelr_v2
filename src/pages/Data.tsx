import VehicleDropdown from "../components/VehicleDropdown";
import { useState } from "react";
import useRefuels from "../hooks/useRefuels";
import { Refuel, Vehicle } from "../utils/types";
import ConfirmDialog from "../components/Dialogs/ConfirmDialog";
import { formatDate } from "../utils/helpers";
import RefuelDataTable from "../components/Tables/RefuelDataTable";

export default function Data() {
  const [vehicle, setVehicle] = useState<Vehicle | null>();
  const { getRefuelsByVehicle, deleteRefuel, isLoading } = useRefuels();
  const [refuelToDelete, setRefuelToDelete] = useState<Refuel | null>(null);
  const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);

  function handleDeleteRefuel(refuel: Refuel) {
    setRefuelToDelete(refuel);
    setConfirmDeleteModalOpen(true);
  }

  let refuels: Refuel[] = [];
  if(vehicle) {
    refuels = getRefuelsByVehicle(vehicle);
  }

  return (
    <div>
      <h1>Data</h1>
      <div style={{marginBottom: "0.5rem"}}>
        <VehicleDropdown setVehicle={setVehicle}/>
      </div>

      <ConfirmDialog
        title={"Confirm Refuel Deletion"}
        children={`Are you sure you want to delete the refuel entry on 
          ${refuelToDelete ? formatDate(refuelToDelete.date): ""}? This cannot be undone.`}
        open={confirmDeleteModalOpen}
        setOpen={setConfirmDeleteModalOpen}
        onConfirm={() => deleteRefuel(refuelToDelete!.id)} 
      />

      {!isLoading && <RefuelDataTable refuels={refuels} deleteRefuel={handleDeleteRefuel} />}
    </div>
  );
}