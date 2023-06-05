import { Footer, Header } from '@/components';
import { Analytics } from '@vercel/analytics/react';
import { cx } from 'cva';
import { Metadata } from 'next';
import * as React from 'react';
import { ibarraRealNova, publicSans } from './fonts';
import './index.css';

export const metadata: Metadata = {
  title: {
    template: 'Prince Muel | %s',
    default: 'Prince Muel',
  },
  // metadataBase: new URL(process.env.VERCEL_URL || ''),
  generator: 'Next.js',
  applicationName: "Princemuel's E-Portfolio",
  referrer: 'origin-when-cross-origin',
  keywords: ['Next.js', 'React', 'JavaScript', 'Portfolio', 'Blog'],
  colorScheme: 'dark light',
  creator: 'Prince Muel',
  authors: [{ name: 'Prince Muel', url: 'https://github.com/princemuel' }],
  openGraph: {
    type: 'website',
    title: `Princemuel's E-Portfolio`,
    description: '',
    url: 'https://princemuel.vercel.app',
    siteName: "Princemuel's E-Portfolio",
    // images: [
    //   {
    //     url: 'https://nextjs.org/og.png',
    //     width: 800,
    //     height: 600,
    //   },
    //   {
    //     url: 'https://nextjs.org/og-alt.png',
    //     width: 1800,
    //     height: 1600,
    //     alt: 'My custom alt',
    //   },
    // ],
    locale: 'en-US',
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'standard',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang='en'
      className={cx(
        ibarraRealNova.variable,
        publicSans.variable,
        'scrollbar-thin scrollbar-track-zinc-800 scrollbar-thumb-teal-500 scrollbar-track-rounded-md scrollbar-thumb-rounded-md'
      )}
    >
      <body className={cx('body-100 relative text-white dark:text-green-500')}>
        <React.Fragment>
          <Header />
          {children}
          <Footer />
          <Analytics />
        </React.Fragment>
      </body>
    </html>
  );
}
