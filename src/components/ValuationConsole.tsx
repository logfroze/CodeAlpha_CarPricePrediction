import React, { useState, useMemo } from 'react';
import { AnalogGauge } from './AnalogGauge';
import { DigitalLCD } from './DigitalLCD';
import { TactileRocker } from './TactileRocker';
import { KnobDial } from './KnobDial';
import { CarPriceModelEngine, InputFeatures } from '../ml/regressionEngine';
import { DatasetMeta } from '../data/carDataset';

interface ValuationConsoleProps {
  engine: CarPriceModelEngine;
  datasetMeta: DatasetMeta;
}

export const ValuationConsole: React.FC<ValuationConsoleProps> = ({
  engine,
  datasetMeta
}) => {
  const isUsd = datasetMeta.id === 'usd';

  const [features, setFeatures] = useState<InputFeatures>({
    year: isUsd ? 2019 : 2016,
    presentPrice: isUsd ? 27500 : 9.54,
    kmsDriven: isUsd ? 42000 : 35000,
    fuelType: isUsd ? 'Gasoline' : 'Diesel',
    sellerType: 'Dealer',
    transmission: 'Manual',
    owner: 0
  });

  const [activeModelId, setActiveModelId] = useState<string>('gradient_boosting');

  const prediction = useMemo(() => {
    return engine.predict(features, activeModelId);
  }, [engine, features, activeModelId]);

  const maxGaugeVal = isUsd ? 60000 : 35.0;

  const applyPreset = (preset: 'compact' | 'sedan' | 'suv') => {
    if (preset === 'compact') {
      setFeatures({
        year: 2015,
        presentPrice: isUsd ? 18500 : 5.59,
        kmsDriven: isUsd ? 55000 : 42000,
        fuelType: isUsd ? 'Gasoline' : 'Petrol',
        sellerType: 'Dealer',
        transmission: 'Manual',
        owner: 0
      });
    } else if (preset === 'sedan') {
      setFeatures({
        year: 2017,
        presentPrice: isUsd ? 28000 : 9.85,
        kmsDriven: isUsd ? 32000 : 25000,
        fuelType: isUsd ? 'Gasoline' : 'Diesel',
        sellerType: 'Dealer',
        transmission: 'Automatic',
        owner: 0
      });
    } else {
      setFeatures({
        year: 2018,
        presentPrice: isUsd ? 48000 : 23.50,
        kmsDriven: isUsd ? 28000 : 18000,
        fuelType: isUsd ? 'Gasoline' : 'Diesel',
        sellerType: 'Dealer',
        transmission: 'Automatic',
        owner: 0
      });
    }
  };

  const fuelOptions = isUsd
    ? [
        { value: 'Gasoline', label: 'Gasoline' },
        { value: 'Electric', label: 'Electric' },
        { value: 'Hybrid', label: 'Hybrid' }
      ]
    : [
        { value: 'Diesel', label: 'Diesel' },
        { value: 'Petrol', label: 'Petrol' },
        { value: 'CNG', label: 'CNG' }
      ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left Column: 3D Gauge & Digital Display */}
      <div className="lg:col-span-5 flex flex-col gap-6">
        {/* 3D Gauge Console */}
        <div className="neu-convex p-6 rounded-3xl flex flex-col items-center">
          <AnalogGauge
            value={prediction.predictedPrice}
            maxValue={maxGaugeVal}
            unit={datasetMeta.currencyUnit}
            label="VALUATION"
            currencySymbol={datasetMeta.currencySymbol}
          />
        </div>

        {/* 3D Sunken LCD Readout */}
        <DigitalLCD
          prediction={prediction}
          currencySymbol={datasetMeta.currencySymbol}
          currencyUnit={datasetMeta.currencyUnit}
          isUsdMode={isUsd}
        />
      </div>

      {/* Right Column: 3D Control Center */}
      <div className="lg:col-span-7 flex flex-col gap-6">
        <div className="neu-convex p-7 rounded-3xl flex flex-col gap-6">
          {/* Header & Quick Archetype Buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <h2 className="text-xl font-bold font-display text-white tracking-tight">
                Car Specifications
              </h2>
              <p className="text-sm text-slate-300">
                Adjust vehicle parameters to update price in real time.
              </p>
            </div>

            {/* 3D Preset Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => applyPreset('compact')}
                className="px-3.5 py-2 text-xs font-mono font-bold rounded-xl neu-button text-slate-200 hover:text-white cursor-pointer"
              >
                Hatchback
              </button>
              <button
                type="button"
                onClick={() => applyPreset('sedan')}
                className="px-3.5 py-2 text-xs font-mono font-bold rounded-xl neu-button text-slate-200 hover:text-white cursor-pointer"
              >
                Sedan
              </button>
              <button
                type="button"
                onClick={() => applyPreset('suv')}
                className="px-3.5 py-2 text-xs font-mono font-bold rounded-xl neu-button text-slate-200 hover:text-white cursor-pointer"
              >
                SUV
              </button>
            </div>
          </div>

          {/* Sliders and Knobs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Year Rotary Dial */}
            <KnobDial
              label="Manufacture Year"
              value={features.year}
              min={isUsd ? 2014 : 2004}
              max={2024}
              step={1}
              onChange={(y) => setFeatures(prev => ({ ...prev, year: y }))}
            />

            {/* Original Showroom Price Slider */}
            <div className="p-5 rounded-3xl neu-convex flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">
                  {isUsd ? 'Original MSRP' : 'Original Price (New)'}
                </span>
                <span className="text-sm font-mono font-bold text-amber-400 tabular-nums">
                  {datasetMeta.currencySymbol}{features.presentPrice.toFixed(2)} {datasetMeta.currencyUnit.split(' ')[0]}
                </span>
              </div>

              {/* 3D Sunken Slider Track */}
              <div className="p-2 my-3 rounded-xl neu-sunken">
                <input
                  type="range"
                  min={isUsd ? 10000 : 1.5}
                  max={isUsd ? 85000 : 40.0}
                  step={isUsd ? 500 : 0.25}
                  value={features.presentPrice}
                  onChange={(e) => setFeatures(prev => ({ ...prev, presentPrice: parseFloat(e.target.value) }))}
                  className="w-full h-3 appearance-none cursor-pointer rounded-lg bg-slate-800"
                />
              </div>

              <div className="flex justify-between text-xs font-mono text-slate-400">
                <span>{isUsd ? '$10k' : '₹1.5 Lakhs'}</span>
                <span>{isUsd ? '$85k' : '₹40 Lakhs'}</span>
              </div>
            </div>
          </div>

          {/* Odometer Distance Track */}
          <div className="p-5 rounded-3xl neu-convex flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">
                Distance Travelled
              </span>
              <div 
                className="px-4 py-1.5 rounded-xl bg-[#060a10] border border-cyan-500/30 text-sm font-mono font-bold text-cyan-300 tabular-nums"
                style={{ boxShadow: 'inset 2px 2px 6px rgba(0,0,0,0.8)' }}
              >
                {features.kmsDriven.toLocaleString()} {datasetMeta.distanceUnit}
              </div>
            </div>

            <div className="p-2 my-2 rounded-xl neu-sunken">
              <input
                type="range"
                min={500}
                max={isUsd ? 150000 : 180000}
                step={1000}
                value={features.kmsDriven}
                onChange={(e) => setFeatures(prev => ({ ...prev, kmsDriven: parseInt(e.target.value, 10) }))}
                className="w-full h-3 appearance-none cursor-pointer rounded-lg bg-slate-800 accent-cyan-400"
              />
            </div>

            <div className="flex justify-between text-xs font-mono text-slate-400">
              <span>Low (500 {datasetMeta.distanceUnit})</span>
              <span>High ({isUsd ? '150,000 miles' : '180,000 km'})</span>
            </div>
          </div>

          {/* 3D Tactile Rocker Switch Bank */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Fuel Type */}
            <TactileRocker
              label="Fuel Type"
              options={fuelOptions}
              value={features.fuelType}
              onChange={(f) => setFeatures(prev => ({ ...prev, fuelType: f }))}
              accentColor="amber"
            />

            {/* Gearbox Transmission */}
            <TactileRocker
              label="Transmission"
              options={[
                { value: 'Manual', label: 'Manual' },
                { value: 'Automatic', label: 'Automatic' }
              ]}
              value={features.transmission}
              onChange={(t) => setFeatures(prev => ({ ...prev, transmission: t }))}
              accentColor="cyan"
            />
          </div>

          {/* Seller & Owners */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <TactileRocker
              label="Seller Type"
              options={[
                { value: 'Dealer', label: 'Dealer' },
                { value: 'Individual', label: 'Individual' }
              ]}
              value={features.sellerType}
              onChange={(s) => setFeatures(prev => ({ ...prev, sellerType: s }))}
              accentColor="emerald"
            />

            {/* Previous Owners */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">
                Previous Owners
              </span>
              <div 
                className="p-1.5 rounded-2xl flex items-center gap-2 neu-sunken"
                style={{
                  boxShadow: 'inset 5px 5px 12px rgba(1, 3, 7, 0.95), inset -3px -3px 8px rgba(50, 72, 102, 0.25)'
                }}
              >
                {[
                  { val: 0, label: '0 (First)' },
                  { val: 1, label: '1 Owner' },
                  { val: 3, label: '2+ Owners' }
                ].map((o) => (
                  <button
                    key={o.val}
                    type="button"
                    onClick={() => setFeatures(prev => ({ ...prev, owner: o.val }))}
                    className={`flex-1 py-3 text-xs font-mono font-bold rounded-xl transition-all cursor-pointer ${
                      features.owner === o.val
                        ? 'bg-gradient-to-b from-amber-500 to-amber-700 text-slate-950 shadow-[inset_2px_2px_6px_rgba(0,0,0,0.6),0_0_12px_rgba(245,158,11,0.5)] border border-amber-300/60'
                        : 'bg-gradient-to-b from-[#223145] to-[#141d2a] text-slate-300 hover:text-white shadow-[4px_4px_10px_rgba(2,4,8,0.8),-3px_-3px_8px_rgba(55,80,115,0.35)]'
                    }`}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Model Architecture Toggle */}
          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">
              ML Model:
            </span>

            <div 
              className="p-1.5 rounded-2xl flex items-center gap-2 neu-sunken"
              style={{
                boxShadow: 'inset 4px 4px 10px rgba(1, 3, 7, 0.95)'
              }}
            >
              {[
                { id: 'gradient_boosting', label: 'Gradient Boosting' },
                { id: 'random_forest', label: 'Random Forest' },
                { id: 'linear', label: 'Linear Model' }
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setActiveModelId(m.id)}
                  className={`px-4 py-2 text-xs font-mono font-bold rounded-xl transition-all cursor-pointer ${
                    activeModelId === m.id
                      ? 'bg-gradient-to-b from-[#2a3c54] to-[#1a2535] text-amber-300 shadow-[2px_2px_8px_rgba(0,0,0,0.8)] border border-amber-500/40'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
