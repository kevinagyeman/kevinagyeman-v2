'use client';

import {
  initProjectData,
  projectDataState,
  projectsListState,
} from '@/store/projects-store';
import { ProjectSchema } from '@/types/project-schema';
import { Trash } from 'lucide-react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { projectService } from '../../services/project.service';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog';
import { Button } from '../ui/button';
import { useEffect } from 'react';
import { clientGetSingleProject } from '@/utils/client-utils';

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
    console.log('crea delete');

    clientGetSingleProject(projectId, setProject);
  }, [projectId]);

  return (
    <div>
      {projectId}
      {project.title}
      <Button onClick={() => deleteProject()}>cancella</Button>
    </div>
  );
}
