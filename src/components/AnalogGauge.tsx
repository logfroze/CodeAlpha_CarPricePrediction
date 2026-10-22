import React from 'react';

interface AnalogGaugeProps {
  value: number;
  maxValue: number;
  unit: string;
  label: string;
  currencySymbol: string;
}

export const AnalogGauge: React.FC<AnalogGaugeProps> = ({
  value,
  maxValue,
  unit,
  currencySymbol
}) => {
  // Gauge sweep: -120 deg (min) to +120 deg (max)
  const clampedVal = Math.min(Math.max(0, value), maxValue);
  const ratio = clampedVal / (maxValue || 1);
  const needleAngle = -120 + (ratio * 240);

  // 6 clear interval ticks (0, 20%, 40%, 60%, 80%, 100%)
  const ticks = [0, 0.2, 0.4, 0.6, 0.8, 1.0].map((t) => {
    const angle = -120 + (t * 240);
    const val = Math.round(t * maxValue);
    return { angle, val };
  });

  return (
    <div className="relative flex flex-col items-center justify-center p-2">
      {/* Heavy 3D Metallic Bezel */}
      <div 
        className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, #44566f 0%, #202b3a 50%, #0c121a 100%)',
          boxShadow: '16px 16px 36px rgba(1, 3, 6, 0.95), -10px -10px 24px rgba(65, 90, 125, 0.45), inset 2px 2px 4px rgba(255, 255, 255, 0.35), inset -3px -3px 6px rgba(0, 0, 0, 0.9)'
        }}
      >
        {/* Deep Recessed Dial Trench */}
        <div 
          className="w-56 h-56 sm:w-64 sm:h-64 rounded-full flex items-center justify-center relative"
          style={{
            background: 'conic-gradient(from 180deg at 50% 50%, #151d28 0deg, #2b394d 90deg, #131a24 180deg, #2e3e54 270deg, #151d28 360deg)',
            boxShadow: 'inset 6px 6px 14px rgba(0, 0, 0, 0.95), inset -4px -4px 10px rgba(50, 70, 98, 0.3)'
          }}
        >
          {/* Inner Matte Dial Face */}
          <div 
            className="w-48 h-48 sm:w-56 sm:h-56 rounded-full relative flex items-center justify-center overflow-hidden"
            style={{
              background: 'radial-gradient(circle at 50% 50%, #101622 0%, #06090e 100%)',
              boxShadow: 'inset 8px 8px 18px rgba(0, 0, 0, 0.98), inset -5px -5px 12px rgba(45, 60, 85, 0.25)'
            }}
          >
            {/* Illuminated Arc */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 200 200">
              <defs>
                <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="60%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#ef4444" />
                </linearGradient>
              </defs>
              <circle
                cx="100"
                cy="100"
                r="78"
                fill="none"
                stroke="rgba(255, 255, 255, 0.08)"
                strokeWidth="5"
                strokeDasharray="327 490"
                strokeDashoffset="-82"
                strokeLinecap="round"
              />
              <circle
                cx="100"
                cy="100"
                r="78"
                fill="none"
                stroke="url(#gaugeGradient)"
                strokeWidth="6"
                strokeDasharray={`${ratio * 327} 490`}
                strokeDashoffset="-82"
                strokeLinecap="round"
                className="transition-all duration-300 ease-out"
                style={{ filter: 'drop-shadow(0 0 6px rgba(245, 158, 11, 0.7))' }}
              />
            </svg>

            {/* Clear, Minimal Tick Markers */}
            {ticks.map((t, idx) => (
              <div
                key={idx}
                className="absolute w-full h-full pointer-events-none"
                style={{ transform: `rotate(${t.angle}deg)` }}
              >
                <div 
                  className="absolute top-2.5 left-1/2 -translate-x-1/2 w-1 h-3.5 bg-amber-400 rounded-full"
                  style={{ boxShadow: '0 0 4px rgba(245, 158, 11, 0.6)' }}
                />
              </div>
            ))}

            {/* 3D Elevated Indicator Needle */}
            <div
              className="absolute w-full h-full flex items-center justify-center pointer-events-none transition-transform duration-300 ease-out"
              style={{ transform: `rotate(${needleAngle}deg)` }}
            >
              {/* Needle Body */}
              <div 
                className="absolute bottom-1/2 w-2 h-22 sm:h-26 rounded-t-full origin-bottom"
                style={{
                  background: 'linear-gradient(to top, #ea580c 0%, #f97316 70%, #ffedd5 100%)',
                  boxShadow: '0 0 10px rgba(249, 115, 22, 0.9), 4px 4px 8px rgba(0, 0, 0, 0.8)'
                }}
              />
            </div>

            {/* Milled Center Hub */}
            <div 
              className="absolute w-12 h-12 rounded-full z-10 flex items-center justify-center"
              style={{
                background: 'radial-gradient(circle at 35% 35%, #5a6e87 0%, #202b3a 70%, #0b0f16 100%)',
                boxShadow: '0 6px 14px rgba(0, 0, 0, 0.95), inset 2px 2px 3px rgba(255, 255, 255, 0.5)'
              }}
            >
              <div className="w-5 h-5 rounded-full bg-amber-500 shadow-[0_0_8px_#f59e0b]" />
            </div>

            {/* Big Inset Digital Readout */}
            <div 
              className="absolute bottom-7 px-4 py-1.5 rounded-xl bg-[#05080e] border border-amber-500/30 flex items-center gap-1.5"
              style={{ boxShadow: 'inset 3px 3px 6px rgba(0,0,0,0.9), 0 2px 6px rgba(0,0,0,0.4)' }}
            >
              <span className="text-sm text-amber-500 font-mono font-bold">{currencySymbol}</span>
              <span className="text-xl font-mono font-bold text-amber-400 tabular-nums">
                {value.toFixed(2)}
              </span>
              <span className="text-xs text-amber-500/80 font-mono ml-0.5">{unit.split(' ')[0]}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
