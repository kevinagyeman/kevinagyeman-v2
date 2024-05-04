'use client';

import { clientUpload } from '@/utils/client-utils';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from './ui/button';
import Upload from './upload.component';
import { File } from 'lucide-react';

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
          Doc Preview <File className='h-4 w-4 ml-2' />
        </Link>
      </Button>
      <div className='flex flex-col gap-y-3 mt-5'>
        <Upload
          label={'Upload a file PDF'}
          uploadFunction={uploadDoc}
          setFile={(e: any) => setDoc(e.target.files && e.target.files[0])}
          isUploaded={isUploaded}
          fileAccepted={'application/pdf'}
        />
      </div>
    </>
  );
}
