from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from .CarInput import CarInput
from .CalcFeatures import CalcFeatures
from .ModelInput import ModelInput

router = APIRouter()

class CarEvaluation(BaseModel):
    estimated_value: float

@router.post("/evaluate", response_model=CarEvaluation)
def evaluate_car(car_input: CarInput):
    try:
        print(car_input)
        model_input = ModelInput(    
            condition=car_input.condition,
            brand=car_input.brand,
            model=car_input.model,
            generation=car_input.generation,
            year=car_input.year,
            mileage=car_input.mileage,
            power_hp=car_input.power_hp,
            displacement=car_input.displacement,
            fuel_type=car_input.fuel_type,
            drive=car_input.drive,
            transmission=car_input.transmission,
            type=car_input.type,
            doors_num=car_input.doors_num,
            colour=car_input.colour,
            first_owner=car_input.first_owner,
            features_score=CalcFeatures.calc_feature_score(car_input.features_dict),
            advanced_model=CalcFeatures.calc_advanced_model(car_input.model, car_input.version),
        )
        print('----------------------------')
        print(model_input)

        # Tutaj używamy naszego modelu korzystając z model_input.get_dataframe()
        estimated_value = 12345.67

        return CarEvaluation(estimated_value=estimated_value)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error evaluating car: {str(e)}")