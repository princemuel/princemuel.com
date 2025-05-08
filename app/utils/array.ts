export const hasValues = <T>(value: T[] | undefined | null): value is NonNullable<T[]> => {
  return Array.isArray(value) && 0 < value.length;
};

export const range = function* range(start: number, end?: number, step = 1) {
  if (0 === step) throw new Error("Step cannot be zero.");
  if (!end) [start, end] = [1, start];
  if ((0 < step && start > end) || (0 > step && start < end)) {
    return;
  }

  for (let idx = start; 0 < step ? idx <= end : idx >= end; idx += step) {
    yield idx;
  }
};

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
