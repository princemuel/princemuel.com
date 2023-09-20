import { BaseLayout } from '@/components';
import { cn } from '@/helpers';
import { fonts } from './fonts';
import './globals.css';

export const metadata = {
  title: 'Home',
  description: 'Home page',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={cn(fonts, '')}>
        <BaseLayout>{children}</BaseLayout>
      </body>
    </html>
  );
}
