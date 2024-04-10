'use client';

import { informationService } from '@/services/information.service';
import { informationDataState } from '@/store/information-store';
import { InformationSchema } from '@/types/information-schema';
import { clientGetInformation, clientUploadImage } from '@/utils/client-utils';
import Image from 'next/image';
import React, { ReactElement, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import InformationForm from './information-form.component';

export default function InformationUpdate(): ReactElement {
  const [information, setInformation] =
    useRecoilState<InformationSchema>(informationDataState);
  const [isInputDisabled, setIsInputDisabled] = useState<boolean>(true);
  const [img, setImg] = useState<any>();

  const updateInformation = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await informationService.update(information);
    setIsInputDisabled(true);
  };

  const uploadImage = async () => {
    const newUrl = await clientUploadImage(img, `information/profile`);
    setInformation({ ...information, profileImageLink: newUrl });
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
    setImg(information.profileImageLink);
    clientGetInformation(setInformation);
  }, [information.profileImageLink, setInformation]);

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
      {information.profileImageLink && (
        <Image
          src={information.profileImageLink}
          alt='profile'
          width='0'
          height='0'
          sizes='100vw'
          style={{ width: '100%', height: 'auto' }}
        />
      )}
      <Label>Upload an image</Label>
      <Input
        placeholder='Choose image'
        accept='image/png,image/jpeg'
        type='file'
        onChange={(e) => {
          setImg(e.target.files && e.target.files[0]);
        }}
        disabled={isInputDisabled}
      />
      <div>
        <Button
          onClick={() => uploadImage()}
          disabled={isInputDisabled}
          variant={'secondary'}
        >
          Upload File
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
