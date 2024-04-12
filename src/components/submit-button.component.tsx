import React from 'react';
import { Button } from './ui/button';

type SubmitButtonProps = {
  title: string;
  isInputDisabled: boolean;
};

export default function SubmitButton({
  title,
  isInputDisabled,
}: SubmitButtonProps) {
  return (
    <>
      <Button
        type='submit'
        className='mt-3 w-full'
        disabled={isInputDisabled}
        form='form'
      >
        {title}
      </Button>
    </>
  );
}
