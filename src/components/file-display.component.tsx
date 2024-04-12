import React, { ReactElement } from 'react';
import Image from 'next/image';

type FileDisplayProps = {
  fileUrl?: string;
};

export default function FileDisplay({ fileUrl }: FileDisplayProps) {
  return (
    <div>
      {fileUrl ? (
        <Image
          src={fileUrl}
          alt='profile'
          width='0'
          height='0'
          sizes='100vw'
          style={{ width: '100%', height: 'auto' }}
          className='rounded-lg'
        />
      ) : (
        <ImageMissing />
      )}
    </div>
  );
}

const ImageMissing = (): ReactElement => {
  return (
    <div className='h-[300px] border rounded-lg justify-center items-center flex mb-2'>
      <h1 className='text-lg'>Image missing</h1>
    </div>
  );
};
