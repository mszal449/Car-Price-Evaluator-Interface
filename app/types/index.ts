export interface IUserInputOptions {
  Condition: { options: string[] };
  Vehicle_brand: { options: string[] };
  Vehicle_model: { options: string[]; relatedTo: string };
  Vehicle_generation: { options: string[]; relatedTo: string };
  Production_year: { value: number };
  Mileage_km: { value: number };
  Power_HP: { value: number };
  Displacement_cm3: { value: number };
  Fuel_type: { options: string[] };
  Drive: { options: string[] };
  Transmission: { options: string[] };
  Type: { options: string[] };
  Doors_number: { options: string[] };
  Colour: { options: string[] };
  First_owner: { options: string[] };
  Model_version: { options: string[] };
  Features: { options: string[] };
}

export type FormOptions = {
  condition: string[];
  vehicle_brand: VehicleBrand[];
  fuel_type: string[];
  drive: string[];
  transmission: string[];
  type: string[];
  doors_number: number[];
  colour: string[];
  features: string[];
};

type VehicleModel = {
  vehicle_model: string;
  vehicle_version: string[];
  vehicle_generation: string[];
};

type VehicleBrand = {
  name: string;
  vehicle_model: VehicleModel[];
};
