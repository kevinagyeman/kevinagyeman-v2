'use client';

import { InformationSchema } from '@/types/information-schema';
import { ChevronRight, File, Send } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import SkeletonLoader from './skeleton.component';
import SkillsList from './skills-list.component';
import { Button } from './ui/button';

type HeroProps = {
  information: InformationSchema;
};

export default function Hero({ information }: HeroProps) {
  const t = useTranslations('index');

  if (information?.id) {
    return (
      <div className='my-14 flex flex-col space-y-5'>
        <div>
          <code className='relative rounded bg-muted px-[0.4rem] py-[0.2rem] font-mono text-sm'>
            {information?.role}
          </code>
        </div>
        <h1 className='text-4xl font-extrabold lg:text-5xl'>
          {information?.name} {information?.surname}
        </h1>
        <p className='text-l line-clamp-3 text-muted-foreground lg:text-xl'>
          {information?.summary}
        </p>
        <SkillsList string={`${information?.skills}`} numberOfSkills={4} />
        <div className='flex flex-wrap gap-3'>
          <div>
            <Button variant={'secondary'} size={'lg'} asChild>
              <Link href='/contact' rel='canonical' prefetch={true}>
                {t('hero.contact')}
                <Send className='ml-2 h-4 w-4' />
              </Link>
            </Button>
          </div>
          <div>
            <Button variant={'outline'} size={'lg'} asChild>
              <Link href='/about' rel='canonical' prefetch={true}>
                {t('hero.readMore')}
                <ChevronRight className='ml-2 h-5 w-5' />
              </Link>
            </Button>
          </div>
          <div>
            <Button size={'lg'} variant={'outline'} asChild>
              <Link
                href={
                  'https://firebasestorage.googleapis.com/v0/b/kevinagyeman-db.appspot.com/o/resume%2FResume_Kevin_Agyeman?alt=media&token=977dcaa5-4e80-46fa-9b4b-932cfd3630b5'
                }
                target='_blank'
              >
                {t('hero.resume')}
                <File className='ml-2 h-4 w-4' />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  } else {
    <SkeletonLoader />;
  }
}
