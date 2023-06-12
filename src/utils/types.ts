export interface Refuel {
  id: string;
  date: Date;
  vehicle: Vehicle;
  pricePerGallon: number;
  gallons: number;
  omit: boolean;
  tripMiles: number;
  milesPerGallon: number;
}

export interface RefuelSubmission {
  date: Date;
  vehicle: Vehicle;
  odometer: number;
  milesPerGallon: number;
  pricePerGallon: number;
  gallons: number;
  omit: boolean;
  tripMiles: number;
}

export interface Vehicle {
  make: string;
  model: string;
  id: string | undefined;
  odometer: number;
}

export interface DashboardCardProps {
  ytd: boolean;
  refuels: Refuel[];
}