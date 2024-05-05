'use client';

import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Trash } from 'lucide-react';
import { projectService } from '@/services/project.service';
import { ProjectSchema } from '@/types/project-schema';
import { useRecoilState } from 'recoil';
import { projectsListState } from '@/store/projects-store';
import { useRouter } from 'next/navigation';

type ProjectDeleteProps = {
  projectId: string;
};

export default function ProjectDelete({ projectId }: ProjectDeleteProps) {
  const [projects, setProjects] =
    useRecoilState<ProjectSchema[]>(projectsListState);
  const router = useRouter();

  const deleteProject = async () => {
    await projectService.delete(projectId);
    setProjects((prev: ProjectSchema[]) => {
      return prev.filter((project: ProjectSchema) => project.id !== projectId);
    });
    router.back();
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='ghost' size={'icon'}>
          <Trash className='w-4 h-4' color='tomato' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-full'>
        <Button onClick={() => deleteProject()} variant={'destructive'}>
          Delete
        </Button>
      </PopoverContent>
    </Popover>
  );
}
function setProjects(arg0: (prev: ProjectSchema[]) => ProjectSchema[]) {
  throw new Error('Function not implemented.');
}
