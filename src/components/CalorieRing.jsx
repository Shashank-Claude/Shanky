export default function CalorieRing({ consumed, goal, size = 180 }) {
  const radius = (size - 20) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(consumed / goal, 1);
  const strokeDashoffset = circumference - progress * circumference;
  const remaining = goal - consumed;
  const isOver = consumed > goal;
  const center = size / 2;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        {/* Background track */}
        <circle
          cx={center} cy={center} r={radius}
          fill="none" stroke="#1e2035" strokeWidth={14}
        />
        {/* Progress arc */}
        <circle
          cx={center} cy={center} r={radius}
          fill="none"
          stroke={isOver ? '#ef4444' : '#6366f1'}
          strokeWidth={14}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.6s ease' }}
        />
        {/* Glow effect */}
        <circle
          cx={center} cy={center} r={radius}
          fill="none"
          stroke={isOver ? '#ef444433' : '#6366f133'}
          strokeWidth={22}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-3xl font-bold text-white leading-none">{consumed.toLocaleString()}</span>
        <span className="text-xs text-slate-400 mt-1">kcal eaten</span>
        <div className="mt-2 h-px w-10 bg-slate-700" />
        <span className={`text-sm font-semibold mt-2 ${isOver ? 'text-red-400' : 'text-emerald-400'}`}>
          {isOver ? `+${Math.abs(remaining)}` : remaining} {isOver ? 'over' : 'left'}
        </span>
      </div>
    </div>
  );
}
