'use client';

import InformationElement from '@/components/information/information-element.component';
import ProjectAdd from '@/components/project/project-add.component';
import ProjectsListAdmin from '@/components/project/projects-list-admin.component';
import ResumeCV from '@/components/resume-cv.component';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { informationDataState } from '@/store/information-store';
import { projectsListState } from '@/store/projects-store';
import { InformationSchema } from '@/types/information-schema';
import { ProjectSchema } from '@/types/project-schema';
import { clientGetInformation, clientGetProjects } from '@/utils/client-utils';
import { ReactElement, useEffect } from 'react';
import { RecoilRoot, useRecoilState } from 'recoil';

export default function Dashboard(): ReactElement {
  return (
    <RecoilRoot>
      <Accordion type='single' className='w-full' collapsible>
        <AccordionProjects />
        <AccordionInformation />
        <AccordionResumeCV />
      </Accordion>
    </RecoilRoot>
  );
}

const AccordionInformation = (): ReactElement => {
  const [information, setInformation] =
    useRecoilState<InformationSchema>(informationDataState);

  useEffect(() => {
    clientGetInformation(setInformation);
  }, [setInformation]);

  return (
    <>
      <AccordionItem value='information'>
        <AccordionTrigger className='text-3xl hover:no-underline font-bold'>
          Information
        </AccordionTrigger>
        <AccordionContent>
          <InformationElement />
        </AccordionContent>
      </AccordionItem>
    </>
  );
};

const AccordionProjects = (): ReactElement => {
  const [projects, setProjects] =
    useRecoilState<ProjectSchema[]>(projectsListState);

  useEffect(() => {
    clientGetProjects(setProjects, {
      fieldPath: 'createdAt',
      directionStr: 'desc',
    });
  }, [setProjects]);

  return (
    <AccordionItem value='projects'>
      <AccordionTrigger className='text-3xl hover:no-underline font-bold'>
        Projects
      </AccordionTrigger>
      <AccordionContent>
        <ProjectAdd />
        <ProjectsListAdmin />
      </AccordionContent>
    </AccordionItem>
  );
};

const AccordionResumeCV = (): ReactElement => {
  return (
    <AccordionItem value='resume'>
      <AccordionTrigger className='text-3xl hover:no-underline font-bold'>
        CV Resume
      </AccordionTrigger>
      <AccordionContent>
        <ResumeCV />
      </AccordionContent>
    </AccordionItem>
  );
};
