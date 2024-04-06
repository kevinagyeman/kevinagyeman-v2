'use client';

import { InformationSchema } from '@/types/information-schema';
import { ArrowLeft, Copy, Send } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useState } from 'react';

type ContactProps = {
  information: InformationSchema;
};

export default function Contact({ information }: ContactProps) {
  const t = useTranslations('contact');

  return (
    <>
      <div className='mt-5'>
        <h2 className='mb-2 text-3xl font-semibold'>{t('title')}</h2>
        <p className='text-muted-foreground'>{t('description')}</p>
        <div className='mt-5 flex space-x-2'>
          <InputEmail information={information} />
          <Button variant='secondary' className='shrink-0' asChild>
            <Link href={`mailto:${information?.email}`}>
              <Send className='h-4 w-4' />
            </Link>
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

type InputEmailProps = {
  information: InformationSchema;
};

const InputEmail = ({ information }: InputEmailProps) => {
  const t = useTranslations('contact');
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const copyText = () => {
    navigator.clipboard.writeText(`${information?.email || ''}`);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  return (
    <>
      <Input
        value={!isCopied ? information?.email : t('alertEmailCopied')}
        readOnly
      />
      <Button
        variant='secondary'
        className='shrink-0'
        onClick={() => copyText()}
      >
        <Copy className='h-4 w-4' />
      </Button>
    </>
  );
};
