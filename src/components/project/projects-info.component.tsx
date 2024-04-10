'use client';

import { Button } from '@/components/ui/button';
import { ProjectSchema } from '@/types/project-schema';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '../../../navigation';
import SkillsList from '../skills-list.component';

type ProjectInfoProps = {
  project: ProjectSchema;
};

export default function ProjectsInfo({ project }: ProjectInfoProps) {
  const t = useTranslations('project');

  return (
    <div className='flex flex-col space-y-8'>
      <h2 className='text-3xl font-semibold'>{project.title}</h2>
      <p className='text-xl text-muted-foreground'>
        {project.shortDescription}
      </p>
      {project.imageLink && (
        <Image
          src={project.imageLink}
          className='w-full'
          alt={`${project.title} image`}
          width='0'
          height='0'
          sizes='100vw'
          style={{ width: '100%', height: 'auto' }}
        />
      )}
      {project.description && <p className='text-xl'>{project.description}</p>}
      {project?.skills && <SkillsList string={`${project?.skills}`} />}
      <div className='flex space-x-2'>
        {project.link && (
          <Button variant={'secondary'} className='w-full' size={'lg'} asChild>
            <Link href={project.link} target='_blank'>
              {t('readMore')}
              <ArrowUpRight className='ml-2 h-5 w-5' />
            </Link>
          </Button>
        )}
        <Button variant={'outline'} size={'lg'} asChild>
          <Link href='/'>
            <ArrowLeft className='h-5 w-5' />
          </Link>
        </Button>
      </div>
    </div>
  );
}
