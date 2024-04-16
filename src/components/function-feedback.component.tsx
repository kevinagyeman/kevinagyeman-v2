'use client';

export default function FunctionFeedback({
  hasBeenSuccessful,
}: {
  hasBeenSuccessful: boolean;
}) {
  return (
    <div>
      {hasBeenSuccessful ? (
        <small className='text-emerald-500'>Successfull updated</small>
      ) : (
        <small className='text-amber-300'>Not updated</small>
      )}
    </div>
  );
}
