export function money(value: unknown, currency = "INR") {
  const amount = Number(value);
  return new Intl.NumberFormat("en-IN", { style: "currency", currency, maximumFractionDigits: 2 }).format(Number.isFinite(amount) ? amount : 0);
}
export function numberValue(value: unknown, fallback = 0) { const n = Number(value); return Number.isFinite(n) ? n : fallback; }
