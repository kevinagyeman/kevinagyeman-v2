'use client';

import { informationService } from '@/services/information.service';
import { informationDataState } from '@/store/information-store';
import { InformationSchema } from '@/types/information-schema';
import {
  clientEditButton,
  clientGetInformation,
  clientUpload,
} from '@/utils/client-utils';
import React, { ReactElement, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import FileDisplay from '../file-display.component';
import FunctionFeedback from '../function-feedback.component';
import SubmitButton from '../submit-button.component';
import { Button } from '../ui/button';
import Upload from '../upload.component';
import InformationForm from './information-form.component';

export default function InformationUpdate(): ReactElement {
  const [information, setInformation] =
    useRecoilState<InformationSchema>(informationDataState);
  const [isInputDisabled, setIsInputDisabled] = useState<boolean>(true);
  const [img, setImg] = useState<any>();
  const [isUploaded, setIsUploaded] = useState<boolean>(false);
  const [isUpdated, setIsUpdated] = useState<boolean>(false);

  const updateInformation = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await informationService.update(information);
    setIsInputDisabled(true);
    setIsUpdated(true);
  };

  const uploadDoc = async () => {
    const newUrl = await clientUpload(img, `information/profile`);
    setInformation({ ...information, profileImageLink: newUrl });
    setIsUploaded(true);
  };

  useEffect(() => {
    setImg(information.profileImageLink);
    clientGetInformation(setInformation);
  }, [information.profileImageLink, setInformation]);

  return (
    <>
      <div className='my-8 flex flex-row gap-x-3'>
        <Button
          variant='secondary'
          onClick={() =>
            clientEditButton(
              isInputDisabled,
              setIsInputDisabled,
              information.id,
              setInformation
            )
          }
        >
          {isInputDisabled ? 'Edit' : 'Undo'}
        </Button>
      </div>
      <div className='flex flex-col gap-y-3 mb-5'>
        <FileDisplay fileUrl={information.profileImageLink} />
        <Upload
          label={'Upload an image'}
          isInputDisabled={isInputDisabled}
          uploadFunction={uploadDoc}
          setFile={(e: any) => setImg(e.target.files && e.target.files[0])}
          fileAccepted={'image/png,image/jpeg'}
        />
        <FunctionFeedback hasBeenSuccessful={isUploaded} />
      </div>
      <InformationForm
        isDisabled={isInputDisabled}
        informationSetter={setInformation}
        submitFunction={updateInformation}
        information={information}
      />
      <SubmitButton title={'Update'} isInputDisabled={isInputDisabled} />
      <FunctionFeedback hasBeenSuccessful={isUpdated} />
    </>
  );
}
