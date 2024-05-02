'use client';

import InformationElement from '@/components/information/information-element.component';
import ProjectsListAdmin from '@/components/project/projects-list-admin.component';
import ResumeCV from '@/components/resume-cv.component';
import { ReactElement } from 'react';
import { RecoilRoot } from 'recoil';

export default function Dashboard(): ReactElement {
  return (
    <RecoilRoot>
      <div className='lg:grid lg:grid-cols-4 gap-5'>
        <div>
          <InformationElement />
        </div>
        <div>
          <ProjectsListAdmin type={'work'} />
        </div>
        <div>
          <ResumeCV />
        </div>
      </div>
    </RecoilRoot>
  );
}
