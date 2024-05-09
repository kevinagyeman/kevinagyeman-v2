'use client';

import { ProjectSchema } from '@/types/project-schema';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import LinksList from '../links-list';
import BreadcrumbMenu from '../breadcrumb-menu.component';
import DisplayCompanyDate from '../display-company-date.component';
import EditAsAdmin from '../edit-as-admin.component';
import SkillsList from '../skills-list.component';
import ShortDescription from '../short-description.component';
import Description from '../description.component';

type ProjectInfoProps = {
  project: ProjectSchema;
};

export default function ProjectsInfo({ project }: ProjectInfoProps) {
  const t = useTranslations('project');

  return (
    <>
      <BreadcrumbMenu pageName={project.title || ''} />
      <div className='lg:flex gap-10'>
        <div className='lg:w-2/5 flex-col flex gap-y-8  pb-8'>
          <EditAsAdmin
            href={'/admin/dashboard/project-edit?id=' + project.id}
          />
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
        </div>
        <div className='flex flex-col space-y-8 lg:w-3/5 pb-8'>
          <h2 className='text-5xl font-semibold'>{project.title}</h2>
          <DisplayCompanyDate
            startDate={project.startDate}
            endDate={project.endDate}
            company={project.company}
            isPresentDate={project.isPresentDate}
          />
          <ShortDescription string={project.shortDescription} />
          <Description string={project.description} />
        </div>
        <div className='lg:w-1/5 flex flex-col gap-y-10'>
          <SkillsList skills={project.skills} type='detail' />
          <LinksList links={project.links} />
        </div>
      </div>
    </>
  );
}
