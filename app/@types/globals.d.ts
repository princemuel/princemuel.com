declare namespace globalThis {
  interface ObjectConstructor {
    entries<T extends NonNullable<unknown>>(object: T): readonly Entry<T>[];
  }
  // biome-ignore lint/style/noVar: <explanation>
  var __singletons__: Map<string, unknown> | undefined;
  // biome-ignore lint/style/noVar: <explanation>
  var themeManager: { updatePicker(theme?: string): void };
}
