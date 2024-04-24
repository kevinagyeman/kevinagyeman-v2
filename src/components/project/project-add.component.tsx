'use client';

import {
  initProjectData,
  projectDataState,
  projectsListState,
} from '@/store/projects-store';
import { X } from 'lucide-react';
import { ReactElement, useState } from 'react';
import { useRecoilState } from 'recoil';
import { projectService } from '../../services/project.service';
import { ProjectSchema } from '../../types/project-schema';
import SubmitButton from '../submit-button.component';
import { Button } from '../ui/button';
import { Sheet, SheetContent } from '../ui/sheet';
import ProjectForm from './project-form.component';
import { clientGetProjects } from '@/utils/client-utils';

export default function ProjectAdd(): ReactElement {
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
    <Sheet open={open} onOpenChange={setOpen}>
      <Button
        onClick={() => {
          setOpen(true), setProject(initProjectData);
        }}
        size={'lg'}
        className='w-full'
      >
        Add New Project
      </Button>
      <SheetContent
        onInteractOutside={(e) => e.preventDefault()}
        className='flex flex-col'
      >
        <div className='flex flex-row items-center py-2 border-b'>
          <div>
            <h1>{project.title}</h1>
          </div>
          <Button
            className='ml-auto'
            onClick={() => setOpen(false)}
            size={'icon'}
            variant={'ghost'}
          >
            <X className='w-5 h-5' />
          </Button>
        </div>
        <div className='overflow-y-auto'>
          <ProjectForm
            projectSetter={setProject}
            submitFunction={addProject}
            project={project}
          />
        </div>
        <div>
          <SubmitButton title={'Create New'} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
