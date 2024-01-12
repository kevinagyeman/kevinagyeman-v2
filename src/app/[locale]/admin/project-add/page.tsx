'use client';
import ProjectsAdd from '@/components/project/projects-add.component';
import { RecoilRoot } from 'recoil';

export default function ProjectAdd() {
  return (
    <>
      <h2 className='mb-5 text-3xl font-semibold'>Add New Project</h2>
      <RecoilRoot>
        <ProjectsAdd />
      </RecoilRoot>
    </>
  );
}
