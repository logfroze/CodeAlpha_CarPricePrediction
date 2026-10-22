import React from 'react';

interface TopBarProps {
  activeTab: 'console' | 'eda' | 'arena' | 'code';
  onSelectTab: (tab: 'console' | 'eda' | 'arena' | 'code') => void;
  datasetMode: 'inr' | 'usd';
  onToggleDataset: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  activeTab,
  onSelectTab,
  datasetMode,
  onToggleDataset
}) => {
  return (
    <header className="flex items-center justify-between gap-8 px-6 py-4 border-b border-white/10 bg-[#121927]/90 backdrop-blur-md sticky top-0 z-40">
      {/* Zone 1: Wordmark */}
      <a 
        href="#"
        onClick={(e) => { e.preventDefault(); onSelectTab('console'); }}
        className="text-lg font-bold font-display text-white whitespace-nowrap shrink-0 hover:text-amber-400 transition-colors"
      >
        Car Price Predictor
      </a>

      {/* Zone 2: 3D Raised Navigation Tabs */}
      <nav className="hidden md:flex items-center gap-2">
        {[
          { id: 'console', label: 'Valuation' },
          { id: 'eda', label: 'Data Analysis' },
          { id: 'arena', label: 'Model Arena' },
          { id: 'code', label: 'Export Code' }
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onSelectTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-gradient-to-b from-[#25364c] to-[#151f2d] text-amber-300 shadow-[3px_3px_8px_rgba(0,0,0,0.8),-2px_-2px_6px_rgba(60,85,120,0.35)] border border-amber-400/50'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </nav>

      {/* Zone 3: 3D Currency Switch Action */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          type="button"
          onClick={onToggleDataset}
          className="px-4 py-2.5 text-xs font-mono font-bold text-amber-300 neu-button rounded-xl hover:text-white shadow-md transition-all whitespace-nowrap shrink-0 cursor-pointer border border-amber-400/30"
        >
          Currency: {datasetMode === 'inr' ? '₹ INR Lakhs' : '$ USD'}
        </button>
      </div>
    </header>
  );
};
