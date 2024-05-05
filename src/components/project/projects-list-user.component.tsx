'use client';

import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '../../../navigation';
import { ProjectSchema } from '../../types/project-schema';
import SkillsList from '../skills-list.component';
import { Button } from '../ui/button';
import EditAsAdmin from '../edit-as-admin.component';
import TitleSection from '../title-section';

type ProjectsListUserProps = {
  projects: ProjectSchema[];
};
export default function ProjectsListUser({ projects }: ProjectsListUserProps) {
  const t = useTranslations('index');

  return (
    <div className='py-5 max-w-5xl m-auto'>
      <TitleSection
        title={t('projects.title')}
        subtitle={t('projects.description')}
      />
      <div className='lg:grid lg:grid-cols-3 gap-3 flex flex-col'>
        {projects?.map((project: ProjectSchema, index: number) => (
          <div key={index} className='rounded-xl overflow-hidden border '>
            <div>
              {project.imageLink && (
                <Image
                  src={project.imageLink}
                  alt={`${project.title} image`}
                  width='0'
                  height='0'
                  sizes='100vw'
                  className='w-full h-auto object-cover'
                  style={{ aspectRatio: '4/3' }}
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
                <Button asChild>
                  <Link
                    href={`/project/${project.id}`}
                    rel='canonical'
                    prefetch={true}
                  >
                    Read More
                    <ArrowRight className='w-5 h-5 ml-1' />
                  </Link>
                </Button>
                <EditAsAdmin
                  href={'/admin/dashboard/project-edit?id=' + project.id}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
