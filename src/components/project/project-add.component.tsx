'use client';

import { initProjectData, projectDataState } from '@/store/projects-store';
import { ReactElement, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { projectService } from '../../services/project.service';
import { ProjectSchema } from '../../types/project-schema';
import SubmitButton from '../submit-button.component';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import ProjectForm from './project-form.component';
import FunctionFeedback from '../function-feedback.component';

export default function ProjectAdd(): ReactElement {
  const [project, setProject] = useRecoilState<ProjectSchema>(projectDataState);
  const [isCreatd, setIsCreated] = useState<boolean>(false);

  const addProject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await projectService.create(project);
    setProject(initProjectData);
    setIsCreated(true);
  };

  return (
    <Accordion type='single' className='w-full' collapsible>
      <AccordionItem value={'project-add'}>
        <AccordionTrigger className='hover:no-underline'>
          Add New Project
        </AccordionTrigger>
        <AccordionContent>
          <ProjectForm
            isDisabled={false}
            projectSetter={setProject}
            submitFunction={addProject}
            project={project}
          />
          <SubmitButton title={'Create new Project'} isInputDisabled={false} />
          <FunctionFeedback hasBeenSuccessful={isCreatd} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
