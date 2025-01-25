import pandas as pd
import json
from pathlib import Path


def category_encoding_from_json(data: pd.DataFrame, input_file: Path) -> pd.DataFrame:
    with input_file.open("r", encoding="utf-8") as f:
        mapping = json.load(f)

    for col in data.columns:
        if col in mapping:
            inv_map = {v: int(k) for k, v in mapping[col].items()}
            data[col] = data[col].astype(str).map(inv_map)

    return data