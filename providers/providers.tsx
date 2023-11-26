'use client';

import { ThemeProvider } from 'next-themes';

export function GlobalProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      storageKey='page-theme'
      defaultTheme='system'
      enableSystem={true}
      attribute='data-theme'
    >
      {children}
    </ThemeProvider>
  );
}