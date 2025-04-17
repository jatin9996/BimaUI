import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toDollar(value: number) {
  let fvalue = value || 0;
  let postFix = "";
  if (fvalue > 1000000000) {
    fvalue = fvalue / 1000000000;
    postFix = "B";
  } else if (fvalue > 1000000) {
    fvalue = fvalue / 1000000;
    postFix = "M";
  } else if (fvalue > 1000) {
    fvalue = fvalue / 1000;
    postFix = "K";
  }

  return `$${fvalue.toFixed(2)}${postFix}`;
}

// app/lending/utils.ts
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value)
}

export const formatPercentage = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value / 100)
}

export const abbreviateNumber = (value: number): string => {
  const suffixes = ['', 'K', 'M', 'B', 'T']
  const suffixNum = Math.floor((''+value).length/3)
  let shortValue = parseFloat((suffixNum !== 0 ? (value / Math.pow(1000,suffixNum)) : value).toPrecision(3))
  if (shortValue % 1 !== 0) {
    shortValue = Number(shortValue.toFixed(1))
  }
  return shortValue + suffixes[suffixNum]
}
