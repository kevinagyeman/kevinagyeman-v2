'use client';

import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '../../../navigation';
import { ProjectSchema } from '../../types/project-schema';
import SkillsList from '../skills-list.component';
import { Button } from '../ui/button';

type ProjectsListUserProps = {
  projects: ProjectSchema[];
};
export default function ProjectsListUser({ projects }: ProjectsListUserProps) {
  const t = useTranslations('index');

  return (
    <div className='py-5 max-w-5xl m-auto'>
      <h2 className='mb-2 scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0'>
        {t('projects.title')}
      </h2>
      <p className='text-muted-foreground'>{t('projects.description')}</p>
      <div className='lg:grid lg:grid-cols-3 gap-3 py-3 flex flex-col'>
        {projects?.map((project: ProjectSchema, index: number) => (
          <div
            key={index}
            className='rounded-xl overflow-hidden border lg:transition lg:ease-in-out lg:hover:scale-110 lg:hover:bg-zinc-100 lg:dark:hover:bg-zinc-900'
          >
            <div>
              {project.imageLink && (
                <Image
                  src={project.imageLink}
                  alt={`${project.title} image`}
                  width='0'
                  height='0'
                  sizes='100vw'
                  className='w-full aspect-video h-auto object-cover'
                />
              )}
            </div>
            <div
              className='flex 
    flex-col space-y-3  p-6'
            >
              <h3 className='truncate text-2xl font-semibold'>
                {project.title}
              </h3>
              {/* <div>
                <DisplayCompanyDate
                  startDate={project.startDate}
                  endDate={project.endDate}
                  company={project.company}
                  isPresentDate={project.isPresentDate}
                />
              </div> */}
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
              <div>
                <Button asChild variant={'secondary'}>
                  <Link
                    href={`/project/${project.id}`}
                    rel='canonical'
                    prefetch={true}
                  >
                    Read More <ArrowRight className='w-4 h-4 ml-2' />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
