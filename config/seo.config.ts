import type { Metadata } from 'next';

type MetaFunction = (data: Metadata) => Metadata;

const SITE_URL = process.env.SITE_URL || '';
const baseUrl = new URL('/', SITE_URL);
const defineMeta: MetaFunction = (metadata) => metadata;

const title: Metadata['title'] =
  'Prince Muel - Innovative Researcher and Skilled Mentor';
const description: Metadata['description'] =
  "Prince Muel is a recent college graduate with a solid foundation in computer science as well as competence in exploratory data analysis, machine learning, computer vision, and statistics. He is currently working as a Research Assistant at the Independent University, Bangladesh's Center for Computational and Data Sciences.";

export const seo = defineMeta({
  title: {
    default: title,
    template: '%s - Prince Muel',
  },
  description,

  metadataBase: baseUrl,
  alternates: {
    canonical: baseUrl,
    types: {
      'application/rss+xml': `/feed.xml`,
    },
  },

  generator: 'Next.js',
  applicationName: 'Prince Muel - Personal Website',
  referrer: 'origin-when-cross-origin',
  manifest: '/site.webmanifest',
  keywords: [
    'Blog',
    'Portfolio',
    'Blog Website',
    'Personal Website',
    'Portfolio Website',

    'Prince Muel',
    'pHoeniX-svg',
    'Chukwuzube',
    'Samuel Chukwuzube',
    'Chukwuzube Samuel',

    'Prince Muel - Innovative Researcher and Skilled Mentor',
    'Prince Muel - Personal Website',
  ],

  creator: 'Prince Muel',
  publisher: 'Prince Muel',
  authors: [{ name: 'Prince Muel', url: 'https://github.com/princemuel' }],
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },

  // come back to this
  icons: [
    { rel: 'icon', url: '/favicon.ico' },
    {
      rel: 'icon',
      url: '/favicon-16x16.png',
      sizes: '16x16',
      type: 'image/png',
    },
    {
      rel: 'icon',
      url: '/favicon-32x32.png',
      sizes: '32x32',
      type: 'image/png',
    },
    {
      rel: 'apple-touch-icon',
      url: '/apple-touch-icon.png',
    },
    { rel: 'mask-icon', url: '/favicon-ico' },
    { rel: 'image/x-icon', url: '/favicon.ico' },
    {
      rel: 'android-chrome-192x192',
      url: '/android-chrome-192x192.png',
    },
    {
      rel: 'android-chrome-512x512',
      url: '/android-chrome-512x512.png',
    },
  ],
  openGraph: {
    type: 'website',
    url: baseUrl,
    locale: 'en_US',
    siteName: title,
    title,
    description,
    images: [
      {
        url: `/og-image.png`,
        width: 800,
        height: 450,
        alt: title,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@iamprincemuel',
    creator: '@iamprincemuel',
    title,
    description,
    images: [
      {
        url: `/og-image.png`,
        width: 800,
        height: 450,
        alt: title,
      },
    ],
  },

  colorScheme: 'dark light',
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0B1120' },
    { media: '(prefers-color-scheme: light)', color: '#fafafa' },
  ],

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification=0',
    yandex: 'yandex-verification=0',
    other: {
      bing: 'msvalidate.01=0',
    },
  },
});
