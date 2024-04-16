'use client';

import { projectsListState } from '@/store/projects-store';
import { ProjectSchema } from '@/types/project-schema';
import { clientGetProjects } from '@/utils/client-utils';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import ProjectTable from './project-table.component';

type ProjectsListAdminProps = {
  type: 'project' | 'work';
};

export default function ProjectsListAdmin({ type }: ProjectsListAdminProps) {
  const [projects, setProjects] =
    useRecoilState<ProjectSchema[]>(projectsListState);

  useEffect(() => {
    setProjects([]);
    clientGetProjects(
      setProjects,
      {
        fieldPath: 'createdAt',
        directionStr: 'desc',
      },
      {
        fieldPath: 'type',
        opStr: '==',
        value: type,
      }
    );
  }, [setProjects]);

  return (
    <>
      {/* <FilterSection /> */}
      <ProjectTable />
    </>
  );
}
