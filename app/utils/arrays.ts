/*---------------------------------*
            ARRAY UTILS            *
  ---------------------------------*
 */

export function hasValues<T>(value: T[] | undefined): value is NonNullable<T[]> {
  // eslint-disable-next-line yoda
  return Array.isArray(value) && value.length > 0;
}

export function* range(start: number, end?: number, step = 1) {
  // Early return for invalid step
  if (0 === step) throw new Error("Step cannot be zero.");

  // Handle cases where end is not provided (use start as end and set start to 1)
  if (!end) [start, end] = [1, start];

  // Early exit for invalid ranges
  if (
    (0 < step && start > end) || // If step is positive and start > end
    (0 > step && start < end) // If step is negative and start < end
  ) {
    return;
  }

  // eslint-disable-next-line no-ternary
  for (let idx = start; 0 < step ? idx <= end : idx >= end; idx += step) {
    yield idx;
  }
}

export const unique = <T>(array: T[]) => [...new Set(array)];

// Difference: Elements in `a` but not in `b`
export const difference = <T>(a: T[], b: T[]) => {
  const setB = new Set(b);
  if (!Reflect.has(Set.prototype, "difference")) {
    return a.filter((item) => !setB.has(item));
  }
  return [...new Set(a).difference(setB)];
};

// Intersection: Elements common to all arrays
export const intersection = <T>(arr: T[], ...args: T[][]) => {
  const sets = args.map((arg) => new Set(arg));
  if (!Reflect.has(Set.prototype, "intersection")) {
    return arr.filter((item) => sets.every((set) => set.has(item)));
  }
  return [...new Set(arr).intersection(new Set(sets))];
};
