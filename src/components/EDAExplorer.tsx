import React, { useState } from 'react';
import { CarRecord, DatasetMeta } from '../data/carDataset';

interface EDAExplorerProps {
  records: CarRecord[];
  datasetMeta: DatasetMeta;
}

export const EDAExplorer: React.FC<EDAExplorerProps> = ({
  records,
  datasetMeta
}) => {
  const [activeTab, setActiveTab] = useState<'distribution' | 'correlation'>('distribution');

  const prices = records.map(r => r.sellingPrice);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const avgPrice = prices.reduce((a, b) => a + b, 0) / prices.length;
  const medianPrice = [...prices].sort((a, b) => a - b)[Math.floor(prices.length / 2)];

  // Group into 6 clean buckets
  const bucketCount = 6;
  const bucketSize = (maxPrice - minPrice) / bucketCount;
  const buckets = Array.from({ length: bucketCount }, (_, i) => {
    const start = minPrice + (i * bucketSize);
    const end = start + bucketSize;
    const count = records.filter(r => r.sellingPrice >= start && (i === bucketCount - 1 ? r.sellingPrice <= end : r.sellingPrice < end)).length;
    return {
      label: `${datasetMeta.currencySymbol}${start.toFixed(1)} – ${end.toFixed(1)}`,
      count,
      pct: (count / records.length) * 100
    };
  });

  const fuelCounts: Record<string, { count: number; avgPrice: number }> = {};
  records.forEach(r => {
    if (!fuelCounts[r.fuelType]) {
      fuelCounts[r.fuelType] = { count: 0, avgPrice: 0 };
    }
    fuelCounts[r.fuelType].count += 1;
    fuelCounts[r.fuelType].avgPrice += r.sellingPrice;
  });
  Object.keys(fuelCounts).forEach(f => {
    fuelCounts[f].avgPrice /= fuelCounts[f].count;
  });

  const correlationMatrix = [
    { feature: 'Selling Price (Target)', val: '1.00', impact: 'Target' },
    { feature: 'Original Showroom Price', val: '+0.88', impact: 'Strongest Positive' },
    { feature: 'Vehicle Age', val: '-0.24', impact: 'Depreciation' },
    { feature: 'Distance Travelled', val: '-0.03', impact: 'Wear & Tear' },
    { feature: 'Previous Owners', val: '-0.09', impact: 'Owner Count' }
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* 3D KPI Metric Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="neu-convex p-5 rounded-3xl flex flex-col gap-1">
          <span className="text-xs font-mono uppercase text-slate-300 font-semibold">Total Cars</span>
          <span className="text-3xl font-mono font-extrabold text-white tabular-nums">
            {records.length}
          </span>
        </div>

        <div className="neu-convex p-5 rounded-3xl flex flex-col gap-1">
          <span className="text-xs font-mono uppercase text-slate-300 font-semibold">Average Price</span>
          <span className="text-3xl font-mono font-extrabold text-amber-400 tabular-nums">
            {datasetMeta.currencySymbol}{avgPrice.toFixed(2)}
          </span>
        </div>

        <div className="neu-convex p-5 rounded-3xl flex flex-col gap-1">
          <span className="text-xs font-mono uppercase text-slate-300 font-semibold">Median Price</span>
          <span className="text-3xl font-mono font-extrabold text-cyan-300 tabular-nums">
            {datasetMeta.currencySymbol}{medianPrice.toFixed(2)}
          </span>
        </div>

        <div className="neu-convex p-5 rounded-3xl flex flex-col gap-1">
          <span className="text-xs font-mono uppercase text-slate-300 font-semibold">Price Range</span>
          <span className="text-2xl font-mono font-extrabold text-white tabular-nums">
            {datasetMeta.currencySymbol}{minPrice.toFixed(1)} – {datasetMeta.currencySymbol}{maxPrice.toFixed(1)}
          </span>
        </div>
      </div>

      {/* 3D Segmented Control */}
      <div 
        className="p-1.5 rounded-2xl neu-sunken flex items-center gap-2 self-start"
        style={{ boxShadow: 'inset 5px 5px 12px rgba(1, 3, 7, 0.95)' }}
      >
        <button
          type="button"
          onClick={() => setActiveTab('distribution')}
          className={`px-5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
            activeTab === 'distribution'
              ? 'bg-gradient-to-b from-[#2a3c54] to-[#1a2535] text-amber-300 shadow-[2px_2px_8px_rgba(0,0,0,0.8)] border border-amber-500/40'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Price Ranges & Fuel Segments
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('correlation')}
          className={`px-5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
            activeTab === 'correlation'
              ? 'bg-gradient-to-b from-[#2a3c54] to-[#1a2535] text-amber-300 shadow-[2px_2px_8px_rgba(0,0,0,0.8)] border border-amber-500/40'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Price Drivers & Correlations
        </button>
      </div>

      {/* Tab 1: Price Distribution & Fuel */}
      {activeTab === 'distribution' && (
        <div className="flex flex-col gap-6">
          {/* Histogram Bars */}
          <div className="neu-convex p-7 rounded-3xl flex flex-col gap-5">
            <h3 className="text-lg font-bold font-display text-white">
              Price Distribution ({datasetMeta.currencyUnit})
            </h3>

            <div className="space-y-4 pt-2">
              {buckets.map((b, i) => (
                <div key={i} className="flex items-center gap-4 text-xs font-mono">
                  <span className="w-28 text-slate-300 font-semibold">{b.label}</span>
                  <div className="flex-1 h-7 rounded-xl bg-[#080d16] neu-sunken p-1 overflow-hidden flex items-center">
                    <div
                      className="h-full rounded-lg bg-gradient-to-r from-amber-500 to-amber-400 transition-all duration-300 flex items-center justify-end pr-2.5"
                      style={{ width: `${Math.max(8, b.pct)}%` }}
                    >
                      <span className="text-xs font-bold text-slate-950 tabular-nums">
                        {b.count}
                      </span>
                    </div>
                  </div>
                  <span className="w-14 text-right text-slate-300 font-semibold tabular-nums">{b.pct.toFixed(0)}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Fuel Type Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {Object.entries(fuelCounts).map(([fuel, data]) => (
              <div key={fuel} className="p-6 rounded-3xl neu-convex flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm uppercase font-bold text-white">{fuel}</span>
                  <span className="text-xs font-mono text-slate-400">{data.count} Vehicles</span>
                </div>
                <div className="text-3xl font-mono font-extrabold text-amber-400 tabular-nums mt-1">
                  {datasetMeta.currencySymbol}{data.avgPrice.toFixed(2)}
                </div>
                <span className="text-xs text-slate-400 font-mono">
                  Average Price ({datasetMeta.currencyUnit.split(' ')[0]})
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Feature Drivers & Correlation */}
      {activeTab === 'correlation' && (
        <div className="neu-convex p-7 rounded-3xl flex flex-col gap-5">
          <h3 className="text-lg font-bold font-display text-white">
            What Drives Car Resale Price?
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
            {correlationMatrix.map((item, idx) => (
              <div 
                key={idx}
                className="p-5 rounded-2xl neu-convex flex items-center justify-between"
              >
                <div>
                  <div className="text-sm font-bold text-white font-mono">{item.feature}</div>
                  <div className="text-xs text-slate-400 font-mono mt-0.5">{item.impact}</div>
                </div>
                <div className={`text-xl font-mono font-extrabold tabular-nums px-3 py-1.5 rounded-xl ${
                  item.val.startsWith('+') ? 'bg-emerald-500/20 text-emerald-400' :
                  item.val.startsWith('-') ? 'bg-rose-500/20 text-rose-400' : 'bg-slate-700 text-slate-200'
                }`}>
                  {item.val}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
