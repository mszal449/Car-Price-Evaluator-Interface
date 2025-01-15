from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Tuple

router = APIRouter()

class CarInput(BaseModel):
    condition: str = None
    brand: str = None
    model: str = None
    year: int = None
    mileage: float = None
    power_hp: int = None
    drive: str = None
    fuel_type: str = None
    transmission: str = None
    doors_num: int = None
    colour: str = None
    first_owner: bool = None

class CarEvaluation(BaseModel):
    estimated_value: float
    estimated_range: Tuple[float, float]

@router.post("/evaluate", response_model=CarEvaluation)
def evaluate_car(car: CarInput):
    try:
        # Tutaj używamy naszego modelu
        estimated_value = 12345.67
        estimated_range = (12000.0, 13000.0)
        return CarEvaluation(estimated_value=estimated_value, estimated_range=estimated_range)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error evaluating car: {str(e)}")