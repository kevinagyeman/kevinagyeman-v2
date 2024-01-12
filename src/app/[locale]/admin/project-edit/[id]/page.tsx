'use client';

import ProjectsUpdate from '@/components/project/projects-update.component';
import { RecoilRoot } from 'recoil';

type ProjectProps = {
  params: {
    id: string;
  };
};

const ProjectEdit = ({ params }: ProjectProps) => {
  if (params.id) {
    return (
      <>
        <h2 className='mb-5 text-3xl font-semibold'>Edit Project</h2>
        <RecoilRoot>
          <ProjectsUpdate projectId={params.id} />
        </RecoilRoot>
      </>
    );
  }
};

export default ProjectEdit;
