import React from 'react';
import { Button } from './ui/button';
import { Atom, Check } from 'lucide-react';

type SubmitButtonProps = {
  title: string;
};

export default function SubmitButton({ title }: SubmitButtonProps) {
  return (
    <>
      <Button type='submit' className='w-full' form='form'>
        {title} <Atom className='ml-2 w-4 h-4' />
      </Button>
    </>
  );
}
