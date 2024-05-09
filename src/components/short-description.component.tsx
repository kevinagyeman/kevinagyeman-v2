import React from 'react';

export default function ShortDescription({ string }: { string?: string }) {
  return (
    <>
      {string ? (
        <p className='text-xl text-muted-foreground font-extralight'>
          {string}
        </p>
      ) : null}
    </>
  );
}
