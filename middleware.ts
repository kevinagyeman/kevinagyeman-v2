import { withAuth } from 'next-auth/middleware';
import createIntlMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';

const locales = ['en', 'it'];
// const publicPages = ['/', '/login', '/about', '/contact', '/project'];

const intlMiddleware = createIntlMiddleware({
  locales,
  localePrefix: 'never',
  defaultLocale: 'en',
});

const authMiddleware = withAuth(
  function onSuccess(req) {
    return intlMiddleware(req);
  },
  {
    callbacks: {
      authorized: ({ token }) => token != null,
    },
    pages: {
      signIn: '/login',
    },
  }
);

export default function middleware(req: NextRequest) {
  // const publicPathnameRegex = RegExp(
  //   `^(/(${locales.join('|')}))?(${publicPages
  //     .flatMap((p) => (p === '/' ? ['', '/'] : p))
  //     .join('|')})/?$`,
  //   'i'
  // );
  // const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

  const isPrivatePage = req.nextUrl.pathname.startsWith('/admin');

  if (!isPrivatePage) {
    return intlMiddleware(req);
  } else {
    return (authMiddleware as any)(req);
  }
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
