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
import { X } from 'lucide-react';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import Dates from '../dates.component';
import FileDisplay from '../file-display.component';
import FunctionFeedback from '../function-feedback.component';
import SubmitButton from '../submit-button.component';
import { Button } from '../ui/button';
import { Sheet, SheetContent } from '../ui/sheet';
import Upload from '../upload.component';
import ProjectDelete from './project-delete.component';
import ProjectForm from './project-form.component';
import ProjectSkills from '../skills-input';
import SkillsInput from '../skills-input';

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
  const [open, setOpen] = useState<boolean>(false);

  const updateProject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await projectService.update(projectId, project);
    setIsInputDisabled(true);
    closeSheet();
  };

  const uploadImage = async () => {
    const newUrl = await clientUpload(img, `projects/${projectId}`);
    setProject({ ...project, imageLink: newUrl });
    setIsUploaded(true);
    return true;
  };

  const initializeProject = async () => {
    await clientGetSingleProject(projectId, setProject);
    setImg(project.imageLink);
    setOpen(true);
  };

  const closeSheet = () => {
    setIsInputDisabled(true);
    setOpen(false);
    setProject(initProjectData);
  };

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <Button
          onClick={() => initializeProject()}
          variant={'outline'}
          size={'sm'}
        >
          Edit
        </Button>
        <SheetContent
          onInteractOutside={(e) => e.preventDefault()}
          className='flex flex-col'
        >
          <div className='flex flex-row items-center py-2 border-b'>
            <div>
              <small className='text-secondary'>{project.id}</small>
              <h1>{project.title}</h1>
            </div>
            <div className='ml-auto flex flex-row items-center'>
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
              <ProjectDelete
                closingFunction={closeSheet}
                projectId={projectId}
              />
              <Button
                onClick={() => closeSheet()}
                size={'icon'}
                variant={'ghost'}
              >
                <X className='w-5 h-5' />
              </Button>
            </div>
          </div>
          <div className='overflow-y-auto'>
            <SkillsInput isInputDisabled={isInputDisabled} />
            <Dates
              updatedAt={project.updatedAt}
              createdAt={project.createdAt}
            />
            <div className='flex flex-col gap-y-3 mb-5'>
              <FileDisplay fileUrl={project.imageLink} />
              <Upload
                label={'Upload an image'}
                isInputDisabled={isInputDisabled}
                uploadFunction={uploadImage}
                setFile={(e: any) =>
                  setImg(e.target.files && e.target.files[0])
                }
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
          </div>
          <div>
            <SubmitButton title={'Update'} isInputDisabled={isInputDisabled} />
            {/* <FunctionFeedback hasBeenSuccessful={isUpdated} /> */}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
