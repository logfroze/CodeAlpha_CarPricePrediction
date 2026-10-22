import React from 'react';

interface KnobDialProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (val: number) => void;
}

export const KnobDial: React.FC<KnobDialProps> = ({
  label,
  value,
  min,
  max,
  step = 1,
  unit = '',
  onChange
}) => {
  const ratio = (value - min) / ((max - min) || 1);
  const rotation = -135 + (ratio * 270);

  const handleDecrement = () => {
    onChange(Math.max(min, Number((value - step).toFixed(2))));
  };

  const handleIncrement = () => {
    onChange(Math.min(max, Number((value + step).toFixed(2))));
  };

  return (
    <div className="flex flex-col items-center justify-between gap-3 p-4 rounded-3xl neu-convex">
      <span className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">
        {label}
      </span>

      <div className="flex items-center gap-4">
        {/* 3D Minus Stepper Button */}
        <button
          type="button"
          onClick={handleDecrement}
          disabled={value <= min}
          className="w-10 h-10 rounded-xl neu-button flex items-center justify-center text-slate-200 hover:text-white disabled:opacity-30 disabled:pointer-events-none text-xl font-bold font-mono cursor-pointer"
        >
          −
        </button>

        {/* Big 3D Rotary Knob */}
        <div 
          className="relative w-20 h-20 rounded-full neu-knob flex items-center justify-center cursor-pointer select-none"
          style={{
            boxShadow: '10px 10px 22px rgba(1, 3, 7, 0.95), -7px -7px 18px rgba(65, 90, 125, 0.4), inset 2px 2px 3px rgba(255, 255, 255, 0.3)'
          }}
        >
          {/* Position Indicator Needle/Notch */}
          <div 
            className="w-full h-full absolute flex items-start justify-center transition-transform duration-150 ease-out pointer-events-none"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            <div className="w-2 h-5 bg-amber-400 rounded-full shadow-[0_0_8px_#f59e0b] mt-1.5" />
          </div>

          {/* Center metallic hub */}
          <div className="w-9 h-9 rounded-full bg-[#151f2d] shadow-inner border border-slate-600/50 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-slate-400 shadow-sm" />
          </div>
        </div>

        {/* 3D Plus Stepper Button */}
        <button
          type="button"
          onClick={handleIncrement}
          disabled={value >= max}
          className="w-10 h-10 rounded-xl neu-button flex items-center justify-center text-slate-200 hover:text-white disabled:opacity-30 disabled:pointer-events-none text-xl font-bold font-mono cursor-pointer"
        >
          +
        </button>
      </div>

      {/* Recessed Value Display */}
      <div 
        className="px-5 py-1.5 rounded-xl bg-[#070b12] border border-amber-500/30 text-base font-mono font-bold text-amber-400 tabular-nums"
        style={{ boxShadow: 'inset 2px 2px 5px rgba(0,0,0,0.8)' }}
      >
        {value} {unit}
      </div>
    </div>
  );
};
