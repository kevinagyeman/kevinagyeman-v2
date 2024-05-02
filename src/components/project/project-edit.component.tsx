'use client';

import { projectService } from '@/services/project.service';
import { initProjectData, projectDataState } from '@/store/projects-store';
import { ProjectSchema } from '@/types/project-schema';
import { clientGetSingleProject } from '@/utils/client-utils';
import { ArrowLeft, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { RecoilRoot, useRecoilState } from 'recoil';

import { useParams, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import ProjectForm from '@/components/project/project-form.component';
import SubmitButton from '@/components/submit-button.component';
import ProjectDelete from '@/components/project/project-delete.component';
import Link from 'next/link';

type ProjectEditProps = {
  projectId: string;
};

export default function ProjectEdit({ projectId }: ProjectEditProps) {
  const [project, setProject] = useRecoilState<ProjectSchema>(projectDataState);

  const updateProject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await projectService.update(projectId, project);
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
          <small className='text-secondary'>{project.id}</small>
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
      <div className='sticky bottom-0 py-5 dark:bg-zinc-950 bg-white border-t'>
        <small className='text-foreground'>{project.title}</small>
        <div className='flex gap-x-2 items-center'>
          <div className='grow'>
            <SubmitButton title={'Update'} />
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
