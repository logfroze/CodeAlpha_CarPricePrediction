# Dataset Documentation - CodeAlpha Car Price Prediction

This directory contains the datasets and specifications used for the **Car Price Prediction with Machine Learning** project for the CodeAlpha Data Science Internship.

## Primary Benchmark Dataset: CarDekho Used Car Dataset
- **File**: `data/car_data.csv`
- **Origin & Reference**: Sourced from the public CarDekho dataset on Kaggle (widely utilized across data science benchmarks and CodeAlpha curriculum).
- **License**: Public Domain / CC0 Open Data.
- **Records**: 301 vehicles.

### Schema & Features
| Column Name | Type | Description | Unit / Values |
| :--- | :--- | :--- | :--- |
| `Car_Name` | String | Model / Make descriptor (e.g. `ritz`, `sx4`, `city`) | Text (dropped/tokenized during feature modeling to prevent sparse high-cardinality leakage) |
| `Year` | Integer | Year of manufacture / initial registration | Calendar Year (e.g., 2003 - 2018) |
| `Present_Price` | Float | Original ex-showroom price of the vehicle when new | **Lakhs INR** (1 Lakh = 100,000 INR; e.g. 5.59 = ₹559,000) |
| `Kms_Driven` | Integer | Total odometer distance travelled by vehicle | Kilometers |
| `Fuel_Type` | Categorical | Type of fuel consumed | `Petrol`, `Diesel`, `CNG` |
| `Seller_Type` | Categorical | Entity selling the car | `Dealer`, `Individual` |
| `Transmission` | Categorical | Transmission gearbox type | `Manual`, `Automatic` |
| `Owner` | Integer | Number of previous distinct owners | `0` (First owner), `1`, `3` |
| **`Selling_Price`** | Float | **Target Variable**: Actual transaction selling price | **Lakhs INR** |

### Engineered Features
- **`Vehicle_Age`**: Derived as `Reference_Year (2024) - Year`. Captures non-linear physical and market depreciation better than raw calendar years.

---

## Secondary Dataset: US Used Car Market Dataset
- **File**: `data/us_car_data.csv`
- **Origin**: Derived from public US used vehicle retail listings.
- **Features**: `Year`, `Original_MSRP` ($ USD), `Mileage` (Miles), `Fuel_Type` (Gasoline/Diesel/Hybrid/Electric), `Transmission` (Automatic/Manual), `Condition` (Excellent/Good/Fair), and target **`Selling_Price`** ($ USD).

---

## Data Placement & Configuration
To supply your own custom or official CodeAlpha dataset:
1. Place your CSV inside `data/custom_car_data.csv`.
2. Update the configuration parameter in `src/data_loader.py` or specify `--data-path` when executing `src/train.py`:
   ```bash
   python src/train.py --data-path data/custom_car_data.csv
   ```
3. Ensure the target column matches `Selling_Price` (or specify `--target-col`).
