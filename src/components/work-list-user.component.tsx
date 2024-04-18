'use client';

import { ProjectSchema } from '@/types/project-schema';
import { splitSkills } from '@/utils/server-utils';
import { ArrowUpRight, Check } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';
import DisplayDate from './display-date.component';
import { Timestamp } from 'firebase/firestore';

type WorkListUserProps = {
  worksList: ProjectSchema[];
};

export default function WorkListUser({ worksList }: WorkListUserProps) {
  const t = useTranslations('index');
  return (
    <>
      <h2 className='mb-2 scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0'>
        {t('work.title')}
      </h2>
      <p className='text-muted-foreground'>{t('work.description')}</p>
      {worksList?.map((work: ProjectSchema, index: number) => (
        <div
          key={index}
          className='my-3 flex 
flex-col space-y-3 rounded-lg border p-6'
        >
          <div className='flex'>
            <h3 className='truncate text-2xl font-semibold'>{work.title}</h3>
            <div className='ml-auto'>
              <ArrowUpRight />
            </div>
          </div>
          {work.startDate && <DisplayDate startDate={work.startDate} />}
          <p className='line-clamp-2 text-muted-foreground'>
            {work.shortDescription}
          </p>
          <div className='flex flex-wrap gap-x-3 gap-y-1'>
            {splitSkills(`${work?.skills}`, 3).map((skill, index) => (
              <p key={index} className='flex items-center gap-1'>
                <Check className='h-4 w-4' />
                {skill}
              </p>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
