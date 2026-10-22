import React, { useState, useMemo } from 'react';
import { TopBar } from './components/TopBar';
import { ValuationConsole } from './components/ValuationConsole';
import { EDAExplorer } from './components/EDAExplorer';
import { ModelArena } from './components/ModelArena';
import { CodeExporter } from './components/CodeExporter';
import { DATASET_CONFIGS, INR_CARS, USD_CARS } from './data/carDataset';
import { CarPriceModelEngine } from './ml/regressionEngine';

export default function App() {
  const [activeTab, setActiveTab] = useState<'console' | 'eda' | 'arena' | 'code'>('console');
  const [datasetMode, setDatasetMode] = useState<'inr' | 'usd'>('inr');

  const datasetMeta = DATASET_CONFIGS[datasetMode];
  const activeRecords = datasetMode === 'inr' ? INR_CARS : USD_CARS;

  const engine = useMemo(() => {
    return new CarPriceModelEngine(activeRecords);
  }, [activeRecords]);

  const handleToggleDataset = () => {
    setDatasetMode(prev => (prev === 'inr' ? 'usd' : 'inr'));
  };

  return (
    <div className="min-h-screen bg-[#0f1522] text-slate-100 flex flex-col antialiased">
      {/* 3-Zone Top Navigation */}
      <TopBar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        datasetMode={datasetMode}
        onToggleDataset={handleToggleDataset}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
        {/* Clean, Impactful Header Strip */}
        <section className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
          <div className="space-y-2 max-w-2xl">
            <h1 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-white">
              Car Price Prediction
            </h1>
            <p className="text-sm sm:text-base text-slate-300">
              Interactive Machine Learning valuation cockpit with real regression modeling, data inspection, and physical tactile controls.
            </p>
          </div>

          {/* 3D Key Metric Highlights */}
          <div className="flex items-center gap-4 self-start md:self-auto">
            <div className="px-5 py-3 rounded-2xl neu-convex text-center">
              <span className="text-xs text-slate-400 font-mono block">Best Model</span>
              <span className="text-sm font-mono font-bold text-amber-400">Gradient Boosting</span>
            </div>
            <div className="px-5 py-3 rounded-2xl neu-convex text-center">
              <span className="text-xs text-slate-400 font-mono block">Accuracy</span>
              <span className="text-base font-mono font-extrabold text-emerald-400">
                {((engine.metrics['gradient_boosting']?.r2Score ?? 0.96) * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        </section>

        {/* Active Tab View */}
        {activeTab === 'console' && (
          <ValuationConsole
            engine={engine}
            datasetMeta={datasetMeta}
          />
        )}

        {activeTab === 'eda' && (
          <EDAExplorer
            records={activeRecords}
            datasetMeta={datasetMeta}
          />
        )}

        {activeTab === 'arena' && (
          <ModelArena
            engine={engine}
            datasetMeta={datasetMeta}
          />
        )}

        {activeTab === 'code' && (
          <CodeExporter />
        )}
      </main>

      {/* Clean Minimalist Footer */}
      <footer className="border-t border-white/10 py-6 mt-12 bg-[#0a0e17] text-xs font-mono text-slate-400 text-center">
        CodeAlpha Data Science Internship Project · Car Price Prediction
      </footer>
    </div>
  );
}
