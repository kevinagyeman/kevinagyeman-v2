import React from 'react';

type TitleSectionProps = {
  title: string;
  subtitle: string;
};

export default function TitleSection({ title, subtitle }: TitleSectionProps) {
  return (
    <div className='py-3  lg:text-left text-center'>
      <h2 className='mb-2 text-2xl lg:text-4xl font-semibold'>{title}</h2>
      <p className='text-muted-foreground'>{subtitle}</p>
    </div>
  );
}
