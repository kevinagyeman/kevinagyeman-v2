'use client';
import { informationDataState } from '@/store/information-store';
import { InformationSchema } from '@/types/information-schema';
import { getInformation, splitByLanguage } from '@/utils/utils';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import SkillsList from '../skills-list.component';
import { Button } from '../ui/button';
import Divider from '../ui/divider';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';

const InformationElement = () => {
  const [information, setInformation] =
    useRecoilState<InformationSchema>(informationDataState);
  const { t } = useTranslation();

  useEffect(() => {
    getInformation(setInformation);
  });

  return (
    <>
      <Button variant='secondary' className='w-full' size={'lg'} asChild>
        <Link href='/admin/information-edit'>Edit information</Link>
      </Button>
      <Divider title={'Info'} />
      <div className='flex flex-col space-y-4'>
        <p className='text-sm text-muted-foreground'>{information?.email}</p>
        <div>
          {information.profileImageLink && (
            <Image
              src={information.profileImageLink}
              className='h-32 rounded-full'
              alt='profile image'
            />
          )}
        </div>
        <h4 className='text-xl font-semibold'>
          {information?.name} {information?.surname}
        </h4>
        <p>{information?.role}</p>
        <p className='text-muted-foreground'>
          {splitByLanguage(`${information?.summary}`)}
        </p>
        <SkillsList string={`${information?.skills}`} />
        <p>{information?.additionalInfo || '-'}</p>
      </div>
    </>
  );
};

export default InformationElement;
