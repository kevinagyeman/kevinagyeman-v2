'use client';

import InformationElement from '@/components/information/information-element.component';
import ProjectsListAdmin from '@/components/project/projects-list-admin.component';
import ResumeCV from '@/components/resume-cv.component';
import { ReactElement } from 'react';
import { RecoilRoot } from 'recoil';

export default function Dashboard(): ReactElement {
  return (
    <RecoilRoot>
      <div className='lg:flex gap-10'>
        <div className='lg:w-2/3'>
          <div className='lg:border lg:p-6 p-0 border-0 lg:rounded-lg'>
            <h1 className='text-2xl font-semibold mb-5'>Projects</h1>
            <ProjectsListAdmin type={'project'} />
          </div>
        </div>
        <div className='lg:w-1/3'>
          <div className='border p-6 rounded-lg mb-10 mt-10 lg:mt-0'>
            <h1 className='text-2xl font-semibold mb-5'>Upload Resume</h1>
            <ResumeCV />
          </div>
          <div className='lg:border lg:p-6 p-0 border-0 lg:rounded-lg'>
            <h1 className='text-2xl font-semibold mb-5'>Information</h1>
            <InformationElement />
          </div>
        </div>
      </div>
    </RecoilRoot>
  );
}
