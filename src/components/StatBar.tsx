type StatBarProps = {
  label: string;
  value: number;
};

export function StatBar({ label, value }: StatBarProps) {
  const normalizedValue = Math.max(0, Math.min(10, value));

  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="font-bold text-zinc-300">{label}</span>
        <span className="text-zinc-500">{normalizedValue}/10</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-zinc-900 ring-1 ring-zinc-800">
        <div
          className="h-full rounded-full bg-red-600 shadow-[0_0_18px_rgba(220,38,38,0.45)]"
          style={{ width: `${normalizedValue * 10}%` }}
        />
      </div>
    </div>
  );
}
