"use client";

type CircularScoreProps = {
  score: number;
  label: string;
};

export function CircularScore({ score, label }: CircularScoreProps) {
  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative h-32 w-32">
        <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
          <circle cx="60" cy="60" r={radius} stroke="rgba(17,17,17,0.08)" strokeWidth="10" fill="none" />
          <circle
            cx="60"
            cy="60"
            r={radius}
            stroke="#B5651D"
            strokeWidth="10"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <div className="text-4xl font-semibold tracking-tight text-ink">{score}</div>
          <div className="text-xs uppercase tracking-[0.26em] text-black/45">/100</div>
        </div>
      </div>
      <p className="text-center text-sm font-medium text-black/60">{label}</p>
    </div>
  );
}
