'use client';

import { getProjects, splitByLanguage, splitSkills } from '@/utils/utils';
import { ArrowUpRight, Check } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Link } from '../../../navigation';
import { ProjectSchema } from '../../types/project-schema';
import { useTranslations } from 'next-intl';

type ProjectsListUserProps = {
  projects: ProjectSchema[];
};
export default function ProjectsListUser({ projects }: ProjectsListUserProps) {
  const t = useTranslations('index');

  return (
    <>
      <h2 className='mb-2 scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0'>
        {t('projects.title')}
      </h2>
      <p className='text-muted-foreground'>{t('projects.description')}</p>
      {projects?.map((project: ProjectSchema, index: number) => (
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
                {`${project.title}`}
              </h3>
              <div className='ml-auto'>
                <ArrowUpRight />
              </div>
            </div>
            <p className='line-clamp-2 text-muted-foreground'>
              {`${project.shortDescription}`}
            </p>
            <div className='flex flex-wrap gap-x-3 gap-y-1'>
              {splitSkills(`${project?.skills}`, 3).map((skill, index) => (
                <p key={index} className='flex items-center gap-1'>
                  <Check className='h-4 w-4' />
                  {skill}
                </p>
              ))}
            </div>
          </div>
        </Link>
      ))}
    </>
  );
}
