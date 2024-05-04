'use client';

import { Button } from '@/components/ui/button';
import { InformationSchema } from '@/types/information-schema';
import { ArrowUpRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '../../../navigation';
import LinksList from '../LinksList.component';
import BreadcrumbMenu from '../breadcrumb-menu.component';
import SkillsList from '../skills-list.component';
import EditAsAdmin from '../edit-as-admin.component';

type InformationInfoProps = {
  information: InformationSchema;
};

const InformationInfo = ({ information }: InformationInfoProps) => {
  const t = useTranslations('index');

  return (
    <>
      <BreadcrumbMenu pageName={t('hero.readMore')} />
      <div className='lg:flex gap-28'>
        <div className='lg:w-1/5 flex-col flex gap-y-5'>
          <EditAsAdmin href='/admin/dashboard/information-edit' />
          {information?.profileImageLink && (
            <Image
              src={information.profileImageLink}
              className='rounded-full'
              alt='Profile image'
              width='0'
              height='0'
              sizes='100vw'
              style={{ width: 'auto', height: 'auto', maxWidth: '300px' }}
            />
          )}
          {information?.skills && (
            <SkillsList skills={information?.skills} type='detail' />
          )}
        </div>
        <div className='flex flex-col space-y-6 lg:w-4/5'>
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
          <p className='text-xl text-muted-foreground font-extralight'>
            {information?.summary}
          </p>

          <p className='text-xl font-extralight'>
            {information?.additionalInfo}
          </p>

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
          {information.links && <LinksList links={information.links} />}
        </div>
      </div>
    </>
  );
};

export default InformationInfo;
