export function todayUTC() {
  return new Date().toISOString().slice(0, 10);
}
export function dateValue(s: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return NaN;
  const n = Date.parse(s + "T00:00:00Z");
  return Number.isFinite(n) && new Date(n).toISOString().slice(0, 10) === s
    ? n
    : NaN;
}
export function rentalError(
  quantity: number,
  start: string,
  end: string,
  stock: number,
  today = todayUTC(),
) {
  if (
    !Number.isInteger(quantity) ||
    quantity < 1 ||
    quantity > Math.min(3, stock)
  )
    return `Choose a whole number from 1 to ${Math.min(3, stock)}. Available quantity: ${stock}.`;
  const a = dateValue(start),
    b = dateValue(end);
  if (!Number.isFinite(a) || !Number.isFinite(b))
    return "Choose valid start and return dates.";
  if (start < today) return `Choose a start date of ${today} or later (UTC).`;
  if (b < a) return "Return date must be on or after start date.";
  if ((b - a) / 86400000 > 7)
    return "Choose a return date within 7 days of the start date.";
  return "";
}
export function safeReturn(value: string | null) {
  return value &&
    value.startsWith("/") &&
    !value.startsWith("//") &&
    !value.includes("\\") &&
    !/[\r\n]/.test(value) &&
    !value.startsWith("/login") &&
    !value.startsWith("/register") &&
    !value.startsWith("/api/")
    ? value
    : "/equipment";
}
export function estimate(q: number, a: string, b: string, rate: number) {
  return q * Math.max(1, (dateValue(b) - dateValue(a)) / 86400000) * rate;
}
export const money = (n: number) =>
  new Intl.NumberFormat("en-TH", {
    style: "currency",
    currency: "THB",
    maximumFractionDigits: 2,
  }).format(n);
