import { restaurant } from "./menu.ts";

const priceFormatter = new Intl.NumberFormat(restaurant.locale, {
  style: "currency",
  currency: restaurant.currency,
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

export function formatPrice(price: number): string {
  return priceFormatter.format(price);
}

export function parseTable(search: string): number | null {
  const values = new URLSearchParams(search).getAll("table");
  if (values.length !== 1 || !/^[1-9]\d*$/.test(values[0])) return null;

  const table = Number(values[0]);
  return Number.isSafeInteger(table) && table <= restaurant.tableCount
    ? table
    : null;
}
