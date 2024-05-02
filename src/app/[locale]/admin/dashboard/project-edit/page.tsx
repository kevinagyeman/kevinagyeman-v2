'use client';

import { RecoilRoot } from 'recoil';

import ProjectEdit from '@/components/project/project-edit.component';
import { useSearchParams } from 'next/navigation';

export default function ProjectAdmin() {
  const searchParams = useSearchParams();
  const projectId = searchParams?.get('id');

  return (
    <RecoilRoot>
      {projectId && <ProjectEdit projectId={projectId} />}
    </RecoilRoot>
  );
}
