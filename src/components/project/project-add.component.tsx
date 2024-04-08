'use client';

import { initProjectData, projectDataState } from '@/store/projects-store';
import { ReactElement, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { projectService } from '../../services/project.service';
import { ProjectSchema } from '../../types/project-schema';
import CustomModalDialog from '../custom-modal-dialog.component';
import { Button } from '../ui/button';
import ProjectForm from './project-form.component';

export default function ProjectAdd(): ReactElement {
  const [project, setProject] = useRecoilState<ProjectSchema>(projectDataState);

  const addProject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await projectService.create(project);
    setProject(initProjectData);
  };

  return (
    <CustomModalDialog
      dialogTrigger={<Button size={'lg'}>Add New Project</Button>}
    >
      <div className='my-8 flex flex-row gap-x-3'>
        <Button type='submit' form='form'>
          Create
        </Button>
      </div>
      <ProjectForm
        isDisabled={false}
        projectSetter={setProject}
        submitFunction={addProject}
        project={project}
      />
      <Button type='submit' className='mt-3 w-full' form='form'>
        Create
      </Button>
    </CustomModalDialog>
  );
}
