from pydantic import BaseModel
from typing import Dict, List


class CarInput(BaseModel):
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
    version: str
    features_dict: List[str] = []