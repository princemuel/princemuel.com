export const println$ = (message?: unknown, ...args: unknown[]) => {
  if (!import.meta.env.DEV) return;
  console.info(message, ...args);
};
