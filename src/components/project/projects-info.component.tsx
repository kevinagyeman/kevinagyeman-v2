'use client';

import { ProjectSchema } from '@/types/project-schema';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import LinksList from '../LinksList.component';
import BreadcrumbMenu from '../breadcrumb-menu.component';
import SkillsList from '../skills-list.component';

type ProjectInfoProps = {
  project: ProjectSchema;
};

export default function ProjectsInfo({ project }: ProjectInfoProps) {
  const t = useTranslations('project');

  return (
    <>
      <BreadcrumbMenu pageName={project.title || ''} />
      <div className='lg:flex gap-28'>
        <div className='lg:w-2/5 flex-col flex gap-y-8'>
          {project.imageLink && (
            <Image
              src={project.imageLink}
              className='w-full rounded-lg'
              alt={`${project.title} image`}
              width='0'
              height='0'
              sizes='100vw'
              style={{ width: '100%', height: 'auto' }}
            />
          )}
          {project?.skills && (
            <SkillsList skills={project?.skills} type='detail' />
          )}
        </div>
        <div className='flex flex-col space-y-8 lg:w-3/5'>
          {/* {project.startDate && (
          <span className='text-muted'>
            {`${project.startDate}`} - {`${project.endDate}` || 'Present'}
          </span>
        )} */}
          <h2 className='text-5xl font-semibold'>{project.title}</h2>
          {project.company && (
            <p className='text-xl text-muted-foreground'>{project.company}</p>
          )}
          <p className='text-xl text-muted-foreground  font-extralight'>
            {project.shortDescription}
          </p>

          {project.description && (
            <p className='text-xl font-extralight'>{project.description}</p>
          )}
          <div className='flex space-x-2'>
            {project.links && <LinksList links={project.links} />}
          </div>
        </div>
      </div>
    </>
  );
}
