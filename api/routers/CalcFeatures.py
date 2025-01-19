from typing import Dict

from .features_weights import weights

class CalcFeatures:
    @staticmethod
    def calc_feature_score(features_dict: Dict[str, bool]) -> int:
        return sum(weights[feature] for feature, active in features_dict.items() if active)

    @staticmethod
    def calc_advanced_model(model: str, version: str) -> str:
        return f"{model} {version}".strip()
