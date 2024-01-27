import Footer from '@/components/footer.component';
import Navbar from '@/components/navbar.component';
import { ThemeProvider } from '@/components/theme-provider';
import { InformationSchema } from '@/types/information-schema';
import { getInformation, splitByLanguage } from '@/utils/utils';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata, ResolvingMetadata } from 'next';
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
    'https://firebasestorage.googleapis.com/v0/b/kevinagyeman-db.appspot.com/o/cover-site.png?alt=media&token=be8cef1a-0754-42ed-83c6-479c19cbefee',
  description: 'Web Developer',
};

type Props = {
  params: { id: string; locale: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const information: InformationSchema | undefined = await getInformation();

  return {
    title: `Kevin Agyeman | ${information?.role}`,
    description: `${await splitByLanguage(`${information?.summary}`)}`,
    keywords: [`${information?.skills}`],
    openGraph: {
      title: `Kevin Agyeman | ${information?.role}`,
      description: `${await splitByLanguage(`${information?.summary}`)}`,
      url: 'https://kevinagyeman.com',
      siteName: 'Kevin Agyeman',
      images: [
        {
          url: `https://firebasestorage.googleapis.com/v0/b/kevinagyeman-db.appspot.com/o/cover-site.png?alt=media&token=be8cef1a-0754-42ed-83c6-479c19cbefee`,
          width: 800,
          height: 600,
        },
        {
          url: `https://firebasestorage.googleapis.com/v0/b/kevinagyeman-db.appspot.com/o/cover-site.png?alt=media&token=be8cef1a-0754-42ed-83c6-479c19cbefee`,
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
        <SessionProvider>
          <NextIntlClientProvider messages={messages}>
            <ThemeProvider
              attribute='class'
              defaultTheme='system'
              enableSystem
              disableTransitionOnChange
            >
              <Navbar />
              <div className='container max-w-lg'>
                <script
                  type='application/ld+json'
                  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                {children}
                <Analytics />
                <SpeedInsights />
              </div>
              <Footer />
            </ThemeProvider>
          </NextIntlClientProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
