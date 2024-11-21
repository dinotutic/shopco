export const CURRENCY_FORMATTER = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 0,
});

export function formatCurrency(amount: number) {
  return CURRENCY_FORMATTER.format(amount / 100);
}

const NUMBER_FORMATTER = new Intl.NumberFormat("de-DE");

export function formatNumber(number: number) {
  return NUMBER_FORMATTER.format(number);
}
