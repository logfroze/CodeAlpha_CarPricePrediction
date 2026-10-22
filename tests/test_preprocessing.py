"""
Unit tests for data loader and feature engineering preprocessing.
"""

import pytest
import pandas as pd
import numpy as np
from src.preprocessing import FeatureEngineer, build_preprocessor, create_full_pipeline
from sklearn.linear_model import LinearRegression


def test_feature_engineer_vehicle_age():
    fe = FeatureEngineer(reference_year=2024, drop_columns=["Car_Name"])
    df = pd.DataFrame({
        "Car_Name": ["swift", "city"],
        "Year": [2018, 2014],
        "Present_Price": [6.5, 10.0]
    })
    
    transformed = fe.transform(df)
    assert "Vehicle_Age" in transformed.columns
    assert "Year" not in transformed.columns
    assert "Car_Name" not in transformed.columns
    assert transformed["Vehicle_Age"].tolist() == [6, 10]


def test_preprocessor_column_transformer():
    preprocessor = build_preprocessor()
    df = pd.DataFrame({
        "Present_Price": [5.5, 9.8, np.nan],
        "Kms_Driven": [20000, 45000, 30000],
        "Vehicle_Age": [5, 8, 3],
        "Owner": [0, 1, 0],
        "Fuel_Type": ["Petrol", "Diesel", "CNG"],
        "Seller_Type": ["Dealer", "Individual", "Dealer"],
        "Transmission": ["Manual", "Automatic", "Manual"]
    })
    
    transformed_matrix = preprocessor.fit_transform(df)
    # Check that matrix is 2D numpy array and contains no NaN values
    assert isinstance(transformed_matrix, np.ndarray)
    assert not np.isnan(transformed_matrix).any()
    assert transformed_matrix.shape[0] == 3


def test_pipeline_with_unseen_category():
    pipeline = create_full_pipeline(LinearRegression())
    train_df = pd.DataFrame({
        "Car_Name": ["swift", "city"],
        "Year": [2015, 2018],
        "Present_Price": [6.0, 10.5],
        "Kms_Driven": [30000, 15000],
        "Fuel_Type": ["Petrol", "Diesel"],
        "Seller_Type": ["Dealer", "Dealer"],
        "Transmission": ["Manual", "Automatic"],
        "Owner": [0, 0]
    })
    y_train = np.array([4.2, 8.5])
    
    pipeline.fit(train_df, y_train)

    # Test with unseen fuel type / category to ensure handle_unknown='ignore' works cleanly
    test_df = pd.DataFrame({
        "Car_Name": ["unknown"],
        "Year": [2016],
        "Present_Price": [7.0],
        "Kms_Driven": [25000],
        "Fuel_Type": ["CNG"], # unseen in small training slice
        "Seller_Type": ["Individual"], # unseen
        "Transmission": ["Manual"],
        "Owner": [0]
    })
    
    pred = pipeline.predict(test_df)
    assert len(pred) == 1
    assert not np.isnan(pred[0])
