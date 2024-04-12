import { projectsListState } from '@/store/projects-store';
import { ProjectSchema } from '@/types/project-schema';
import { useRecoilState } from 'recoil';
import ProjectUpdate from './project-update.component';

export default function ProjectTable() {
  const [projects, setProjects] =
    useRecoilState<ProjectSchema[]>(projectsListState);

  return (
    <div className='divide-y'>
      {projects?.map((project: ProjectSchema, index: number) => (
        <div key={index} className='flex flex-row items-center py-3'>
          <div className='text-left'>
            <div className='flex flex-col'>
              <small className='text-secondary'>
                {project.isPublished ? (
                  <span className='text-emerald-500'>Published</span>
                ) : (
                  <span className='text-amber-300'>Draft</span>
                )}{' '}
                | {project.id}
              </small>
              <h1 className='text-lg'>{project.title}</h1>
            </div>
          </div>
          <div className='ml-auto'>
            <ProjectUpdate projectId={project.id} />
          </div>
        </div>
      ))}
    </div>
  );
}
