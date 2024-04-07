'use client';

import { clientGetInformation, getInformation } from '@/utils/utils';
import Image from 'next/image';
import Link from 'next/link';
import SkillsList from '../skills-list.component';
import { Button } from '../ui/button';
import Divider from '../ui/divider';
import { InformationSchema } from '@/types/information-schema';
import { ReactElement, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { informationDataState } from '@/store/information-store';

export default function InformationElement() {
  const [information, setInformation] =
    useRecoilState<InformationSchema>(informationDataState);

  useEffect(() => {
    clientGetInformation(setInformation);
  }, []);

  if (information.id) {
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
                className='rounded-full'
                alt='profile image'
                width='32'
                height={'32'}
              />
              //   <Image
              //   className="origin-center rounded-full shadow-sm"
              //   priority={true}
              //   fill={true}
              //   sizes="100vw, 100vh"
              //   src={data[0].picture}
              //   alt="profile"
              // />
            )}
          </div>
          <h4 className='text-xl font-semibold'>
            {information?.name} {information?.surname}
          </h4>
          <p>{information?.role}</p>
          <p className='text-muted-foreground'>{information?.summary}</p>
          <SkillsList string={`${information?.skills}`} />
          <p>{information?.additionalInfo || '-'}</p>
        </div>
      </>
    );
  }
}
