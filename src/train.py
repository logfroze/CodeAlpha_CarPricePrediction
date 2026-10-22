"""
CodeAlpha Data Science Internship - Car Price Prediction
Module: Model Training, Cross-Validation & Artifact Serialization
"""

import os
import json
import argparse
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.dummy import DummyRegressor
from sklearn.linear_model import LinearRegression, Ridge
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
import joblib

from src.data_loader import load_car_data
from src.preprocessing import create_full_pipeline
from src.evaluate import evaluate_predictions, format_metrics_table


def run_training_pipeline(
    data_path: str = "data/car_data.csv",
    output_model_path: str = "models/car_price_model.joblib",
    output_reports_dir: str = "reports",
    random_state: int = 42
):
    print("=" * 60)
    print("CodeAlpha Car Price Prediction - ML Pipeline Training")
    print("=" * 60)

    # 1. Load Data
    print(f"[1/5] Loading dataset from '{data_path}'...")
    df = load_car_data(data_path)
    print(f"      Loaded {len(df)} records with columns: {list(df.columns)}")

    # 2. Features and Target Split
    target_col = "Selling_Price"
    X = df.drop(columns=[target_col])
    y = df[target_col].values

    # Train / Test split before any fitting (prevents data leakage)
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.20, random_state=random_state
    )
    print(f"[2/5] Partitioned: {len(X_train)} train samples, {len(X_test)} test samples (test size = 20%)")

    # 3. Models to benchmark
    models = {
        "Baseline (Mean)": DummyRegressor(strategy="mean"),
        "Linear Regression": LinearRegression(),
        "Ridge Regression (alpha=1.0)": Ridge(alpha=1.0, random_state=random_state),
        "Random Forest Regressor": RandomForestRegressor(n_estimators=100, max_depth=10, random_state=random_state),
        "Gradient Boosting Regressor": GradientBoostingRegressor(n_estimators=100, learning_rate=0.1, random_state=random_state)
    }

    # 4. Train & Evaluate
    print("[3/5] Training candidate pipelines and evaluating on held-out test set...")
    eval_results = []
    trained_pipelines = {}

    for name, regressor in models.items():
        pipeline = create_full_pipeline(regressor)
        pipeline.fit(X_train, y_train)
        
        y_pred = pipeline.predict(X_test)
        metrics = evaluate_predictions(y_test, y_pred, model_name=name)
        eval_results.append(metrics)
        trained_pipelines[name] = pipeline
        print(f"      {name:30} -> R²: {metrics['r2_score']:.4f} | MAE: {metrics['mae']:.4f} | RMSE: {metrics['rmse']:.4f}")

    print("\n" + format_metrics_table(eval_results) + "\n")

    # Select best model based on highest R2 score on held-out test set
    best_result = max(eval_results, key=lambda x: x["r2_score"])
    best_name = best_result["model_name"]
    best_pipeline = trained_pipelines[best_name]
    print(f"[4/5] Best performing model: '{best_name}' (R² = {best_result['r2_score']})")

    # 5. Save Artifacts
    os.makedirs(os.path.dirname(output_model_path), exist_ok=True)
    os.makedirs(output_reports_dir, exist_ok=True)

    print(f"[5/5] Saving model artifact to '{output_model_path}'...")
    joblib.dump(best_pipeline, output_model_path)

    summary_file = os.path.join(output_reports_dir, "metrics_summary.json")
    with open(summary_file, "w") as f:
        json.dump({
            "dataset": data_path,
            "train_samples": len(X_train),
            "test_samples": len(X_test),
            "random_state": random_state,
            "best_model": best_name,
            "benchmark_results": eval_results
        }, f, indent=2)

    print(f"      Saved metrics summary to '{summary_file}'")
    print("=" * 60)
    print("Pipeline training completed successfully!")
    print("=" * 60)
    return best_pipeline, eval_results


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Train CodeAlpha Car Price Prediction Models")
    parser.add_argument("--data-path", type=str, default="data/car_data.csv")
    parser.add_argument("--model-path", type=str, default="models/car_price_model.joblib")
    parser.add_argument("--reports-dir", type=str, default="reports")
    args = parser.parse_args()

    run_training_pipeline(
        data_path=args.data_path,
        output_model_path=args.model_path,
        output_reports_dir=args.reports_dir
    )
