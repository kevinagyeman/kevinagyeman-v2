'use client';

import ProjectsInfo from '@/components/project/projects-info.component';

type ProjectProps = {
  params: {
    id: string;
  };
};

export default function Project({ params }: ProjectProps) {
  if (params.id) {
    return (
      <>
        <ProjectsInfo projectId={params.id} />
      </>
    );
  }
}
