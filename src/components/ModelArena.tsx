import React, { useState } from 'react';
import { CarPriceModelEngine, ModelMetrics } from '../ml/regressionEngine';
import { DatasetMeta } from '../data/carDataset';

interface ModelArenaProps {
  engine: CarPriceModelEngine;
  datasetMeta: DatasetMeta;
}

export const ModelArena: React.FC<ModelArenaProps> = ({
  engine,
  datasetMeta
}) => {
  const [selectedModelId, setSelectedModelId] = useState<string>('gradient_boosting');

  const modelsList: ModelMetrics[] = Object.values(engine.metrics).filter(m => m.id !== 'baseline');
  const activeModel = engine.metrics[selectedModelId] || engine.metrics['gradient_boosting'];

  const predictions = activeModel?.testPredictions || [];
  const maxActual = Math.max(...predictions.map(p => p.actual), 10);
  const maxPred = Math.max(...predictions.map(p => p.predicted), 10);
  const plotMax = Math.max(maxActual, maxPred) * 1.05;

  return (
    <div className="flex flex-col gap-6">
      {/* 3D Model Benchmark Cards */}
      <div>
        <h3 className="text-lg font-bold font-display text-white mb-4">
          Model Accuracy Comparison (Test Dataset)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {modelsList.map((m) => {
            const isSelected = m.id === selectedModelId;
            const isBest = m.id === 'gradient_boosting';
            return (
              <div
                key={m.id}
                onClick={() => setSelectedModelId(m.id)}
                className={`p-6 rounded-3xl cursor-pointer transition-all ${
                  isSelected
                    ? 'neu-convex border-2 border-amber-400 shadow-[0_0_24px_rgba(245,158,11,0.25)] ring-2 ring-amber-400/40'
                    : 'neu-convex hover:border-slate-500/50'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono uppercase text-slate-300 font-bold">
                    {m.name.split('(')[0]}
                  </span>
                  {isBest && (
                    <span className="text-xs font-mono px-2 py-0.5 rounded-lg bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40">
                      Best
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-1 my-3">
                  <span className="text-xs font-mono text-slate-400">R² Accuracy Score</span>
                  <span className="text-3xl font-mono font-extrabold text-amber-400 tabular-nums">
                    {(m.r2Score * 100).toFixed(1)}%
                  </span>
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-white/10 text-xs font-mono">
                  <span className="text-slate-400">Average Error:</span>
                  <span className="text-white font-bold tabular-nums">
                    ±{datasetMeta.currencySymbol}{m.mae.toFixed(2)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Actual vs Predicted Visual Scatter Plot */}
      <div className="neu-convex p-7 rounded-3xl flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
          <div>
            <h4 className="text-base font-bold font-display text-white">
              {activeModel.name}: Predicted vs. Actual
            </h4>
            <p className="text-xs text-slate-300">
              Points close to the red diagonal indicate high prediction accuracy.
            </p>
          </div>
          <div className="px-4 py-1.5 rounded-xl bg-[#060a10] border border-amber-500/30 text-sm font-mono font-bold text-amber-400">
            R² Score: {activeModel.r2Score.toFixed(4)}
          </div>
        </div>

        {/* 3D Sunken Graph Well */}
        <div 
          className="relative w-full h-72 bg-[#05080e] rounded-2xl neu-sunken p-4 overflow-hidden"
          style={{ boxShadow: 'inset 6px 6px 16px rgba(0,0,0,0.95)' }}
        >
          <svg className="w-full h-full" viewBox="0 0 300 200">
            <line x1="30" y1="20" x2="30" y2="170" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
            <line x1="30" y1="170" x2="280" y2="170" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />

            {/* Red Reference 45-degree Line */}
            <line 
              x1="30" 
              y1="170" 
              x2="280" 
              y2="20" 
              stroke="#ef4444" 
              strokeWidth="2" 
              strokeDasharray="5 5" 
            />

            {/* Scatter points */}
            {predictions.map((p, idx) => {
              const cx = 30 + ((p.actual / (plotMax || 1)) * 250);
              const cy = 170 - ((p.predicted / (plotMax || 1)) * 150);
              return (
                <circle
                  key={idx}
                  cx={cx}
                  cy={cy}
                  r="4"
                  fill="#38bdf8"
                  opacity="0.9"
                  className="hover:r-6 transition-all"
                >
                  <title>Actual: {p.actual} | Predicted: {p.predicted}</title>
                </circle>
              );
            })}
          </svg>
          <div className="absolute bottom-2 right-4 text-xs font-mono font-semibold text-slate-300">
            Actual Price →
          </div>
          <div className="absolute top-4 left-3 text-xs font-mono font-semibold text-slate-300">
            Predicted Price
          </div>
        </div>
      </div>
    </div>
  );
};
