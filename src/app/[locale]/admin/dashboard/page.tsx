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

export default function Dashboard(): ReactElement {
  return (
    <RecoilRoot>
      <div className='container'>
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
              <ProjectAdd />
              <ProjectsListAdmin />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='information'>
            <AccordionTrigger className='text-3xl hover:no-underline font-bold'>
              Information
            </AccordionTrigger>
            <AccordionContent>
              <InformationElement />
              <InformationUpdate />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </RecoilRoot>
  );
}
