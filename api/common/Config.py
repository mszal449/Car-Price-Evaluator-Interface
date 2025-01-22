from pathlib import Path


class Config:
    root_path = Path(__file__).parent.parent
    model_path = root_path / "model" / "model.bst"

    categorical_columns = [
        'Condition', 'Vehicle_brand', 'Vehicle_model', 'Vehicle_generation',
        'Fuel_type', 'Drive', 'Transmission', 'Type', 'Colour', 'Advanced_model'
    ]
