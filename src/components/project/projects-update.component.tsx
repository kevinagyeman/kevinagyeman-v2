'use client';
import { projectService } from '@/services/project.service';
import { initProjectData, projectDataState } from '@/store/projects-store';
import { ProjectSchema } from '@/types/project-schema';
import { getSingleProject } from '@/utils/utils';
import { ArrowLeft } from 'lucide-react';
import React, { ReactElement, useEffect, useState } from 'react';
import { SetterOrUpdater, useRecoilState } from 'recoil';
import SkeletonLoader from '../skeleton.component';
import { Button } from '../ui/button';
import ProjectForm from './project-form.component';
import ProjectNotFound from '../page-not-found.component';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type ProjectId = {
  projectId: any;
};

export default function ProjectsUpdate({ projectId }: ProjectId) {
  const [project, setProject] = useRecoilState<ProjectSchema>(projectDataState);
  const [isInputDisabled, setIsInputDisabled] = useState<boolean>(true);
  const [projectAlert, setProjectAlert] = useState<ReactElement>(
    <SkeletonLoader />
  );
  const router = useRouter();

  const projectDelayFetch = () => {
    setTimeout(() => {
      setProjectAlert(<ProjectNotFound />);
    }, 2000);
  };

  const getSingleProject = async (
    projectId: string,
    projectSetter: SetterOrUpdater<ProjectSchema>
  ) => {
    const data = await projectService.getById(projectId);
    if (data) {
      const currentProject: ProjectSchema = {
        ...data,
        id: data.id,
      };
      projectSetter(currentProject);
    }
  };
  const updateProject = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      await projectService.update(projectId, project);
      setIsInputDisabled(true);
      router.push('/admin/dashboard');
    } catch (e) {
      console.log(e);
    }
  };

  const editProjectButton = () => {
    if (isInputDisabled) {
      setIsInputDisabled(false);
    } else {
      getSingleProject(projectId, setProject);
      setIsInputDisabled(true);
    }
  };

  useEffect(() => {
    projectDelayFetch();
    getSingleProject(projectId, setProject);
    return () => {
      setProject(initProjectData);
    };
  }, []);

  return (
    <>
      {!project.id ? (
        projectAlert
      ) : (
        <>
          <div className='my-8 flex flex-row gap-x-3'>
            <Button
              variant='secondary'
              onClick={() => {
                editProjectButton();
              }}
            >
              {isInputDisabled ? 'Edit' : 'Undo'}
            </Button>
            <Button type='submit' disabled={isInputDisabled} form='form'>
              Update
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
            isDisabled={isInputDisabled}
            projectSetter={setProject}
            submitFunction={updateProject}
            project={project}
          />
          <Button
            type='submit'
            className='mt-3 w-full'
            disabled={isInputDisabled}
            form='form'
          >
            Update
          </Button>
        </>
      )}
    </>
  );
}
