import { Decimal } from 'decimal.js';
import { twMerge } from 'tailwind-merge';

import { type ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const toFixedSeparated = (num: number | string, decimalPlaces?: number) => {
  const parts = num?.toString().split('.');
  const integerPart = (+parts[0])?.toLocaleString() ?? 0;
  const decimalPart = new Decimal(+`0.${parts[1] ?? 0}`)?.toFixed(decimalPlaces);
  const finalNum = decimalPart === '0' ? integerPart : [integerPart, decimalPart.split('.')[1]].join('.');

  return finalNum;
};
