'use client';

import { projectService } from '@/services/project.service';
import {
  initProjectData,
  projectDataState,
  projectsListState,
} from '@/store/projects-store';
import { ProjectSchema } from '@/types/project-schema';
import {
  clientEditButton,
  clientGetSingleProject,
  clientUpload,
} from '@/utils/client-utils';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import Dates from '../dates.component';
import FileDisplay from '../file-display.component';
import FunctionFeedback from '../function-feedback.component';
import SubmitButton from '../submit-button.component';
import { Button } from '../ui/button';
import Upload from '../upload.component';
import ProjectForm from './project-form.component';

type ProjectUpdateProps = {
  projectId: string;
};

export default function ProjectUpdate({ projectId }: ProjectUpdateProps) {
  const [project, setProject] = useRecoilState<ProjectSchema>(projectDataState);
  const [projects, setProjects] =
    useRecoilState<ProjectSchema[]>(projectsListState);
  const [isInputDisabled, setIsInputDisabled] = useState<boolean>(true);
  const [img, setImg] = useState<any>();
  const [isUploaded, setIsUploaded] = useState<boolean>(false);
  const [isUpdated, setIsUpdated] = useState<boolean>(false);

  const updateProject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await projectService.update(projectId, project);
    setIsInputDisabled(true);
    setIsUpdated(true);
  };

  const deleteProject = async () => {
    await projectService.delete(projectId);
    setProjects((prev: ProjectSchema[]) => {
      return prev.filter((project: ProjectSchema) => project.id !== projectId);
    });
    setProject(initProjectData);
  };

  const uploadImage = async () => {
    const newUrl = await clientUpload(img, `projects/${projectId}`);
    setProject({ ...project, imageLink: newUrl });
    setIsUploaded(true);
  };

  useEffect(() => {
    setImg(project.imageLink);
    clientGetSingleProject(projectId, setProject);
  }, [project.imageLink, projectId, setProject]);

  return (
    <>
      <Dates updatedAt={project.updatedAt} createdAt={project.createdAt} />
      <div className='my-8 flex flex-row gap-x-3'>
        <Button
          variant='secondary'
          onClick={() =>
            clientEditButton(
              isInputDisabled,
              setIsInputDisabled,
              projectId,
              setProject
            )
          }
        >
          {isInputDisabled ? 'Edit' : 'Undo'}
        </Button>
        <Button
          onClick={() => deleteProject()}
          variant={'destructive'}
          className='ml-auto'
        >
          Delete
        </Button>
      </div>
      <div className='flex flex-col gap-y-3 mb-5'>
        <FileDisplay fileUrl={project.imageLink} />
        <Upload
          label={'Upload an image'}
          isInputDisabled={isInputDisabled}
          uploadFunction={uploadImage}
          setFile={(e: any) => setImg(e.target.files && e.target.files[0])}
          fileAccepted={'image/png,image/jpeg'}
        />
        <FunctionFeedback hasBeenSuccessful={isUploaded} />
      </div>
      <ProjectForm
        isDisabled={isInputDisabled}
        projectSetter={setProject}
        submitFunction={updateProject}
        project={project}
      />
      <SubmitButton title={'Update'} isInputDisabled={isInputDisabled} />
      <FunctionFeedback hasBeenSuccessful={isUpdated} />
    </>
  );
}
