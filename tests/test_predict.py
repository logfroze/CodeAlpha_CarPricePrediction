"""
Unit tests for input validation and inference pipeline safety.
"""

import pytest
from src.predict import validate_input, REQUIRED_FEATURES


def test_validate_input_valid():
    sample = {
        "Year": 2017,
        "Present_Price": 8.5,
        "Kms_Driven": 28000,
        "Fuel_Type": "Diesel",
        "Seller_Type": "Dealer",
        "Transmission": "Manual",
        "Owner": 0
    }
    df = validate_input(sample)
    assert len(df) == 1
    assert df["Year"].iloc[0] == 2017
    assert df["Fuel_Type"].iloc[0] == "Diesel"


def test_validate_input_missing_field():
    sample = {
        "Year": 2017,
        # "Present_Price" missing
        "Kms_Driven": 28000,
        "Fuel_Type": "Diesel",
        "Seller_Type": "Dealer",
        "Transmission": "Manual",
        "Owner": 0
    }
    with pytest.raises(ValueError, match="Missing mandatory input feature"):
        validate_input(sample)


def test_validate_input_implausible_year():
    sample = {
        "Year": 1850, # Implausible year
        "Present_Price": 8.5,
        "Kms_Driven": 28000,
        "Fuel_Type": "Diesel",
        "Seller_Type": "Dealer",
        "Transmission": "Manual",
        "Owner": 0
    }
    with pytest.raises(ValueError, match="outside plausible range"):
        validate_input(sample)


def test_validate_input_invalid_category():
    sample = {
        "Year": 2017,
        "Present_Price": 8.5,
        "Kms_Driven": 28000,
        "Fuel_Type": "Kerosene", # Invalid fuel type
        "Seller_Type": "Dealer",
        "Transmission": "Manual",
        "Owner": 0
    }
    with pytest.raises(ValueError, match="Invalid value.*for 'Fuel_Type'"):
        validate_input(sample)
