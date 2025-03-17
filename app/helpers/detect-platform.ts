export const isBrowser = (() =>
  "undefined" !== typeof window &&
  "undefined" !== typeof HTMLElement &&
  Boolean(globalThis.document) &&
  String(HTMLElement).includes("[native code]"))();
export const isServer = !isBrowser;
