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
import Divider from '@/components/ui/divider';
import { ReactElement } from 'react';
import { RecoilRoot } from 'recoil';

export default function Dashboard(): ReactElement {
  return (
    <RecoilRoot>
      <Accordion type='single' className='w-full' collapsible>
        <AccordionItem value='projects'>
          <AccordionTrigger className='text-3xl hover:no-underline font-bold'>
            Projects
          </AccordionTrigger>
          <AccordionContent>
            <Divider title={'Projects'} />
            <ProjectAdd />
            <ProjectsListAdmin />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='information'>
          <AccordionTrigger className='text-3xl hover:no-underline font-bold'>
            Information
          </AccordionTrigger>
          <AccordionContent>
            <Divider title={'Information'} />
            <InformationElement />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='resume'>
          <AccordionTrigger className='text-3xl hover:no-underline font-bold'>
            CV Resume
          </AccordionTrigger>
          <AccordionContent>
            <Divider title={'My resume'} />
            <ResumeCV />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </RecoilRoot>
  );
}
