'use client';

import { ProjectSchema } from '@/types/project-schema';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import SkillsList from './skills-list.component';
import { clientFormatDateUser } from '@/utils/client-utils';
import { Button } from './ui/button';

type WorkListUserProps = {
  worksList: ProjectSchema[];
};

export default function WorkListUser({ worksList }: WorkListUserProps) {
  const t = useTranslations('index');
  return (
    <div className='py-3'>
      <h2 className='scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0'>
        Relevant work experience
      </h2>
      <p className='text-muted-foreground'>
        A list of some relevant experiences
      </p>
      <div className='lg:grid lg:grid-cols-3 gap-6 py-3 flex flex-col'>
        {worksList?.map((project: ProjectSchema, index: number) => (
          <div key={index} className='flex flex-col gap-y-1 border-l-4 p-6'>
            <h3 className='truncate text-2xl font-semibold'>{project.title}</h3>
            {project.company && (
              <p className='line-clamp-1 text-muted-foreground text-sm italic'>
                {project.company} •{' '}
                {project.startDate && (
                  <>
                    {clientFormatDateUser(project.startDate)} -{' '}
                    {project.isPresentDate
                      ? 'Present'
                      : clientFormatDateUser(project.endDate)}
                  </>
                )}
              </p>
            )}
            <p className='line-clamp-1 text-muted-foreground'>
              {project.shortDescription}
            </p>
            {project?.skills && (
              <SkillsList
                skills={project?.skills}
                numberOfSkills={3}
                type='homepage'
              />
            )}
            <div className='mt-2'>
              <Button asChild variant={'secondary'} size={'sm'}>
                <Link
                  href={`/project/${project.id}`}
                  rel='canonical'
                  prefetch={true}
                >
                  Read more <ArrowRight className='w-5 h-5 ml-2' />
                </Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
