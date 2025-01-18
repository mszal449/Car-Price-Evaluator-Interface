from dataclasses import dataclass, asdict
import pandas as pd


@dataclass
class ModelInput:
    condition: str
    brand: str
    model: str
    generation: str
    year: int
    mileage: int
    power_hp: int
    displacement: int
    fuel_type: str
    drive: str
    transmission: str
    type: str
    doors_num: int
    colour: str
    first_owner: bool
    features_score: int
    advanced_model: str

    def get_dataframe(self) -> pd.DataFrame:
        return pd.DataFrame([asdict(self)])
