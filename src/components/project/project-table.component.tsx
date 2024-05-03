import { projectsListState } from '@/store/projects-store';
import { ProjectSchema } from '@/types/project-schema';
import Link from 'next/link';
import { useRecoilState } from 'recoil';
import { Button } from '../ui/button';

export default function ProjectTable() {
  const [projects, setProjects] =
    useRecoilState<ProjectSchema[]>(projectsListState);

  return (
    <div className='divide-y'>
      {projects?.map((project: ProjectSchema, index: number) => (
        <div key={index} className='flex flex-row items-center py-3'>
          <div className='text-left'>
            <div className='flex flex-col'>
              <small className='text-muted-foreground text-xs'>
                {project.isPublished ? (
                  <span className='text-emerald-500'>Published</span>
                ) : (
                  <span className='text-amber-300'>Draft</span>
                )}{' '}
                | {project.id} |{' '}
                <span className='text-cyan-300'>{project.type}</span>
              </small>
              <h1 className='text-lg'>{project.title}</h1>
            </div>
          </div>
          <div className='ml-auto'>
            <Button asChild variant={'outline'}>
              <Link
                href={`/admin/dashboard/project-edit?id=${project.id}`}
                prefetch={true}
              >
                Edit
              </Link>
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
