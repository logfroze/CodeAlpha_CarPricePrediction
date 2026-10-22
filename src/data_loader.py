"""
CodeAlpha Data Science Internship - Car Price Prediction
Module: Data Loader & Inspection
"""

import os
import sys
import pandas as pd
import numpy as np
from typing import Tuple, Dict, Any


def load_car_data(filepath: str = "data/car_data.csv", target_col: str = "Selling_Price") -> pd.DataFrame:
    """
    Load vehicle dataset from filepath and validate basic integrity.
    
    Args:
        filepath: Relative or absolute path to dataset CSV.
        target_col: Name of the dependent variable to predict.
        
    Returns:
        pd.DataFrame: Loaded and validated pandas DataFrame.
        
    Raises:
        FileNotFoundError: If the specified CSV file does not exist.
        ValueError: If target column is missing or dataset is empty.
    """
    if not os.path.exists(filepath):
        raise FileNotFoundError(
            f"Dataset not found at '{filepath}'. Please review data/README.md for instructions."
        )

    df = pd.read_csv(filepath)
    if df.empty:
        raise ValueError(f"Dataset at '{filepath}' is empty.")

    if target_col not in df.columns:
        raise ValueError(
            f"Target column '{target_col}' not found in dataset columns: {list(df.columns)}"
        )

    # Basic normalization: strip column whitespace
    df.columns = [c.strip() for c in df.columns]
    return df


def inspect_data(df: pd.DataFrame, target_col: str = "Selling_Price") -> Dict[str, Any]:
    """
    Perform structural and exploratory audit of the dataset.
    
    Returns:
        Dict containing shape, missing values, duplicates, and column summary.
    """
    num_rows, num_cols = df.shape
    missing_counts = df.isnull().sum().to_dict()
    duplicates_count = int(df.duplicated().sum())

    summary = {
        "rows": num_rows,
        "columns": num_cols,
        "features": list(df.columns),
        "missing_values": missing_counts,
        "duplicates": duplicates_count,
        "dtypes": {k: str(v) for k, v in df.dtypes.to_dict().items()},
        "target_stats": {
            "mean": float(df[target_col].mean()),
            "std": float(df[target_col].std()),
            "min": float(df[target_col].min()),
            "max": float(df[target_col].max()),
            "median": float(df[target_col].median())
        }
    }
    return summary


if __name__ == "__main__":
    path = sys.argv[1] if len(sys.argv) > 1 else "data/car_data.csv"
    data = load_car_data(path)
    report = inspect_data(data)
    print("=== DATASET INSPECTION REPORT ===")
    print(f"Shape: {report['rows']} rows, {report['columns']} columns")
    print(f"Duplicates: {report['duplicates']}")
    print(f"Target stats (Selling_Price): {report['target_stats']}")
