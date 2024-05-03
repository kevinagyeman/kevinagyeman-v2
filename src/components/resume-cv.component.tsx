'use client';

import { clientUpload } from '@/utils/client-utils';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from './ui/button';
import Upload from './upload.component';

export default function ResumeCV() {
  const [doc, setDoc] = useState<any>(
    'https://firebasestorage.googleapis.com/v0/b/kevinagyeman-db.appspot.com/o/resume%2FResume_Kevin_Agyeman?alt=media&token=977dcaa5-4e80-46fa-9b4b-932cfd3630b5'
  );
  const [isUploaded, setIsUploaded] = useState<boolean>(false);

  const uploadDoc = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const newUrl = await clientUpload(doc, `resume/Resume_Kevin_Agyeman`);
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
        <Upload
          label={'Upload an image'}
          uploadFunction={uploadDoc}
          setFile={(e: any) => setDoc(e.target.files && e.target.files[0])}
          isUploaded={isUploaded}
          fileAccepted={'application/pdf'}
        />
      </div>
    </>
  );
}
