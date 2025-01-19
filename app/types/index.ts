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
