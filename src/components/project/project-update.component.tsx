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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from '../ui/sheet';
import { Trash, X } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

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
    setOpen(false);
    setProject(initProjectData);
  };

  const deleteProject = async () => {
    await projectService.delete(projectId);
    setProjects((prev: ProjectSchema[]) => {
      return prev.filter((project: ProjectSchema) => project.id !== projectId);
    });
    closeSheet();
  };

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <Button onClick={() => initializeProject()} variant={'ghost'}>
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
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant='ghost' size={'icon'}>
                    <Trash className='w-4 h-4' color='tomato' />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-full'>
                  <Button
                    onClick={() => deleteProject()}
                    variant={'destructive'}
                  >
                    Delete
                  </Button>
                </PopoverContent>
              </Popover>
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
