import React from 'react';
import { Button } from './ui/button';

type SubmitButtonProps = {
  title: string;
};

export default function SubmitButton({ title }: SubmitButtonProps) {
  return (
    <>
      <Button type='submit' className='w-full' form='form'>
        {title}
      </Button>
    </>
  );
}
