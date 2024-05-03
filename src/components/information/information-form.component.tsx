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
import { useRouter } from 'next/navigation';

type InformationFormData = {
  submitFunction(e: React.FormEvent<HTMLFormElement>): Promise<void>;
};

const InformationForm = ({ submitFunction }: InformationFormData) => {
  const [information, setInformation] =
    useRecoilState<InformationSchema>(informationDataState);
  const [isUploaded, setIsUploaded] = useState<boolean>(false);

  const uploadDoc = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newUrl = await clientUpload(
      information.profileImageLink,
      `information/profile`
    );
    setInformation({ ...information, profileImageLink: newUrl });
    setIsUploaded(true);
  };

  return (
    <>
      <div className='max-w-xs my-10'>
        <Upload
          label={'Upload an image'}
          uploadFunction={uploadDoc}
          setFile={(event: any) =>
            setInformation({
              ...information,
              profileImageLink: event.target.files && event.target.files[0],
            })
          }
          imageSrc={information.profileImageLink}
          isUploaded={isUploaded}
          fileAccepted={'image/png,image/jpeg'}
        />
      </div>
      <form
        onSubmit={(event) => submitFunction(event)}
        id='form'
        className='grid lg:grid-cols-3 gap-5'
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
        <div className='flex flex-col gap-y-5'>
          <InformationBasicInputs />
        </div>
        <div className='flex flex-col gap-y-10'>
          <LinkInput data={information} setter={setInformation} />
        </div>
      </form>
    </>
  );
};

export default InformationForm;
