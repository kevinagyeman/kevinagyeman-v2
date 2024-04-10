'use client';

import {
  initProjectData,
  projectDataState,
  projectsListState,
} from '@/store/projects-store';
import { ProjectSchema } from '@/types/project-schema';
import { clientGetSingleProject } from '@/utils/client-utils';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { projectService } from '../../services/project.service';
import { Button } from '../ui/button';

type DeleteModalProps = {
  projectId: string;
};

export default function DeleteModal({ projectId }: DeleteModalProps) {
  const [projects, setProjects] =
    useRecoilState<ProjectSchema[]>(projectsListState);
  const [project, setProject] = useRecoilState<ProjectSchema>(projectDataState);

  const deleteProject = async () => {
    await projectService.delete(projectId);
    setProjects((prev: ProjectSchema[]) => {
      return prev.filter((project: ProjectSchema) => project.id !== projectId);
    });
    setProject(initProjectData);
  };

  useEffect(() => {
    clientGetSingleProject(projectId, setProject);
  }, [setProject, projectId]);

  return (
    <div>
      <small>{projectId}</small>
      <h1>{project.title}</h1>
      <p>Are you sure?</p>
      <Button onClick={() => deleteProject()}>Delete</Button>
    </div>
  );
}
