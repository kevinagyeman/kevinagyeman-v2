'use client';

import { projectsListState } from '@/store/projects-store';
import { clientGetProjects } from '@/utils/client-utils';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { ProjectSchema } from '../../types/project-schema';
import FilterSection from './project-filter-section';
import ProjectTable from './project-table.component';

export default function ProjectsListAdmin() {
  const [projects, setProjects] =
    useRecoilState<ProjectSchema[]>(projectsListState);

  useEffect(() => {
    clientGetProjects(setProjects, {
      fieldPath: 'createdAt',
      directionStr: 'desc',
    });
  }, [setProjects]);

  return (
    <>
      <FilterSection />
      <ProjectTable />
    </>
  );
}
