import { Button } from '@/components/ui/button';
import { ProjectSchema } from '@/types/project-schema';
import { getSingleProject, serverSplitByLanguage } from '@/utils/utils';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import { Link } from '../../../navigation';
import PageNotFound from '../page-not-found.component';
import SkillsList from '../skills-list.component';
import TranslationString from '../translation-string.component';
import { getTranslations } from 'next-intl/server';

type ProjectInfoProps = {
  projectId: string;
};

export default async function ProjectsInfo({ projectId }: ProjectInfoProps) {
  const project: ProjectSchema | undefined = await getSingleProject(projectId);
  const t = await getTranslations('project');

  if (project?.id) {
    return (
      <div className='flex flex-col space-y-8'>
        <h2 className='text-3xl font-semibold'>
          {await serverSplitByLanguage(`${project.title}`)}
        </h2>
        <p className='text-xl text-muted-foreground'>
          {await serverSplitByLanguage(`${project.shortDescription}`)}
        </p>
        {project.imageLink && (
          <Image
            src={project.imageLink}
            className='w-full'
            alt={`${project.title} image`}
            width='1080'
            height={'1080'}
          />
        )}
        {project.description && (
          <p className='text-xl'>
            {await serverSplitByLanguage(`${project.description}`)}
          </p>
        )}
        {project?.skills && <SkillsList string={`${project?.skills}`} />}
        <div className='flex space-x-2'>
          {project.link && (
            <Button
              variant={'secondary'}
              className='w-full'
              size={'lg'}
              asChild
            >
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
  } else {
    return <PageNotFound />;
  }
}
