'use client';

import ProjectForm from '@/components/project/project-form.component';
import SubmitButton from '@/components/submit-button.component';
import { Button } from '@/components/ui/button';
import { projectService } from '@/services/project.service';
import {
  initProjectData,
  projectDataState,
  projectsListState,
} from '@/store/projects-store';
import { ProjectSchema } from '@/types/project-schema';
import { clientGetProjects } from '@/utils/client-utils';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { RecoilRoot, useRecoilState } from 'recoil';

export default function ProjectAdd() {
  return (
    <RecoilRoot>
      <AddProject />
    </RecoilRoot>
  );
}

const AddProject = () => {
  const [projects, setProjects] =
    useRecoilState<ProjectSchema[]>(projectsListState);
  const [project, setProject] = useRecoilState<ProjectSchema>(projectDataState);
  const [open, setOpen] = useState<boolean>(false);

  const addProject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await projectService.create(project);

    clientGetProjects(setProjects, {
      fieldPath: 'createdAt',
      directionStr: 'desc',
    });
    setProject(initProjectData);
    setOpen(false);
  };

  return (
    <>
      <div className='flex flex-col gap-5'>
        <div className='flex flex-row items-center'>
          <div>
            <small className='text-secondary'>{project.id}</small>
            <h1 className='text-xl'>{project.title}</h1>
          </div>
          <div className='ml-auto flex flex-row items-center gap-3'>
            <Button asChild size={'icon'} variant={'secondary'}>
              <Link href={'/admin/dashboard'}>
                <ArrowLeft className={'w-5 h-5'} />
              </Link>
            </Button>
          </div>
        </div>
        <div>
          <ProjectForm submitFunction={addProject} />
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
    </>
  );
};
