from typing import List
from datetime import datetime

from .features_weights import weights


class CalcFeatures:
    @staticmethod
    def calc_feature_score(features_list: List[str]) -> int:
        return sum(weights[feature] for feature in features_list)

    @staticmethod
    def calc_advanced_model(model: str, version: str) -> str:
        return f"{model} {version}".strip()
    
    def calc_car_age(production_year: int) -> int:
        return datetime.now().year - production_year
