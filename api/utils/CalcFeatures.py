from typing import List

from .features_weights import weights

class CalcFeatures:
    @staticmethod
    def calc_feature_score(features_list: List[str]) -> int:
        return sum(weights[feature] for feature in features_list)

    @staticmethod
    def calc_advanced_model(model: str, version: str) -> str:
        return f"{model} {version}".strip()
