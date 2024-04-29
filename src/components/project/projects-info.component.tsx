'use client';

import { Button } from '@/components/ui/button';
import { ProjectSchema } from '@/types/project-schema';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '../../../navigation';
import SkillsList from '../skills-list.component';
import BreadcrumbMenu from '../breadcrumb-menu.component';
import LinksList from '../LinksList.component';

type ProjectInfoProps = {
  project: ProjectSchema;
};

export default function ProjectsInfo({ project }: ProjectInfoProps) {
  const t = useTranslations('project');

  return (
    <>
      <BreadcrumbMenu pageName={project.title || ''} />
      <div className='flex flex-col space-y-8'>
        {/* {project.startDate && (
          <span className='text-muted'>
            {`${project.startDate}`} - {`${project.endDate}` || 'Present'}
          </span>
        )} */}
        <h2 className='text-3xl font-semibold'>{project.title}</h2>
        <p className='text-xl text-muted-foreground'>
          {project.shortDescription}
        </p>
        {project?.skills && (
          <SkillsList skills={project?.skills} type='detail' />
        )}
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
        {project.description && (
          <p className='text-xl'>{project.description}</p>
        )}
        <div className='flex space-x-2'>
          {project.links && <LinksList links={project.links} />}
        </div>
      </div>
    </>
  );
}
