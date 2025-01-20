import xgboost as xgb
import pandas as pd
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from ..types.CarInput import CarInput
from ..utils.CalcFeatures import CalcFeatures
from ..types.ModelInput import ModelInput
from ..model.load_model import model

router = APIRouter()

class CarEvaluation(BaseModel):
    estimated_value: float

@router.post("/evaluate", response_model=CarEvaluation)
def evaluate_car(car_input: CarInput):
    try:
        model_input = ModelInput(
            Condition=car_input.condition,
            Vehicle_brand=car_input.brand,
            Vehicle_model=car_input.model,
            Vehicle_generation=car_input.generation,
            Production_year=car_input.year,
            Mileage_km=car_input.mileage,
            Power_HP=car_input.power_hp,
            Displacement_cm3=car_input.displacement,
            Fuel_type=car_input.fuel_type,
            Drive=car_input.drive,
            Transmission=car_input.transmission,
            Type=car_input.type,
            Doors_number=car_input.doors_num,
            Colour=car_input.colour,
            First_owner=car_input.first_owner,
            Advanced_model=CalcFeatures.calc_advanced_model(car_input.model, car_input.version),
            Feature_score=CalcFeatures.calc_feature_score(car_input.features_list),
        )

        input_data = model_input.get_dataframe()
        input_data = input_data.apply(pd.to_numeric, errors='coerce')
        input_data = input_data.fillna(0)
        dmatrix = xgb.DMatrix(input_data)
        estimated_value = model.predict(dmatrix)[0]

        return CarEvaluation(estimated_value=estimated_value)
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error evaluating car: {str(e)}")
