'use client';

import { InformationSchema } from '@/types/information-schema';
import { ArrowLeft, Copy, Send } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useState } from 'react';
import BreadcrumbMenu from './breadcrumb-menu.component';
import TitleSection from './title-section';

type ContactProps = {
  information: InformationSchema;
};

export default function Contact({ information }: ContactProps) {
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
      <BreadcrumbMenu pageName={t('title')} />
      <TitleSection title={t('title')} subtitle={t('description')} />
      <div className='gap-x-2 flex max-w-sm'>
        <div className='grow'>
          <Input
            value={!isCopied ? information?.email : t('alertEmailCopied')}
            readOnly
          />
        </div>
        <div className='flex-none'>
          <Button variant='secondary' size={'icon'} onClick={() => copyText()}>
            <Copy className='h-4 w-4' />
          </Button>
        </div>
        <div className='flex-none'>
          <Button size={'icon'} asChild>
            <Link href={`mailto:${information?.email}`}>
              <Send className='h-4 w-4' />
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
}
