"""
CodeAlpha Data Science Internship - Car Price Prediction
Module: Data Preprocessing & Feature Engineering
"""

import pandas as pd
import numpy as np
from sklearn.base import BaseEstimator, TransformerMixin
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.impute import SimpleImputer
from typing import List, Tuple


class FeatureEngineer(BaseEstimator, TransformerMixin):
    """
    Custom transformer to engineer features such as Vehicle_Age and drop non-predictive identifiers.
    """
    def __init__(self, reference_year: int = 2024, drop_columns: List[str] = None):
        self.reference_year = reference_year
        self.drop_columns = drop_columns if drop_columns is not None else ["Car_Name"]

    def fit(self, X: pd.DataFrame, y=None):
        return self

    def transform(self, X: pd.DataFrame) -> pd.DataFrame:
        X_out = X.copy()
        
        # Derive vehicle age
        if "Year" in X_out.columns:
            X_out["Vehicle_Age"] = self.reference_year - X_out["Year"]
            X_out["Vehicle_Age"] = X_out["Vehicle_Age"].clip(lower=0)
            X_out = X_out.drop(columns=["Year"])

        # Drop identifier or high-cardinality leaking columns
        cols_to_drop = [c for c in self.drop_columns if c in X_out.columns]
        if cols_to_drop:
            X_out = X_out.drop(columns=cols_to_drop)

        return X_out


def build_preprocessor(
    numeric_features: List[str] = None,
    categorical_features: List[str] = None
) -> ColumnTransformer:
    """
    Build scikit-learn ColumnTransformer for numeric and categorical pipelines.
    
    Numeric pipeline:
      - Median imputation (handles missing records robustly)
      - Standard scaling (normalizes variance for linear and regularized estimators)
      
    Categorical pipeline:
      - Most frequent imputation
      - OneHotEncoding with drop='first' and handle_unknown='ignore'
    """
    if numeric_features is None:
        numeric_features = ["Present_Price", "Kms_Driven", "Vehicle_Age", "Owner"]
    
    if categorical_features is None:
        categorical_features = ["Fuel_Type", "Seller_Type", "Transmission"]

    numeric_transformer = Pipeline(steps=[
        ("imputer", SimpleImputer(strategy="median")),
        ("scaler", StandardScaler())
    ])

    categorical_transformer = Pipeline(steps=[
        ("imputer", SimpleImputer(strategy="most_frequent")),
        ("onehot", OneHotEncoder(drop="first", handle_unknown="ignore", sparse_output=False))
    ])

    preprocessor = ColumnTransformer(
        transformers=[
            ("num", numeric_transformer, numeric_features),
            ("cat", categorical_transformer, categorical_features)
        ],
        remainder="drop"
    )

    return preprocessor


def create_full_pipeline(regressor, reference_year: int = 2024) -> Pipeline:
    """
    Construct an end-to-end scikit-learn Pipeline with feature engineering, column transforming, and model.
    """
    fe = FeatureEngineer(reference_year=reference_year)
    preprocessor = build_preprocessor()
    
    pipeline = Pipeline(steps=[
        ("feature_engineering", fe),
        ("preprocessor", preprocessor),
        ("regressor", regressor)
    ])
    return pipeline
