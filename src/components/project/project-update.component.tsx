'use client';

import { projectService } from '@/services/project.service';
import { initProjectData, projectDataState } from '@/store/projects-store';
import { ProjectSchema } from '@/types/project-schema';
import { clientGetSingleProject } from '@/utils/client-utils';
import { X } from 'lucide-react';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import SubmitButton from '../submit-button.component';
import { Button } from '../ui/button';
import { Sheet, SheetContent } from '../ui/sheet';
import ProjectDelete from './project-delete.component';
import ProjectForm from './project-form.component';

type ProjectUpdateProps = {
  projectId: string;
};

export default function ProjectUpdate({ projectId }: ProjectUpdateProps) {
  const [project, setProject] = useRecoilState<ProjectSchema>(projectDataState);
  const [open, setOpen] = useState<boolean>(false);

  const updateProject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await projectService.update(projectId, project);
    closeSheet();
  };

  const initializeProject = async () => {
    await clientGetSingleProject(projectId, setProject);
    setOpen(true);
  };

  const closeSheet = () => {
    setOpen(false);
    setProject(initProjectData);
  };

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <Button
          onClick={() => initializeProject()}
          variant={'outline'}
          size={'sm'}
        >
          Edit
        </Button>
        <SheetContent
          onInteractOutside={(e) => e.preventDefault()}
          className='flex flex-col'
        >
          <div className='flex flex-row items-center py-2 border-b'>
            <div>
              <small className='text-secondary'>{project.id}</small>
              <h1>{project.title}</h1>
            </div>
            <div className='ml-auto flex flex-row items-center'>
              <ProjectDelete projectId={projectId} />
              <Button
                onClick={() => closeSheet()}
                size={'icon'}
                variant={'ghost'}
              >
                <X className='w-5 h-5' />
              </Button>
            </div>
          </div>
          <div className='overflow-y-auto'>
            <ProjectForm submitFunction={updateProject} />
          </div>
          <div>
            <SubmitButton title={'Update'} />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
