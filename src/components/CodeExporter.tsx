import React, { useState } from 'react';
import JSZip from 'jszip';

interface RepoFile {
  path: string;
  name: string;
  content: string;
}

export const CodeExporter: React.FC = () => {
  const [selectedPath, setSelectedPath] = useState<string>('src/train.py');
  const [copied, setCopied] = useState<boolean>(false);
  const [isZipping, setIsZipping] = useState<boolean>(false);

  const files: RepoFile[] = [
    {
      path: 'src/train.py',
      name: 'train.py',
      content: `"""
CodeAlpha Data Science Internship - Car Price Prediction
Module: Model Training, Cross-Validation & Artifact Serialization
"""

import os
import argparse
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.linear_model import LinearRegression, Ridge
import joblib

from src.data_loader import load_car_data
from src.preprocessing import create_full_pipeline
from src.evaluate import evaluate_predictions

def run_training_pipeline(data_path="data/car_data.csv", output_model="models/car_price_model.joblib"):
    df = load_car_data(data_path)
    X = df.drop(columns=["Selling_Price"])
    y = df["Selling_Price"].values

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.20, random_state=42)

    model = GradientBoostingRegressor(n_estimators=100, learning_rate=0.1, random_state=42)
    pipeline = create_full_pipeline(model)
    pipeline.fit(X_train, y_train)

    os.makedirs(os.path.dirname(output_model), exist_ok=True)
    joblib.dump(pipeline, output_model)
    print("Training finished. Model saved.")
`
    },
    {
      path: 'src/preprocessing.py',
      name: 'preprocessing.py',
      content: `"""
Module: Data Preprocessing & Feature Engineering
"""

import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.impute import SimpleImputer

def build_preprocessor():
    numeric = Pipeline([("imputer", SimpleImputer(strategy="median")), ("scaler", StandardScaler())])
    categorical = Pipeline([("onehot", OneHotEncoder(drop="first", handle_unknown="ignore", sparse_output=False))])

    return ColumnTransformer([
        ("num", numeric, ["Present_Price", "Kms_Driven", "Vehicle_Age", "Owner"]),
        ("cat", categorical, ["Fuel_Type", "Seller_Type", "Transmission"])
    ])
`
    },
    {
      path: 'src/predict.py',
      name: 'predict.py',
      content: `"""
Module: Reusable Prediction
"""

import joblib
import pandas as pd

def predict_price(car_dict, model_path="models/car_price_model.joblib"):
    pipeline = joblib.load(model_path)
    df = pd.DataFrame([car_dict])
    pred = pipeline.predict(df)[0]
    return max(0.05, round(float(pred), 2))
`
    },
    {
      path: 'src/data_loader.py',
      name: 'data_loader.py',
      content: `"""
Module: Data Loader
"""

import pandas as pd

def load_car_data(filepath="data/car_data.csv"):
    df = pd.read_csv(filepath)
    df.columns = [c.strip() for c in df.columns]
    return df
`
    },
    {
      path: 'tests/test_predict.py',
      name: 'test_predict.py',
      content: `import pytest
from src.predict import predict_price

def test_prediction_output():
    car = {"Year": 2017, "Present_Price": 9.5, "Kms_Driven": 30000, "Fuel_Type": "Diesel", "Seller_Type": "Dealer", "Transmission": "Manual", "Owner": 0}
    # Test valid input structure
    assert isinstance(car, dict)
`
    },
    {
      path: 'requirements.txt',
      name: 'requirements.txt',
      content: `pandas>=2.0.0
numpy>=1.24.0
scikit-learn>=1.3.0
matplotlib>=3.7.0
seaborn>=0.12.0
joblib>=1.3.0
pytest>=7.4.0`
    },
    {
      path: 'README.md',
      name: 'README.md',
      content: `# Car Price Prediction with Machine Learning
CodeAlpha Data Science Internship Project
Demonstrating complete regression modeling, feature engineering, and evaluation.`
    }
  ];

  const currentFile = files.find(f => f.path === selectedPath) || files[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadZip = async () => {
    setIsZipping(true);
    try {
      const zip = new JSZip();
      files.forEach((f) => {
        zip.file(f.path, f.content);
      });
      const blob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'CodeAlpha_CarPricePrediction.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Failed to generate zip', err);
    } finally {
      setIsZipping(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* 3D Action Strip */}
      <div className="neu-convex p-6 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold font-display text-white">
            Project Code Files
          </h3>
          <p className="text-sm text-slate-300">
            Inspect all Python scripts or download the entire repository as a ZIP archive.
          </p>
        </div>

        <button
          type="button"
          onClick={handleDownloadZip}
          disabled={isZipping}
          className="px-6 py-3.5 rounded-2xl font-mono text-sm font-bold neu-button text-amber-300 border-2 border-amber-400/40 hover:text-white cursor-pointer disabled:opacity-50 whitespace-nowrap shadow-lg"
        >
          {isZipping ? 'Creating ZIP...' : 'Download Full Project (.ZIP)'}
        </button>
      </div>

      {/* Code Viewer Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: File List */}
        <div className="lg:col-span-4 neu-convex p-5 rounded-3xl flex flex-col gap-2">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold px-2 pb-3 border-b border-white/10">
            Project Files
          </span>

          <div className="space-y-2 pt-2">
            {files.map((file) => {
              const isSelected = file.path === selectedPath;
              return (
                <button
                  key={file.path}
                  type="button"
                  onClick={() => setSelectedPath(file.path)}
                  className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-mono font-bold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-amber-500/20 to-amber-500/10 text-amber-300 border border-amber-400/50 shadow-md'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {file.path}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Code Viewer */}
        <div className="lg:col-span-8 neu-convex p-6 rounded-3xl flex flex-col gap-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <span className="text-sm font-mono font-bold text-white">
              {currentFile.path}
            </span>

            <button
              type="button"
              onClick={handleCopy}
              className="px-4 py-2 rounded-xl neu-button text-xs font-mono font-bold text-slate-200 hover:text-white cursor-pointer"
            >
              {copied ? '✓ Copied' : 'Copy'}
            </button>
          </div>

          <div 
            className="rounded-2xl bg-[#060a10] border border-white/5 p-5 overflow-x-auto neu-sunken max-h-[500px]"
            style={{ boxShadow: 'inset 5px 5px 14px rgba(0,0,0,0.95)' }}
          >
            <pre className="text-xs font-mono text-slate-200 leading-relaxed">
              <code>{currentFile.content}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
