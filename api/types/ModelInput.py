from dataclasses import dataclass, asdict
import pandas as pd


@dataclass
class ModelInput:
    Condition: str
    Vehicle_brand: str
    Vehicle_model: str
    Vehicle_generation: str
    Production_year: int
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

    def get_dataframe(self) -> pd.DataFrame:
        return pd.DataFrame([asdict(self)])
