'use client';

import {
  ClientSplitByLanguage,
  getInformation,
  serverSplitByLanguage,
} from '@/utils/server-utils';
import { ChevronRight, Send } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import SkeletonLoader from './skeleton.component';
import SkillsList from './skills-list.component';
import { Button } from './ui/button';
import { InformationSchema } from '@/types/information-schema';
import { useTranslations } from 'next-intl';

type HeroProps = {
  information: InformationSchema;
};

export default function Hero({ information }: HeroProps) {
  const t = useTranslations('index');

  if (information?.id) {
    return (
      <div className='mb-8 flex flex-col space-y-5'>
        <div>
          <code className='relative rounded bg-muted px-[0.4rem] py-[0.2rem] font-mono text-sm'>
            {information?.role}
          </code>
        </div>
        <h1 className='text-4xl font-extrabold lg:text-5xl'>
          {information?.name} {information?.surname}
        </h1>
        <p className='text-l line-clamp-3 text-muted-foreground lg:text-xl'>
          {ClientSplitByLanguage(`${information?.summary}`)}
        </p>
        <SkillsList string={`${information?.skills}`} numberOfSkills={4} />
        <div className='flex flex-wrap gap-3'>
          <Button variant={'secondary'} size={'lg'} asChild>
            <Link href='/contact' rel='canonical' prefetch={true}>
              {t('hero.contact')}
              <Send className='ml-2 h-4 w-4' />
            </Link>
          </Button>
          <Button variant={'outline'} size={'lg'} asChild>
            <Link href='/about' rel='canonical' prefetch={true}>
              {t('hero.readMore')}
              <ChevronRight className='h-5 w-5' />
            </Link>
          </Button>
        </div>
      </div>
    );
  } else {
    <SkeletonLoader />;
  }
}
