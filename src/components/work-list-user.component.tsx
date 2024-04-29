'use client';

import { ProjectSchema } from '@/types/project-schema';
import { splitSkills } from '@/utils/server-utils';
import { ArrowUpRight, Check } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';
import DisplayDate from './display-date.component';
import { Timestamp } from 'firebase/firestore';
import { clientFormatDateUser } from '@/utils/client-utils';
import SkillsList from './skills-list.component';
import Link from 'next/link';

type WorkListUserProps = {
  worksList: ProjectSchema[];
};

export default function WorkListUser({ worksList }: WorkListUserProps) {
  const t = useTranslations('index');
  return (
    <>
      <h2 className='mb-2 scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0'>
        Relevant work experience
      </h2>
      <p className='text-muted-foreground'>
        A list of some relevant experiences
      </p>
      {worksList?.map((project: ProjectSchema, index: number) => (
        <Link
          href={`/project/${project.id}`}
          key={index}
          rel='canonical'
          prefetch={true}
        >
          <div
            className='my-3 flex 
    flex-col space-y-3 rounded-lg border p-6 lg:transition lg:ease-in-out lg:hover:scale-110 lg:hover:bg-zinc-100 lg:dark:hover:bg-zinc-900'
          >
            <div className='flex'>
              <h3 className='truncate text-2xl font-semibold'>
                {project.title}
              </h3>
              <div className='ml-auto'>
                <ArrowUpRight />
              </div>
            </div>
            <p className='line-clamp-2 text-muted-foreground'>
              {project.shortDescription}
            </p>
            {project?.skills && (
              <SkillsList
                skills={project?.skills}
                numberOfSkills={3}
                type='homepage'
              />
            )}
          </div>
        </Link>
      ))}
    </>
  );
}
