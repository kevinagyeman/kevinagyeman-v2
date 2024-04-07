'use client';

import { projectService } from '@/services/project.service';
import { initProjectData, projectDataState } from '@/store/projects-store';
import { ProjectSchema } from '@/types/project-schema';
import { clientGetSingleProject } from '@/utils/client-utils';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { Button } from '../ui/button';
import ProjectForm from './project-form.component';

type ProjectId = {
  projectId: any;
};

export default function ProjectUpdate({ projectId }: ProjectId) {
  const [project, setProject] = useRecoilState<ProjectSchema>(projectDataState);
  const [isInputDisabled, setIsInputDisabled] = useState<boolean>(true);

  const updateProject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await projectService.update(projectId, project);
    setIsInputDisabled(true);
  };

  const editProjectButton = () => {
    if (isInputDisabled) {
      setIsInputDisabled(false);
    } else {
      clientGetSingleProject(projectId, setProject);
      setIsInputDisabled(true);
    }
  };

  useEffect(() => {
    clientGetSingleProject(projectId, setProject);
  }, []);

  return (
    <>
      <div className='my-8 flex flex-row gap-x-3'>
        <Button variant='secondary' onClick={() => editProjectButton()}>
          {isInputDisabled ? 'Edit' : 'Undo'}
        </Button>
        <Button type='submit' disabled={isInputDisabled} form='form'>
          Update
        </Button>
        <Button
          variant='outline'
          size={'icon'}
          className='ml-auto w-[50px]'
          asChild
        ></Button>
      </div>
      <ProjectForm
        isDisabled={isInputDisabled}
        projectSetter={setProject}
        submitFunction={updateProject}
        project={project}
      />
      <Button
        type='submit'
        className='mt-3 w-full'
        disabled={isInputDisabled}
        form='form'
      >
        Update
      </Button>
    </>
  );
}
