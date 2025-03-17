export const serialize = <T>(data: T) => structuredClone(data);

export const remember = <T>(name: string, getValue: () => T) => {
  const g = globalThis;
  g.__singletons__ ??= new Map();
  if (!g.__singletons__.has(name)) {
    g.__singletons__.set(name, getValue());
  }
  return g.__singletons__.get(name) as NonNullable<T>;
};

export const forget = (name: string) => {
  const g = globalThis;
  g.__singletons__ ??= new Map();
  return g.__singletons__.delete(name);
};

export const isObject = (value: unknown): value is NonNullable<unknown> => {
  return "[object Object]" === Object.prototype.toString.call(value);
};

export const isEmptyObject = (value: { [key: string]: unknown } = {}) => {
  return isObject(value) && !Object.entries(value).length;
};

export const remove_key = <T>(k: string, data: T): T => {
  if (Array.isArray(data)) {
    return data.map((item) => remove_key(k, item)) as unknown as T;
  }
  if (isObject(data)) {
    const entries = Object.entries(data)
      .filter(([key]) => key !== k)
      .map(([key, value]) => [key, remove_key(k, value)]);
    return Object.fromEntries(entries) as T;
  }
  return data;
};

export const omitFields = <T extends { [key: string]: unknown }, K extends keyof T>(
  source: T,
  fieldsToOmit: K[],
): Omit<T, K> => {
  if (!isObject(source)) throw new Error("Source must be an object.");

  return Object.fromEntries(
    Object.entries(source).filter(([key]) => !fieldsToOmit.includes(key as K)),
  ) as Omit<T, K>;
};
