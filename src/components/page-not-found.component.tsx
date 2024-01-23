import { MoveLeft } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Button } from './ui/button';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

export default async function PageNotFound() {
  const t = await getTranslations('pageNotFound');

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
