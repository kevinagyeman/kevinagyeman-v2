'use client';

import { clientUploadImage } from '@/utils/client-utils';
import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import Link from 'next/link';

export default function ResumeCV() {
  const [doc, setDoc] = useState<any>(
    'https://firebasestorage.googleapis.com/v0/b/kevinagyeman-db.appspot.com/o/resume%2FResume_Kevin_Agyeman?alt=media&token=977dcaa5-4e80-46fa-9b4b-932cfd3630b5'
  );
  const [isUploaded, setIsUploaded] = useState<boolean>(false);

  const uploadDoc = async () => {
    try {
      const newUrl = await clientUploadImage(
        doc,
        `resume/Resume_Kevin_Agyeman`
      );
      setDoc(newUrl);
      setIsUploaded(true);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Button asChild>
        <Link href={doc} target='_blank'>
          Doc Preview
        </Link>
      </Button>
      <div className='flex flex-col gap-y-3 mb-5 mt-5'>
        <Label>Upload resume</Label>
        <div>
          <Input
            placeholder='Choose image'
            accept='.pdf'
            type='file'
            onChange={(e) => {
              setDoc(e.target.files && e.target.files[0]);
            }}
          />
        </div>
        <div>
          <Button onClick={() => uploadDoc()} variant={'secondary'}>
            Upload File
          </Button>
        </div>
        <div>
          {isUploaded ? (
            <small className='text-emerald-500'>Uploaded Succesfully</small>
          ) : (
            <small className='text-amber-300'>Not uploaded</small>
          )}
        </div>
      </div>
    </>
  );
}
