'use client';

import { informationService } from '@/services/information.service';
import { informationDataState } from '@/store/information-store';
import { InformationSchema } from '@/types/information-schema';
import { clientGetInformation } from '@/utils/client-utils';
import React, { ReactElement, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { Button } from '../ui/button';
import InformationForm from './information-form.component';

export default function InformationUpdate(): ReactElement {
  const [information, setInformation] =
    useRecoilState<InformationSchema>(informationDataState);
  const [isInputDisabled, setIsInputDisabled] = useState<boolean>(true);

  const updateInformation = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await informationService.update(information);
    setIsInputDisabled(true);
  };

  const editInformationButton = () => {
    if (isInputDisabled) {
      setIsInputDisabled(false);
    } else {
      clientGetInformation(setInformation);
      setIsInputDisabled(true);
    }
  };

  useEffect(() => {
    clientGetInformation(setInformation);
  }, []);

  return (
    <>
      <div className='my-8 flex flex-row gap-x-3'>
        <Button
          variant='secondary'
          onClick={() => {
            editInformationButton();
          }}
        >
          {isInputDisabled ? 'Edit' : 'Undo'}
        </Button>
        <Button type='submit' disabled={isInputDisabled} form='form'>
          Update
        </Button>
      </div>
      <InformationForm
        isDisabled={isInputDisabled}
        informationSetter={setInformation}
        submitFunction={updateInformation}
        information={information}
      />
      <Button
        type='submit'
        className='mt-3 w-full'
        disabled={isInputDisabled}
        form='form'
      >
        Update
      </Button>
    </>
  );
}
