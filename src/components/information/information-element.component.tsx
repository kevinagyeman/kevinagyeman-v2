'use client';

import { informationDataState } from '@/store/information-store';
import { InformationSchema } from '@/types/information-schema';
import { clientGetInformation } from '@/utils/client-utils';
import Image from 'next/image';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import CustomModalDialog from '../custom-modal-dialog.component';
import SkillsList from '../skills-list.component';
import { Button } from '../ui/button';
import InformationUpdate from './information-update.component';

export default function InformationElement() {
  const [information, setInformation] =
    useRecoilState<InformationSchema>(informationDataState);

  useEffect(() => {
    clientGetInformation(setInformation);
  }, [setInformation]);

  if (information.id) {
    return (
      <>
        <EditInformationModal />
        <div className='flex flex-col space-y-4 mt-5'>
          <div>
            {information.profileImageLink && (
              <Image
                src={information.profileImageLink}
                className='rounded-full'
                alt='profile image'
                width='0'
                height='0'
                sizes='100vw'
                style={{ width: '100%', height: 'auto', maxWidth: '300px' }}
              />
            )}
          </div>
          <h4 className='text-xl font-semibold'>
            {information?.name} {information?.surname}
          </h4>
          <p>{information?.role}</p>
          <p className='text-muted-foreground'>{information?.summary}</p>
          <SkillsList string={`${information?.skills}`} />
          {information && <p>{information.additionalInfo}</p>}
          <p className='text-sm text-muted-foreground'>{information?.email}</p>
        </div>
      </>
    );
  }
}

const EditInformationModal = () => {
  return (
    <CustomModalDialog
      dialogTrigger={<Button size={'lg'}>Edit Information</Button>}
    >
      <InformationUpdate />
    </CustomModalDialog>
  );
};
