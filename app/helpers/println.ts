export const println$ = (message?: unknown, ...optionalParams: unknown[]) => {
  if (!import.meta.env.DEV) return;
  console.info(message, ...optionalParams);
};
