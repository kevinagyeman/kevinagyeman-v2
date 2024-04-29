'use client';

import { informationService } from '@/services/information.service';
import { informationDataState } from '@/store/information-store';
import { InformationSchema } from '@/types/information-schema';
import {
  clientEditButton,
  clientGetInformation,
  clientUpload,
} from '@/utils/client-utils';
import { X } from 'lucide-react';
import React, { ReactElement, useState } from 'react';
import { useRecoilState } from 'recoil';
import Dates from '../dates.component';
import FileDisplay from '../file-display.component';
import FunctionFeedback from '../function-feedback.component';
import SubmitButton from '../submit-button.component';
import { Button } from '../ui/button';
import { Sheet, SheetContent } from '../ui/sheet';
import Upload from '../upload.component';
import InformationForm from './information-form.component';
import SkillsInput from '../skills-input';
import LinkInput from '../link-input.component';

export default function InformationUpdate(): ReactElement {
  const [information, setInformation] =
    useRecoilState<InformationSchema>(informationDataState);
  const [isInputDisabled, setIsInputDisabled] = useState<boolean>(true);
  const [img, setImg] = useState<any>();
  const [isUploaded, setIsUploaded] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const updateInformation = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await informationService.update(information);
    setIsInputDisabled(true);
    setOpen(false);
  };

  const uploadDoc = async () => {
    const newUrl = await clientUpload(img, `information/profile`);
    setInformation({ ...information, profileImageLink: newUrl });
    setIsUploaded(true);
  };

  const initializeInformation = () => {
    setOpen(true);
    setImg(information.profileImageLink);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <Button onClick={() => initializeInformation()} className='w-full'>
        Edit Information
      </Button>
      <SheetContent
        onInteractOutside={(e) => e.preventDefault()}
        className='flex flex-col'
      >
        <div className='flex flex-row items-center py-2 border-b'>
          <div>
            <h1>Edit Information</h1>
          </div>
          <Button
            className='ml-auto'
            onClick={() => setOpen(false)}
            size={'icon'}
            variant={'ghost'}
          >
            <X className='w-5 h-5' />
          </Button>
        </div>
        <div className='overflow-y-auto'>
          <Dates
            updatedAt={information.updatedAt}
            createdAt={information.createdAt}
          />
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
              uploadFunction={uploadDoc}
              setFile={(e: any) => setImg(e.target.files && e.target.files[0])}
              fileAccepted={'image/png,image/jpeg'}
            />
            <FunctionFeedback hasBeenSuccessful={isUploaded} />
          </div>
          <SkillsInput
            data={information}
            setter={setInformation}
            label={'Information skills'}
          />
          <LinkInput data={information} setter={setInformation} />
          <InformationForm
            isDisabled={isInputDisabled}
            informationSetter={setInformation}
            submitFunction={updateInformation}
            information={information}
          />
        </div>
        <div>
          <SubmitButton title={'Update'} />
          {/* <FunctionFeedback hasBeenSuccessful={isUpdated} /> */}
        </div>
      </SheetContent>
    </Sheet>
  );
}
