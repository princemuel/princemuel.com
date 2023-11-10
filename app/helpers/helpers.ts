import { cx, type CxOptions } from 'cva';
import { extendTailwindMerge } from 'tailwind-merge';

const customTwMerge = extendTailwindMerge({});

export function cn(...args: CxOptions) {
  return customTwMerge(cx(args));
}
