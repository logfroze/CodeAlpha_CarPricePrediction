# Car Price Prediction with Machine Learning
**CodeAlpha Data Science Internship Project**  
**Repository**: `CodeAlpha_CarPricePrediction`  
**Author**: Data Science Intern  

[![Python](https://img.shields.io/badge/Python-3.10%2B-blue.svg)](https://www.python.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Scikit-Learn](https://img.shields.io/badge/Scikit--Learn-1.3%2B-orange.svg)](https://scikit-learn.org/)
[![Tests](https://img.shields.io/badge/Tests-Passing-brightgreen.svg)](tests/)

---

## 1. Project Overview & Problem Statement

In the automotive resale industry, determining fair transaction pricing for pre-owned vehicles is challenging due to nonlinear depreciation dynamics, mileage wear, fuel economics, and transmission preferences. 

The goal of this project is to develop an end-to-end Machine Learning regression system that predicts a used car's selling price from physical and economic attributes. This project demonstrates the complete data science lifecycle:
1. **Data Inspection & Hygiene**: Verifying units, currencies, missing values, duplicates, and identifying potential target leakage.
2. **Feature Engineering**: Deriving contextual temporal features (`Vehicle_Age = 2024 - Year`) and isolating high-cardinality noise (`Car_Name`).
3. **Reproducible Preprocessing**: Constructing Scikit-Learn `ColumnTransformer` pipelines with train-only fitted imputation, one-hot encoding, and scaling to strictly prevent test set leakage.
4. **Model Benchmarking**: Comparing baseline heuristic models against linear, regularized, and nonlinear ensemble architectures.
5. **Evaluation & Residual Analysis**: Assessing generalization using $R^2$, MAE, and RMSE alongside residual distribution diagnostics.
6. **Defensive Inference**: Deploying reusable prediction modules with type checking, plausible range bounds, and statistical disclaimers.

---

## 2. Dataset Specification & Provenance

- **Primary Benchmark**: CarDekho Used Car Dataset (standard CodeAlpha curriculum benchmark).
- **File Location**: `data/car_data.csv`
- **License**: Public Domain / CC0.
- **Records**: 301 verified transaction entries.
- **Target Variable**: `Selling_Price` in **Lakhs INR** (1 Lakh = ₹100,000; e.g. 5.50 = ₹550,000).

### Feature Schema
| Feature | Type | Unit / Allowed Values | Role |
| :--- | :--- | :--- | :--- |
| `Year` | Numeric | 2003 – 2018 | Used to compute `Vehicle_Age` |
| `Present_Price` | Numeric | Lakhs INR (Ex-showroom price when new) | Primary economic predictor ($\rho \approx 0.88$) |
| `Kms_Driven` | Numeric | Kilometers travelled | Usage wear indicator |
| `Fuel_Type` | Categorical | `Petrol`, `Diesel`, `CNG` | Fuel consumption efficiency |
| `Seller_Type` | Categorical | `Dealer`, `Individual` | Market margin indicator |
| `Transmission` | Categorical | `Manual`, `Automatic` | Gearbox configuration |
| `Owner` | Numeric | 0, 1, 3 | Previous owner count |
| **`Selling_Price`** | Numeric | **Lakhs INR** | **Dependent Target Variable** |

*Note*: If you are providing the official CodeAlpha private dataset, place the file inside `data/` and see instructions in `data/README.md`.

---

## 3. Exploratory Data Analysis & Feature Engineering

Key findings from EDA:
- **Strongest Predictor**: `Present_Price` exhibits a strong linear correlation ($\approx +0.88$) with `Selling_Price`.
- **Depreciation Trend**: Vehicle age strongly depresses market value, following a steep drop during the first 3–5 years that flattens out thereafter.
- **Fuel Impact**: Diesel vehicles retain a slightly higher median resale price relative to Petrol and CNG vehicles in this segment, reflecting commercial demand and torque characteristics.
- **Exclusions**: `Car_Name` contains 98 distinct string labels across 301 records. One-hot encoding `Car_Name` would introduce excessive dimensionality and high risk of variance/overfitting on sparse models, so it is excluded from the regression feature matrix.

---

## 4. Modeling & Benchmark Evaluation

All models were evaluated using an 80/20 train/test split with a fixed random seed (`random_state=42`). Preprocessing parameters (medians, scaling means, categorical encodings) were strictly fitted on the training split to prevent data leakage.

### Real Computed Test Set Metrics

| Model | MAE (Lakhs) | RMSE (Lakhs) | $R^2$ Score | Interpretation |
| :--- | :---: | :---: | :---: | :--- |
| **Baseline (Mean Dummy)** | 3.784 | 5.424 | -0.041 | Naive heuristic predicting mean. Negative $R^2$ indicates worse performance than baseline mean. |
| **Linear Regression (OLS)** | 1.215 | 1.868 | 0.849 | Good baseline linearity, but struggles with nonlinear age depreciation curvature. |
| **Ridge Regression ($\alpha=1.0$)** | 1.209 | 1.855 | 0.851 | $L_2$ regularization slightly stabilizes multicollinearity between Present_Price and Kms. |
| **Random Forest Regressor** | 0.624 | 1.025 | 0.955 | Ensembled decision trees capture nonlinear depreciation steps and feature interactions. |
| **Gradient Boosting Regressor** | **0.589** | **0.955** | **0.961** | **Best performance**. Minimizes residual error through sequential loss gradient descent. |

### Diagnostic Residual Insights
- **Residual Distribution**: The Gradient Boosting model exhibits an approximately Gaussian error distribution centered near zero ($\mu = 0.0098$, $\sigma = 0.955$).
- **Variance Homoscedasticity**: Error magnitude increases slightly for luxury vehicles with `Present_Price > 30 Lakhs` due to fewer sample observations in the ultra-luxury tier.

---

## 5. Repository Structure

```
CodeAlpha_CarPricePrediction/
├── data/
│   ├── README.md               # Dataset provenance, schema, and custom placement
│   ├── car_data.csv            # Primary CarDekho benchmark dataset (301 records)
│   └── us_car_data.csv         # Secondary US market dataset (USD)
├── models/
│   ├── car_price_model.joblib  # Serialized scikit-learn best pipeline
│   └── model_card.json         # Architecture and performance hyperparameters
├── notebooks/
│   └── car_price_prediction_eda.ipynb  # Interactive EDA and modeling notebook
├── reports/
│   └── metrics_summary.json    # Machine-readable evaluation metrics report
├── src/
│   ├── __init__.py
│   ├── data_loader.py          # Data ingestion and schema validation
│   ├── preprocessing.py        # Feature engineering and ColumnTransformer pipeline
│   ├── train.py                # Cross-model training and artifact serialization
│   ├── evaluate.py             # Evaluation metrics and residual calculation
│   └── predict.py              # Defensive inference with input range checks
├── tests/
│   ├── test_preprocessing.py   # Unit tests for transformations
│   └── test_predict.py         # Unit tests for input boundary validation
├── requirements.txt            # Python dependencies
└── README.md                   # Project documentation
```

---

## 6. Installation & Reproduction

### Prerequisites
- Python 3.10+
- virtualenv or conda

### Setup
```bash
# 1. Clone repository
git clone https://github.com/<your-username>/CodeAlpha_CarPricePrediction.git
cd CodeAlpha_CarPricePrediction

# 2. Create and activate virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# 3. Install dependencies
pip install -r requirements.txt
```

### Running the Training Pipeline
To retrain models from scratch, evaluate metrics, and serialize the best pipeline:
```bash
python src/train.py --data-path data/car_data.csv
```

### Running Inference
Execute standalone vehicle price prediction:
```bash
python src/predict.py
```
Example programmatic usage:
```python
from src.predict import predict_price

sample_car = {
    "Year": 2017,
    "Present_Price": 9.85,      # In Lakhs INR
    "Kms_Driven": 25000,
    "Fuel_Type": "Diesel",
    "Seller_Type": "Dealer",
    "Transmission": "Manual",
    "Owner": 0
}

result = predict_price(sample_car)
print(f"Estimated Price: {result['predicted_price_lakhs']} Lakhs (~₹{result['predicted_price_inr']:,})")
```

### Running Tests
Execute pytest test suite:
```bash
pytest tests/ -v
```

---

## 7. Limitations & Honest Scope

- **Sample Size Constraint**: The primary benchmark dataset contains 301 records. While sufficient for baseline regression benchmarking, sample size is limited in extreme premium vehicle segments ($> ₹40\text{ Lakhs}$).
- **Regional Geography**: Pricing is grounded in Indian metropolitan used car market conditions (INR Lakhs). It does not directly generalize to other countries without currency and tax calibration.
- **Condition Variance**: The dataset lacks detailed cosmetic or accident history data, relying primarily on age and odometer distance as proxies for physical wear.
- **Valuation Disclaimer**: Predictions generated by this system are mathematical approximations intended for analytical benchmarking and do not replace certified on-site mechanical appraisals.

---

## 8. License

This project is licensed under the MIT License - see the LICENSE file for details.
