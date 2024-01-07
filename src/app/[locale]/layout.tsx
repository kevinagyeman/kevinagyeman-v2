import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import Navbar from '@/components/navbar.component';
import { RecoilRoot } from 'recoil';
import Footer from '@/components/footer.component';
import SessionProvider from './SessionProvider';
import { NextIntlClientProvider, useMessages } from 'next-intl';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Kevin Agyeman',
  description: 'My personal website',
};

export default function RootLayout({ children, params: { locale } }: any) {
  const messages = useMessages();

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <SessionProvider>
          <NextIntlClientProvider messages={messages}>
            <ThemeProvider
              attribute='class'
              defaultTheme='system'
              enableSystem
              disableTransitionOnChange
            >
              {/* <RecoilRoot> */}
              <Navbar />
              <div className='container max-w-lg'>{children}</div>
              {/* <Footer /> */}
              {/* </RecoilRoot> */}
            </ThemeProvider>
          </NextIntlClientProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
