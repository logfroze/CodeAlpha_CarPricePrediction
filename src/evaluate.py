"""
CodeAlpha Data Science Internship - Car Price Prediction
Module: Model Evaluation & Residual Diagnostics
"""

import numpy as np
import pandas as pd
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from typing import Dict, Any


def evaluate_predictions(y_true: np.ndarray, y_pred: np.ndarray, model_name: str = "Model") -> Dict[str, Any]:
    """
    Compute standard regression evaluation metrics.
    
    Args:
        y_true: Ground truth target values.
        y_pred: Predicted values from regression estimator.
        model_name: Identifier label for reporting.
        
    Returns:
        Dict of evaluation metrics: MAE, MSE, RMSE, R2, and sample residuals.
    """
    mae = float(mean_absolute_error(y_true, y_pred))
    mse = float(mean_squared_error(y_true, y_pred))
    rmse = float(np.sqrt(mse))
    r2 = float(r2_score(y_true, y_pred))
    
    residuals = y_true - y_pred

    metrics = {
        "model_name": model_name,
        "mae": round(mae, 4),
        "mse": round(mse, 4),
        "rmse": round(rmse, 4),
        "r2_score": round(r2, 4),
        "mean_residual": round(float(np.mean(residuals)), 4),
        "std_residual": round(float(np.std(residuals)), 4),
        "max_error": round(float(np.max(np.abs(residuals))), 4)
    }
    return metrics


def format_metrics_table(evaluation_results: list) -> str:
    """
    Format a clean comparison markdown table from evaluation results.
    """
    header = "| Model | MAE (Lakhs) | RMSE (Lakhs) | R² Score |"
    divider = "| :--- | :---: | :---: | :---: |"
    rows = [
        f"| {res['model_name']} | {res['mae']:.3f} | {res['rmse']:.3f} | {res['r2_score']:.3f} |"
        for res in evaluation_results
    ]
    return "\n".join([header, divider] + rows)
