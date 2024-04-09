'use client';

import { informationService } from '@/services/information.service';
import { informationDataState } from '@/store/information-store';
import { InformationSchema } from '@/types/information-schema';
import { clientGetInformation } from '@/utils/client-utils';
import React, { ReactElement, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import InformationForm from './information-form.component';
import { storage } from '@/firebase';
import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';
import { Label } from '../ui/label';
import Image from 'next/image';

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

  const uploadNewProfileImage = async () => {
    try {
      if (img) {
        const imgRef = ref(storage, `information/profile`);
        const value = await uploadBytes(imgRef, img);
        const url = await getDownloadURL(value.ref);
        setInformation({ ...information, profileImageLink: url });
      }
    } catch (e) {
      console.log(e);
    }
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
      {information.profileImageLink && (
        <Image
          src={information.profileImageLink}
          alt='profile'
          width={300}
          height={300}
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
          onClick={() => uploadNewProfileImage()}
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
