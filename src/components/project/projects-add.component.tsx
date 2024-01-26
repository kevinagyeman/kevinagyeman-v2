'use client';
import { projectDataState } from '@/store/projects-store';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';
import { projectService } from '../../services/project.service';
import { ProjectSchema } from '../../types/project-schema';
import { Button } from '../ui/button';
import ProjectForm from './project-form.component';

export default function ProjectsAdd() {
  const [project, setProject] = useRecoilState<ProjectSchema>(projectDataState);
  const router = useRouter();

  const addProject = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      await projectService.create(project);
      router.push('/admin/dashboard');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className='my-8 flex flex-row gap-x-3'>
        <Button type='submit' form='form'>
          Create
        </Button>
        <Button
          variant='outline'
          size={'icon'}
          className='ml-auto w-[50px]'
          asChild
        >
          <Link href='/admin/dashboard'>
            <ArrowLeft className='h-4 w-4' />
          </Link>
        </Button>
      </div>
      <ProjectForm
        isDisabled={false}
        projectSetter={setProject}
        submitFunction={addProject}
        project={project}
      />
      <Button type='submit' className='mt-3 w-full' form='form'>
        Create
      </Button>
    </>
  );
}
