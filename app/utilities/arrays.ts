/*---------------------------------*
            ARRAY UTILS            *
  ---------------------------------*
 */

export function hasValues<T>(value: T[] | null | undefined): value is NonNullable<T[]> {
  return Array.isArray(value) && value.length > 0;
}

export function range(start: number, stop: number, step: number) {
  return Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);
}

export const unique = <T>(array: T[]) => [...new Set(array)];

// Difference: Elements in `a` but not in `b`
export const difference = <T>(a: T[], b: T[]) => {
  if (!Reflect.has(Set.prototype, "difference")) {
    return a.filter((item) => !b.includes(item));
  }
  return [...new Set(a).difference(new Set(b))];
};

// Intersection: Elements common to all arrays
export const intersection = <T>(arr: T[], ...args: T[][]) => {
  if (!Reflect.has(Set.prototype, "intersection")) {
    return arr.filter((item) => args.every((value) => value.includes(item)));
  }
  return [...new Set(arr).intersection(new Set(...args))];
};
