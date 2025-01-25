from pathlib import Path


class Config:
    root_path = Path(__file__).parent.parent
    model_path = root_path / "model" / "model.bst"
    category_mapping_path = root_path / "model" / "category_mapping.json"

    categorical_columns = [
        'Condition', 'Vehicle_brand', 'Vehicle_model', 'Vehicle_generation',
        'Fuel_type', 'Drive', 'Transmission', 'Type', 'Colour', 'Advanced_model'
    ]
