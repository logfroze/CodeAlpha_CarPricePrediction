import React from 'react';
import { PredictionResult } from '../ml/regressionEngine';

interface DigitalLCDProps {
  prediction: PredictionResult;
  currencySymbol: string;
  currencyUnit: string;
  isUsdMode: boolean;
}

export const DigitalLCD: React.FC<DigitalLCDProps> = ({
  prediction,
  currencySymbol,
  currencyUnit,
  isUsdMode
}) => {
  const formattedGross = isUsdMode
    ? `$${Math.round(prediction.predictedPrice).toLocaleString()}`
    : `₹${Math.round(prediction.predictedPrice * 100000).toLocaleString()}`;

  return (
    <div className="w-full flex flex-col gap-3">
      {/* 3D Sunken Display Panel */}
      <div 
        className="relative p-6 rounded-3xl lcd-display overflow-hidden"
        style={{
          border: '2px solid rgba(245, 158, 11, 0.35)',
          boxShadow: 'inset 6px 6px 18px rgba(0, 0, 0, 0.98), inset -4px -4px 10px rgba(50, 70, 95, 0.3), 0 10px 28px rgba(0, 0, 0, 0.7)'
        }}
      >
        <div className="relative z-10 flex flex-col gap-5">
          {/* Main Price Headline */}
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 pb-4 border-b border-amber-500/20">
            <div>
              <div className="text-xs text-amber-400 font-mono font-semibold uppercase tracking-wider mb-1">
                Estimated Price
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-mono font-extrabold lcd-amber tabular-nums tracking-tight">
                  {currencySymbol}{prediction.predictedPrice.toFixed(2)}
                </span>
                <span className="text-base font-mono font-semibold text-amber-400/90">
                  {currencyUnit}
                </span>
              </div>
            </div>

            <div className="sm:text-right">
              <div className="text-xs text-slate-400 font-mono mb-1">
                Total Valuation
              </div>
              <div className="text-2xl sm:text-3xl font-mono font-bold text-white tabular-nums">
                {formattedGross}
              </div>
            </div>
          </div>

          {/* Key Facts in Big Tactile 3D Blocks */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div 
              className="p-3.5 rounded-2xl bg-[#05080e] border border-amber-500/20 flex flex-col gap-1"
              style={{ boxShadow: 'inset 2px 2px 6px rgba(0,0,0,0.8)' }}
            >
              <span className="text-xs text-slate-400 font-mono font-medium">Price Range</span>
              <span className="text-sm font-mono font-bold text-amber-300 tabular-nums">
                {currencySymbol}{prediction.lowerBound.toFixed(2)} – {currencySymbol}{prediction.upperBound.toFixed(2)}
              </span>
            </div>

            <div 
              className="p-3.5 rounded-2xl bg-[#05080e] border border-amber-500/20 flex flex-col gap-1"
              style={{ boxShadow: 'inset 2px 2px 6px rgba(0,0,0,0.8)' }}
            >
              <span className="text-xs text-slate-400 font-mono font-medium">Depreciation</span>
              <span className="text-sm font-mono font-bold text-rose-400 tabular-nums">
                -{prediction.depreciationPercent}% from new
              </span>
            </div>

            <div 
              className="col-span-2 sm:col-span-1 p-3.5 rounded-2xl bg-[#05080e] border border-amber-500/20 flex flex-col gap-1"
              style={{ boxShadow: 'inset 2px 2px 6px rgba(0,0,0,0.8)' }}
            >
              <span className="text-xs text-slate-400 font-mono font-medium">Vehicle Age</span>
              <span className="text-sm font-mono font-bold text-cyan-300 tabular-nums">
                {prediction.vehicleAge} Years Old
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
