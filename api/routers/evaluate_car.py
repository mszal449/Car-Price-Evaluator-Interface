import xgboost as xgb
import pandas as pd
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from validators.CarDataValidation import CarDataValidation
from utils.CalcFeatures import CalcFeatures
from model.ModelInput import ModelInput
from model.ModelHandler import model_handler


router = APIRouter()


class CarEvaluation(BaseModel):
    estimated_price: float
    expected_price_1y: float
    expected_price_2y: float
    expected_price_3y: float
    expected_price_4y: float
    expected_price_5y: float


@router.post("/evaluate", response_model=CarEvaluation)
def evaluate_car(car_input: CarDataValidation):
    try:
        model_input = ModelInput(
            Condition=car_input.condition,
            Vehicle_brand=car_input.brand,
            Vehicle_model=car_input.model,
            Vehicle_generation=car_input.generation,
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
            Car_age=CalcFeatures.calc_car_age(car_input.year),
        )
        future_input = model_input.forward_Nyears(5)

        return CarEvaluation(
            estimated_price=model_handler.predict(model_input),
            expected_price_1y=model_handler.predict(future_input[0]),
            expected_price_2y=model_handler.predict(future_input[1]),
            expected_price_3y=model_handler.predict(future_input[2]),
            expected_price_4y=model_handler.predict(future_input[3]),
            expected_price_5y=model_handler.predict(future_input[4]),
        )

    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error evaluating car: {str(e)}")
