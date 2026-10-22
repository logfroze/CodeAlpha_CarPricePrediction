import React from 'react';

interface TactileRockerOption<T extends string> {
  value: T;
  label: string;
}

interface TactileRockerProps<T extends string> {
  label: string;
  options: TactileRockerOption<T>[];
  value: T;
  onChange: (val: T) => void;
  accentColor?: 'amber' | 'cyan' | 'emerald';
}

export function TactileRocker<T extends string>({
  label,
  options,
  value,
  onChange,
  accentColor = 'amber'
}: TactileRockerProps<T>) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">
        {label}
      </span>
      {/* 3D Recessed Switch Cavity */}
      <div 
        className="p-1.5 rounded-2xl flex items-center gap-2 neu-sunken"
        style={{
          boxShadow: 'inset 5px 5px 12px rgba(1, 3, 7, 0.95), inset -3px -3px 8px rgba(50, 72, 102, 0.25)'
        }}
      >
        {options.map((opt) => {
          const isActive = opt.value === value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              className={`flex-1 py-3 px-3 rounded-xl text-xs font-mono font-bold transition-all duration-150 flex items-center justify-center cursor-pointer select-none ${
                isActive
                  ? accentColor === 'cyan'
                    ? 'bg-gradient-to-b from-cyan-600 to-cyan-800 text-white shadow-[inset_2px_2px_6px_rgba(0,0,0,0.6),0_0_12px_rgba(6,182,212,0.4)] border border-cyan-400/50'
                    : accentColor === 'emerald'
                    ? 'bg-gradient-to-b from-emerald-600 to-emerald-800 text-white shadow-[inset_2px_2px_6px_rgba(0,0,0,0.6),0_0_12px_rgba(16,185,129,0.4)] border border-emerald-400/50'
                    : 'bg-gradient-to-b from-amber-500 to-amber-700 text-slate-950 shadow-[inset_2px_2px_6px_rgba(0,0,0,0.6),0_0_14px_rgba(245,158,11,0.5)] border border-amber-300/60'
                  : 'bg-gradient-to-b from-[#223145] to-[#141d2a] text-slate-300 hover:text-white shadow-[4px_4px_10px_rgba(2,4,8,0.8),-3px_-3px_8px_rgba(55,80,115,0.35)] border-t border-l border-white/10'
              }`}
            >
              <span>{opt.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
