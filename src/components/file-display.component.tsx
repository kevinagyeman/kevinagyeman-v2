'use client';

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
          alt='file preview'
          width='0'
          height='0'
          sizes='100vw'
          className='w-full h-auto object-cover rounded-lg'
          style={{ aspectRatio: '16/9' }}
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
