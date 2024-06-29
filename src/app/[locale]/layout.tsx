import Footer from '@/components/footer.component';
import Navbar from '@/components/navbar.component';
import { ThemeProvider } from '@/components/theme-provider';
import { InformationSchema } from '@/types/information-schema';
import { getInformation } from '@/utils/server-utils';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata, ResolvingMetadata, Viewport } from 'next';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { Inter } from 'next/font/google';
import '../globals.css';
import SessionProvider from './SessionProvider';

const inter = Inter({ subsets: ['latin'] });

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Kevin Agyeman',
  image:
    'https://firebasestorage.googleapis.com/v0/b/kevinagyeman-db.appspot.com/o/website-preview-cover.png?alt=media&token=2a47d546-bae6-452b-a56d-1c9740adacc5',
  description: 'Web Developer',
};

type Props = {
  params: { id: string; locale: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export const viewport: Viewport = {
  initialScale: 1,
  width: 'device-width',
  maximumScale: 1,
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const information: InformationSchema | undefined = await getInformation();

  return {
    title: `Kevin Agyeman | ${information?.role}`,
    description: `${information?.summary}`,
    keywords: [`${information?.skills}`],
    alternates: {
      canonical: 'https://kevinagyeman.com',
    },
    openGraph: {
      title: `Kevin Agyeman | ${information?.role}`,
      description: `${information?.summary}`,
      url: 'https://kevinagyeman.com',
      siteName: 'Kevin Agyeman',
      images: [
        {
          url: `https://firebasestorage.googleapis.com/v0/b/kevinagyeman-db.appspot.com/o/website-preview-cover.png?alt=media&token=2a47d546-bae6-452b-a56d-1c9740adacc5`,
          width: 800,
          height: 600,
        },
        {
          url: `https://firebasestorage.googleapis.com/v0/b/kevinagyeman-db.appspot.com/o/website-preview-cover.png?alt=media&token=2a47d546-bae6-452b-a56d-1c9740adacc5`,
          width: 1800,
          height: 1600,
        },
      ],
      locale: params.locale,
      type: 'website',
    },
  };
}

export default function RootLayout({ children, params: { locale } }: any) {
  const messages = useMessages();

  return (
    <html lang={locale} suppressHydrationWarning={true}>
      <body className={inter.className}>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SessionProvider>
          <NextIntlClientProvider messages={messages}>
            <ThemeProvider
              attribute='class'
              defaultTheme='system'
              enableSystem
              disableTransitionOnChange
            >
              <div className='flex h-screen flex-col'>
                <Navbar />
                <div className='container flex-1 py-5'>
                  {children}
                  <Analytics debug={false} />
                  <SpeedInsights debug={false} />
                </div>
                <Footer />
              </div>
            </ThemeProvider>
          </NextIntlClientProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
