import { type CnOptions, cn } from "tailwind-variants";

export const tw = (...args: CnOptions) => cn(...args)({ twMerge: true });
