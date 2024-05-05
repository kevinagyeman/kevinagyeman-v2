'use client';

import { projectService } from '@/services/project.service';
import { projectDataState } from '@/store/projects-store';
import { ProjectSchema } from '@/types/project-schema';
import { clientGetSingleProject } from '@/utils/client-utils';
import { ArrowLeft } from 'lucide-react';
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import ProjectDelete from '@/components/project/project-delete.component';
import ProjectForm from '@/components/project/project-form.component';
import SubmitButton from '@/components/submit-button.component';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type ProjectEditProps = {
  projectId: string;
};

export default function ProjectEdit({ projectId }: ProjectEditProps) {
  const [project, setProject] = useRecoilState<ProjectSchema>(projectDataState);
  const router = useRouter();

  const updateProject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await projectService.update(projectId, project);
    router.back();
  };

  const initializeProject = async () => {
    await clientGetSingleProject(projectId, setProject);
  };

  useEffect(() => {
    initializeProject();
  }, [projectId]);

  return (
    <div className='flex flex-col gap-5'>
      <div className='flex flex-row items-center'>
        <div>
          <small className='text-muted-foreground'>{project.id}</small>
          <h1 className='text-xl'>{project.title}</h1>
        </div>
        <div className='ml-auto flex flex-row items-center gap-3'>
          <ProjectDelete projectId={projectId} />
          <Button asChild size={'icon'} variant={'secondary'}>
            <Link href={'/admin/dashboard'}>
              <ArrowLeft className={'w-5 h-5'} />
            </Link>
          </Button>
        </div>
      </div>
      <div>
        <ProjectForm submitFunction={updateProject} />
      </div>
      <div className='sticky bottom-0 py-5 bg-background border-t'>
        <small className='text-muted-foreground'>{project.title}</small>
        <div className='flex gap-x-2 items-center'>
          <div className='grow'>
            <SubmitButton title={'Update project'} />
          </div>
          <div>
            <Button asChild size={'icon'} variant={'secondary'}>
              <Link href={'/admin/dashboard'}>
                <ArrowLeft className={'w-5 h-5'} />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
