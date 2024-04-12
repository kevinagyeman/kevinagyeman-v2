import React from 'react';

export default function FunctionFeedback({
  hasBeenSuccessful,
}: {
  hasBeenSuccessful: boolean;
}) {
  return (
    <div className='mt-5'>
      {hasBeenSuccessful ? (
        <small className='text-emerald-500'>Successfull updated</small>
      ) : (
        <small className='text-amber-300'>Not updated</small>
      )}
    </div>
  );
}
