'use client';

import InformationElement from '@/components/information/information-element.component';
import ProjectsListAdmin from '@/components/project/projects-list-admin.component';
import { ReactElement } from 'react';
import { RecoilRoot } from 'recoil';
import ProjectAdd from '@/components/project/project-add.component';
import InformationUpdate from '@/components/information/information-update.component';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import Divider from '@/components/ui/divider';

export default function Dashboard(): ReactElement {
  return (
    <RecoilRoot>
      <Accordion
        type='multiple'
        className='w-full'
        defaultValue={['projects', 'information']}
      >
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
      </Accordion>
    </RecoilRoot>
  );
}
