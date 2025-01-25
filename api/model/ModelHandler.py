from pathlib import Path
from xgboost import Booster, DMatrix
from model.ModelInput import ModelInput
from common.Config import Config
from model.category_encoding_from_json import category_encoding_from_json


class ModelHandler:
    def __init__(self):
        self.model = None

    def load_model(self, model_path: Path):
        if not model_path.exists():
            raise FileNotFoundError(f"{model_path} not exists!")

        self.model = Booster()
        self.model.load_model(model_path)

    def predict(self, model_input: ModelInput) -> float:
        df = model_input.get_dataframe()
        df = category_encoding_from_json(df, Config.category_mapping_path)
        return self.model.predict(DMatrix(df, enable_categorical=True))[0]
    

model_handler = ModelHandler()
model_handler.load_model(Config.model_path)
