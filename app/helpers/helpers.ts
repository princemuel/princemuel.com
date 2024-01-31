import type { ClassValue } from "tailwind-variants";
import { cn } from "tailwind-variants";

export const tw = (...args: ClassValue[]) =>
  cn(...args)({ twMerge: true });
