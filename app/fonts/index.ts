import { cn } from '@/helpers';
import { Montserrat } from 'next/font/google';
import localFont from 'next/font/local';

const FontSans = Montserrat({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const FontAccent = localFont({
  src: './clash-display.ttf',
  variable: '--font-accent',
  display: 'swap',
});

export const fonts = cn(FontAccent.variable, FontSans.variable);
