'use client';

import { InformationSchema } from '@/types/information-schema';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import BreadcrumbMenu from '../breadcrumb-menu.component';
import Description from '../description.component';
import EditAsAdmin from '../edit-as-admin.component';
import LinksList from '../links-list';
import ShortDescription from '../short-description.component';
import SkillsList from '../skills-list.component';

type InformationInfoProps = {
  information: InformationSchema;
};

const InformationInfo = ({ information }: InformationInfoProps) => {
  const t = useTranslations('index');

  return (
    <>
      <BreadcrumbMenu pageName={t('hero.readMore')} />
      <div className='lg:flex gap-10'>
        <div className='lg:w-1/5 flex-col flex gap-y-5  pb-8'>
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
        </div>
        <div className='flex flex-col space-y-6 lg:w-3/5  pb-8'>
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
          <ShortDescription string={information?.summary} />
          <Description string={information?.additionalInfo} />
        </div>
        <div className='lg:w-1/5 flex flex-col gap-y-10'>
          <SkillsList skills={information.skills} type='detail' />
          <LinksList links={information.links} />
        </div>
      </div>
    </>
  );
};

export default InformationInfo;
