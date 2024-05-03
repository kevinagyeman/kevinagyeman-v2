'use client';

import { ProjectSchema } from '@/types/project-schema';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import LinksList from '../LinksList.component';
import BreadcrumbMenu from '../breadcrumb-menu.component';
import SkillsList from '../skills-list.component';
import { clientFormatDateUser } from '@/utils/client-utils';
import { Button } from '../ui/button';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import DisplayCompanyDate from '../display-company-date.component';

type ProjectInfoProps = {
  project: ProjectSchema;
};

export default function ProjectsInfo({ project }: ProjectInfoProps) {
  const t = useTranslations('project');
  const { data: session, status } = useSession();
  const isAdminLogged = status === 'authenticated';

  return (
    <>
      <BreadcrumbMenu pageName={project.title || ''} />
      <div className='lg:flex gap-28'>
        <div className='lg:w-2/5 flex-col flex gap-y-8'>
          {project.imageLink && (
            <Image
              src={project.imageLink}
              alt={`${project.title} image`}
              width='0'
              height='0'
              sizes='100vw'
              className='w-full h-auto object-cover rounded-lg'
              style={{ aspectRatio: '4/3' }}
            />
          )}
          {project?.skills && (
            <SkillsList skills={project?.skills} type='detail' />
          )}
        </div>
        <div className='flex flex-col space-y-8 lg:w-3/5'>
          <h2 className='text-5xl font-semibold'>{project.title}</h2>
          <DisplayCompanyDate
            startDate={project.startDate}
            endDate={project.endDate}
            company={project.company}
            isPresentDate={project.isPresentDate}
          />
          <p className='text-xl text-muted-foreground  font-extralight'>
            {project.shortDescription}
          </p>

          {project.description && (
            <p className='text-xl font-extralight'>{project.description}</p>
          )}
          <div className='flex space-x-2'>
            {project.links && <LinksList links={project.links} />}
          </div>
          {isAdminLogged && (
            <Button asChild size={'lg'}>
              <Link href={'/admin/dashboard/project-edit?id=' + project.id}>
                Edit as admin
              </Link>
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
