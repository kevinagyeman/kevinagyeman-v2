import { projectsListState } from '@/store/projects-store';
import ProjectFilter from './project-filter.component';
import { useRecoilState } from 'recoil';
import { ProjectSchema } from '@/types/project-schema';
import { FilterX } from 'lucide-react';
import { clientGetProjects } from '@/utils/client-utils';
import { Button } from '../ui/button';

export default function FilterSection() {
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
          Reset Filters <FilterX className='ml-2 h-4 w-4' />
        </Button>
      </div>
    </>
  );
}
