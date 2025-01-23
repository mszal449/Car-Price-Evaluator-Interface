from dataclasses import dataclass, asdict
import pandas as pd


@dataclass
class ModelInput:
    Condition: str
    Vehicle_brand: str
    Vehicle_model: str
    Vehicle_generation: str
    Mileage_km: int
    Power_HP: int
    Displacement_cm3: int
    Fuel_type: str
    Drive: str
    Transmission: str
    Type: str
    Doors_number: int
    Colour: str
    First_owner: bool
    Advanced_model: str
    Feature_score: int
    Car_age: int

    def get_dataframe(self) -> pd.DataFrame:
        return pd.DataFrame([asdict(self)])
    
    def forward_Nyears(self, n: int) -> list["ModelInput"]:
        return [
            ModelInput(
                Condition=self.Condition,
                Vehicle_brand=self.Vehicle_brand,
                Vehicle_model=self.Vehicle_model,
                Vehicle_generation=self.Vehicle_generation,
                Car_age=self.Car_age + i,
                Mileage_km=self.Mileage_km,
                Power_HP=self.Power_HP,
                Displacement_cm3=self.Displacement_cm3,
                Fuel_type=self.Fuel_type,
                Drive=self.Drive,
                Transmission=self.Transmission,
                Type=self.Type,
                Doors_number=self.Doors_number,
                Colour=self.Colour,
                First_owner=self.First_owner,
                Advanced_model=self.Advanced_model,
                Feature_score=self.Feature_score,
            )
            for i in range(1, n + 1)
        ]
