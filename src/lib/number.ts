export function clamp(value: number, min: number, max: number): number {
  if (Number.isNaN(value)) return min;
  if (value < min) return min;
  if (value > max) return max;
  return value;
}

export function formatPercent(value: number, fractionDigits = 0): string {
  const safe = Number.isFinite(value) && !Number.isNaN(value) ? value : 0;
  return `${(safe * 100).toFixed(fractionDigits)}%`;
}
