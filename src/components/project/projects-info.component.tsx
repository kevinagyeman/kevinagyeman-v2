import { Button } from '@/components/ui/button';
import { getSingleProject } from '@/utils/utils';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ReactElement, useState } from 'react';
import SkeletonLoader from '../skeleton.component';
import SkillsList from '../skills-list.component';
import ProjectNotFound from './project-not-found.component';

type ProjectInfoProps = {
  projectId: string;
};

export default async function ProjectsInfo({ projectId }: ProjectInfoProps) {
  const project: any = await getSingleProject(projectId);
  // const { t } = useTranslation();
  // const [projectAlert, setProjectAlert] = useState<ReactElement>(
  //   <SkeletonLoader />
  // );

  const projectDelayFetch = () => {
    setTimeout(() => {
      return <ProjectNotFound />;
    }, 2000);
  };

  projectDelayFetch();

  return (
    <>
      {!project.id ? (
        <SkeletonLoader />
      ) : (
        <>
          <div className='flex flex-col space-y-8'>
            <h2 className='text-3xl font-semibold'>{project.title}</h2>
            <p className='text-xl text-muted-foreground'>
              {/* {splitByLanguage(`${project.shortDescription}`)} */}
            </p>
            {project.imageLink && (
              <Image
                src={project.imageLink}
                className='w-full'
                alt='project image'
              />
            )}
            {project.description && (
              <p className='text-xl'>
                {/* {splitByLanguage(`${project.description}`)} */}
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
                    {/* {t('hero.readMoreButton')}{' '} */}
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
        </>
      )}
    </>
  );
}
