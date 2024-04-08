'use client';

import { projectsListState } from '@/store/projects-store';
import { FilterX } from 'lucide-react';
import { useEffect } from 'react';

import { clientGetProjects } from '@/utils/client-utils';
import { useRecoilState } from 'recoil';
import { ProjectSchema } from '../../types/project-schema';
import { Button } from '../ui/button';
import ProjectFilter from './project-filter.component';
import ProjectTable from './project-table.component';

export default function ProjectsListAdmin() {
  const [projects, setProjects] =
    useRecoilState<ProjectSchema[]>(projectsListState);

  useEffect(() => {
    clientGetProjects(setProjects, {
      fieldPath: 'createdAt',
      directionStr: 'desc',
    });
  }, [projects]);

  return (
    <>
      <FilterSection />
      <ProjectTable />
    </>
  );
}

const FilterSection = () => {
  const [projects, setProjects] =
    useRecoilState<ProjectSchema[]>(projectsListState);

  return (
    <>
      <div className='flex flex-wrap gap-2 my-5'>
        <ProjectFilter
          buttonLabel={'Title'}
          orderBy={{ fieldPath: 'title' }}
          projectsSetter={setProjects}
          descLabel='Dalla Z alla A'
          ascLabel='Dalla A alla Z'
          isConditional={true}
        />
        <ProjectFilter
          buttonLabel={'Title'}
          orderBy={{ fieldPath: 'title' }}
          projectsSetter={setProjects}
          descLabel='Dalla Z alla A'
          ascLabel='Dalla A alla Z'
          isConditional={false}
        />
        <ProjectFilter
          buttonLabel={'Updated At'}
          orderBy={{ fieldPath: 'updatedAt' }}
          projectsSetter={setProjects}
          isConditional={false}
        />
        <ProjectFilter
          buttonLabel={'Created At'}
          orderBy={{ fieldPath: 'createdAt' }}
          projectsSetter={setProjects}
          isConditional={false}
        />
        <Button
          variant='outline'
          size={'sm'}
          onClick={() =>
            clientGetProjects(setProjects, {
              fieldPath: 'createdAt',
              directionStr: 'desc',
            })
          }
        >
          Reset filtri <FilterX className='ml-2 h-4 w-4' />
        </Button>
      </div>
    </>
  );
};
