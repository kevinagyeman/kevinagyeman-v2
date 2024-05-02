'use client';

import { informationDataState } from '@/store/information-store';
import { InformationSchema } from '@/types/information-schema';
import { clientUpload } from '@/utils/client-utils';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import FileDisplay from '../file-display.component';
import LinkInput from '../link-input.component';
import InformationBasicInputs from './information-basic-inputs.component';

import Dates from '../dates.component';
import FunctionFeedback from '../function-feedback.component';
import SkillsInput from '../skills-input';
import Upload from '../upload.component';

type InformationFormData = {
  submitFunction(e: React.FormEvent<HTMLFormElement>): Promise<void>;
};

const InformationForm = ({ submitFunction }: InformationFormData) => {
  const [information, setInformation] =
    useRecoilState<InformationSchema>(informationDataState);
  const [isUploaded, setIsUploaded] = useState<boolean>(false);
  const [img, setImg] = useState<any>();

  const uploadDoc = async () => {
    const newUrl = await clientUpload(img, `information/profile`);
    setInformation({ ...information, profileImageLink: newUrl });
    setIsUploaded(true);
  };

  return (
    <>
      <form
        onSubmit={(event) => submitFunction(event)}
        id='form'
        className='grid lg:grid-cols-4 gap-5'
      >
        <div className='flex flex-col gap-y-10'>
          <Dates
            updatedAt={information.updatedAt}
            createdAt={information.createdAt}
          />

          <SkillsInput
            data={information}
            setter={setInformation}
            label={'Information skills'}
          />
        </div>
        <div className='flex flex-col gap-y-10'>
          <LinkInput data={information} setter={setInformation} />
        </div>
        <div className='flex flex-col gap-y-10'>
          <InformationBasicInputs />
        </div>
        <div className='flex flex-col gap-y-10'>
          <div>
            <FileDisplay fileUrl={information.profileImageLink} />
            <Upload
              label={'Upload an image'}
              uploadFunction={uploadDoc}
              setFile={(e: any) => setImg(e.target.files && e.target.files[0])}
              fileAccepted={'image/png,image/jpeg'}
            />
            <FunctionFeedback hasBeenSuccessful={isUploaded} />
          </div>
        </div>
      </form>
    </>
  );
};

export default InformationForm;
