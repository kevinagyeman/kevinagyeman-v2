import { InformationSchema } from '@/types/information-schema';
import { getInformation } from '@/utils/utils';
import { ArrowLeft, Copy, Send } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { Button } from './ui/button';
import { Input } from './ui/input';

export default async function Contact() {
  const information: InformationSchema | undefined = await getInformation();
  const t = await getTranslations('contact');
  let isCopied = false;

  const copyText = () => {
    navigator.clipboard.writeText(`${information?.email || ''}`);
    isCopied = true;
    setTimeout(() => {
      isCopied = false;
    }, 1000);
  };

  const sendEmail = () => {
    window.location.href = `mailto:${information?.email || ''}`;
  };

  return (
    <>
      <div className='mt-5'>
        <h2 className='mb-2 text-3xl font-semibold'>{t('title')}</h2>
        <p className='text-muted-foreground'>{t('description')}</p>
        <div className='mt-5 flex space-x-2'>
          <Input
            value={
              (!isCopied && information?.email) || ''
              // : t('contactCard.alertEmailCopied')
            }
            readOnly
          />
          <Button
            variant='secondary'
            className='shrink-0'
            // onClick={() => copyText()}
          >
            <Copy className='h-4 w-4' />
          </Button>
          <Button
            variant='secondary'
            className='shrink-0'
            // onClick={() => sendEmail()}
          >
            <Send className='h-4 w-4' />
          </Button>
        </div>
      </div>
      <div className='mt-5 flex'>
        <Button variant={'outline'} size={'lg'} asChild className='ml-auto'>
          <Link href='/'>
            <ArrowLeft className='h-5 w-5' />
          </Link>
        </Button>
      </div>
    </>
  );
}
