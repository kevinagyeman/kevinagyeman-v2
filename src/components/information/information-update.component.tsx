'use client';

import { informationService } from '@/services/information.service';
import { informationDataState } from '@/store/information-store';
import { InformationSchema } from '@/types/information-schema';
import { clientGetInformation } from '@/utils/client-utils';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { ReactElement, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import SubmitButton from '../submit-button.component';
import { Button } from '../ui/button';
import InformationForm from './information-form.component';

export default function InformationUpdate(): ReactElement {
  const [information, setInformation] =
    useRecoilState<InformationSchema>(informationDataState);
  const router = useRouter();

  const updateInformation = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await informationService.update(information);
    router.push('/admin/dashboard');
  };

  useEffect(() => {
    clientGetInformation(setInformation);
  }, [setInformation]);

  return (
    <>
      <div className='flex flex-col gap-5'>
        <div className='flex flex-row items-center'>
          <div>
            <h1 className='text-xl'>
              {information.name} {information.surname}
            </h1>
          </div>
        </div>
        <div>
          <InformationForm submitFunction={updateInformation} />
        </div>
        <div className='sticky bottom-0 py-5 bg-background border-t'>
          <small className='text-muted-foreground'>{information.name}</small>
          <div className='flex gap-x-2 items-center'>
            <div className='grow'>
              <SubmitButton title={'Update information'} />
            </div>
            <div>
              <Button asChild size={'icon'} variant={'secondary'}>
                <Link href={'/admin/dashboard'}>
                  <ArrowLeft className={'w-5 h-5'} />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
