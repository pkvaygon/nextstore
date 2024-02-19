import type {ClassValue} from "clsx";
import products from '@/nextstore.shoes.json';

import clsx from "clsx";
import {twMerge} from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const allSizes: string[] = Array.from(
  new Set(products.flatMap((product) => product.sizes))
);

interface Color {
  color: string;
  hex: string;
  color2: string;
  hex2: string;
}
export const allColors: Color[] = Array.from(
  new Set(
    products.flatMap((product) =>
      product.colors.map((color) => ({
        color: color.color,
        hex: color.hex,
        color2: color.color2,
        hex2: color.hex2,
      }))
    )
  )
);
export const allCategories: string[] = Array.from(
new Set(products.flatMap((product)=> product.category))
)
export const allGenders: string[] = Array.from(
  new Set(products.flatMap((product)=> product.gender))
)
export const allBrands: string[] = Array.from(
  new Set(products.flatMap((product)=> product.brand))
)


