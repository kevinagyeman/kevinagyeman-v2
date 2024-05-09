import React from 'react';

export default function Description({ string }: { string?: string }) {
  return (
    <>{string ? <p className='text-xl font-extralight'>{string}</p> : null}</>
  );
}
