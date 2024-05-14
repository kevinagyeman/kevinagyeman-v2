import { projectsListState } from '@/store/projects-store';
import { ProjectSchema } from '@/types/project-schema';
import Link from 'next/link';
import { useRecoilState } from 'recoil';
import { Button } from '../ui/button';
import { Pencil } from 'lucide-react';
import Image from 'next/image';

export default function ProjectTable() {
  const [projects, setProjects] =
    useRecoilState<ProjectSchema[]>(projectsListState);

  return (
    <div className='divide-y'>
      {projects?.map((project: ProjectSchema, index: number) => (
        <div key={index} className='flex flex-row items-center gap-x-3 py-3'>
          <div>
            {project.imageLink ? (
              <Image
                src={project.imageLink}
                alt={`${project.title} image`}
                width='0'
                height='0'
                sizes='100vw'
                className='w-[100px] h-auto object-cover rounded-lg'
                style={{ aspectRatio: '16/9' }}
              />
            ) : (
              <div
                className='w-[100px] border rounded-lg justify-center items-center flex'
                style={{ aspectRatio: '16/9' }}
              >
                <span className='text-xs'>Image missing</span>
              </div>
            )}
          </div>
          <div className='text-left'>
            {project.type === 'work' ? (
              <span className='text-cyan-500 text-xs'>{project.type}</span>
            ) : (
              <span className='text-rose-600 text-xs'>{project.type}</span>
            )}
            <div className='flex flex-col'>
              <small className='text-muted-foreground text-xs'>
                {project.isPublished ? (
                  <span className='text-emerald-500'>Published</span>
                ) : (
                  <span className='text-amber-300'>Draft</span>
                )}{' '}
                | {project.id}
              </small>
              <h1 className='text-lg line-clamp-1'>{project.title}</h1>
            </div>
          </div>
          <div className='ml-auto'>
            <Button asChild variant={'secondary'} size={'icon'}>
              <Link
                href={`/admin/dashboard/project-edit?id=${project.id}`}
                prefetch={true}
              >
                <Pencil className=' w-4 h-4' />
              </Link>
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
