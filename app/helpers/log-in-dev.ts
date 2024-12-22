export const log_in_dev = (message?: unknown, ...optionalParams: unknown[]) => {
  if (!import.meta.env.DEV) return;
  // eslint-disable-next-line no-console
  console.info(message, ...optionalParams);
};
