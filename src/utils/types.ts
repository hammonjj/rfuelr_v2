export interface Refuel {
  id: string;
  date: Date;
  vehicle: Vehicle;
  pricePerGallon: number;
  gallons: number;
  omit: boolean;
  tripMiles: number;
  milesPerGallon: number;
  latitude: number | null;
  longitude: number | null;
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
  latitude: number | null;
  longitude: number | null;
}

export interface Vehicle {
  make: string;
  model: string;
  id: string | undefined;
  odometer: number;
  is_primary: boolean;
}

export interface DashboardCardProps {
  refuels: Refuel[];
}