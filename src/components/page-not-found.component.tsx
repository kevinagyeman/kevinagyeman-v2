'use client';

import { MoveLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Button } from './ui/button';

export default function PageNotFound() {
  const t = useTranslations('pageNotFound');

  return (
    <>
      <Alert>
        <AlertTitle className='text-xl'>{t('title')}</AlertTitle>
        <AlertDescription className='text-l text-muted-foreground'>
          {t('sentence')}
        </AlertDescription>
      </Alert>
      <Button size={'lg'} asChild className='mt-5 w-full'>
        <Link href='/'>
          <MoveLeft className='mr-2' /> {t('goBackHome')}
        </Link>
      </Button>
    </>
  );
}
