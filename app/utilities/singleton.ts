/**
 * Remembers and retrieves a value by a given name, or the value generated by `getValue` if the name doesn't exist.
 * The return type is inferred from the return type of `getValue`.
 *
 * @template Value
 * @param {string} name - The name under which to remember the value.
 * @param {() => Value} getValue - The function that generates the value to remember.
 * @returns {NonNullable<Value>} - The remembered value.
 */
export function remember<Value>(
  name: string,
  getValue: () => Value,
): NonNullable<Value> {
  const g = globalThis as unknown as globalThis;
  g.__singletons ??= new Map();
  if (!g.__singletons.has(name)) g.__singletons.set(name, getValue());
  return g.__singletons.get(name) as NonNullable<Value>;
}

/**
 * Forgets a remembered value by a given name. Does not throw if the name doesn't exist.
 *
 * @param {string} name - The name under which the value was remembered.
 * @return {boolean} - A remembered value existed and has been forgotten.
 */
export function forget(name: string): boolean {
  const g = globalThis as unknown as globalThis;
  g.__singletons ??= new Map();
  return g.__singletons.delete(name);
}
