
import os
import xgboost as xgb

model_path = os.path.join(os.path.dirname(__file__), "maxed.bst")
model = xgb.Booster()
model.load_model(model_path)

if not os.path.exists(model_path):
    raise FileNotFoundError(f"BŁĄD: Plik modelu {model_path} nie istnieje!")