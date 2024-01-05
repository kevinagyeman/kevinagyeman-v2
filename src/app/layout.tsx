import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import Navbar from '@/components/navbar.component';
import { RecoilRoot } from 'recoil';
import Footer from '@/components/footer.component';
import SessionProvider from './SessionProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Kevin Agyeman',
  description: 'My personal website',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          {/* <RecoilRoot> */}
          {/* <Navbar /> */}
          <div className='container max-w-lg'>
            <SessionProvider>{children}</SessionProvider>
          </div>
          {/* <Footer /> */}
          {/* </RecoilRoot> */}
        </ThemeProvider>
      </body>
    </html>
  );
}
