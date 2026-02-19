export function formatCurrency(value: number): string {
  const safeRaw = Number.isFinite(value) && !Number.isNaN(value) ? value : 0;
  const safe = safeRaw < 0 ? 0 : safeRaw;
  const formatted = safe.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `$${formatted}`;
}
