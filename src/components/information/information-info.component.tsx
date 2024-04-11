'use client';

import { Button } from '@/components/ui/button';
import { InformationSchema } from '@/types/information-schema';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '../../../navigation';
import SkillsList from '../skills-list.component';
import BreadcrumbMenu from '../breadcrumb-menu.component';

type InformationInfoProps = {
  information: InformationSchema;
};

const InformationInfo = ({ information }: InformationInfoProps) => {
  const t = useTranslations('index');

  return (
    <>
      <BreadcrumbMenu pageName={t('hero.readMore')} />
      <div className='flex flex-col space-y-6'>
        <div>
          {information?.profileImageLink && (
            <Image
              src={information.profileImageLink}
              className='rounded-full'
              alt='Profile image'
              width='0'
              height='0'
              sizes='100vw'
              style={{ width: '176px', height: 'auto' }}
            />
          )}
        </div>
        <h1 className='text-3xl font-semibold'>
          {information?.name} {information?.surname}
        </h1>
        <div>
          <h2>
            <code className='relative rounded bg-muted px-[0.4rem] py-[0.2rem] font-mono text-sm'>
              {information?.role}
            </code>
          </h2>
        </div>
        <p className='text-xl text-muted-foreground'>{information?.summary}</p>
        <SkillsList string={`${information?.skills}`} />
        <p className='text-xl'>{information?.additionalInfo}</p>

        <div className='flex space-x-2'>
          {information?.additionalLink && (
            <Button
              variant={'secondary'}
              className='w-full'
              size={'lg'}
              asChild
            >
              <Link
                href={information.additionalLink}
                target='_blank'
                rel='external'
              >
                {t('readResume')} <ArrowUpRight className='ml-2 h-5 w-5' />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default InformationInfo;
