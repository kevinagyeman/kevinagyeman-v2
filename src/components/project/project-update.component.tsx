'use client';

import { projectService } from '@/services/project.service';
import { projectDataState } from '@/store/projects-store';
import { ProjectSchema } from '@/types/project-schema';
import {
  clientGetSingleProject,
  clientUploadImage,
} from '@/utils/client-utils';
import { Timestamp } from 'firebase/firestore';
import Image from 'next/image';
import React, { ReactElement, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import ProjectForm from './project-form.component';

type ProjectId = {
  projectId: any;
};

export default function ProjectUpdate({ projectId }: ProjectId) {
  const [project, setProject] = useRecoilState<ProjectSchema>(projectDataState);
  const [isInputDisabled, setIsInputDisabled] = useState<boolean>(true);
  const [img, setImg] = useState<any>();
  const [isUploaded, setIsUploaded] = useState<boolean>(false);

  const updateProject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await projectService.update(projectId, project);
    setIsInputDisabled(true);
  };

  const editProjectButton = () => {
    if (isInputDisabled) {
      setIsInputDisabled(false);
    } else {
      clientGetSingleProject(projectId, setProject);
      setIsInputDisabled(true);
    }
  };

  const uploadImage = async () => {
    const newUrl = await clientUploadImage(img, `projects/${projectId}`);
    setProject({ ...project, imageLink: newUrl });
    setIsUploaded(true);
  };

  const formatDate = (date: Timestamp | undefined): string | undefined => {
    if (date) {
      const dateFormatted = new Date(date.seconds * 1000).toLocaleString([], {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
      return dateFormatted;
    }
  };

  useEffect(() => {
    setImg(project.imageLink);
    clientGetSingleProject(projectId, setProject);
  }, [project.imageLink, projectId, setProject]);

  return (
    <>
      <div className='flex flex-col'>
        <small className='text-secondary'>
          Updated At: {formatDate(project.updatedAt)}
        </small>
        <small className='text-secondary'>
          Created At: {formatDate(project.createdAt)}
        </small>
      </div>
      <div className='my-8 flex flex-row gap-x-3'>
        <Button variant='secondary' onClick={() => editProjectButton()}>
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
        ></Button>
      </div>
      <div className='flex flex-col gap-y-3 mb-5'>
        <div>
          {project.imageLink ? (
            <Image
              src={project.imageLink}
              alt='profile'
              width='0'
              height='0'
              sizes='100vw'
              style={{ width: '100%', height: 'auto' }}
              className='rounded-lg'
            />
          ) : (
            <ImageMissing />
          )}
        </div>
        <Label>Upload an image</Label>
        <div>
          <Input
            placeholder='Choose image'
            accept='image/png,image/jpeg'
            type='file'
            onChange={(e) => {
              setImg(e.target.files && e.target.files[0]);
            }}
            disabled={isInputDisabled}
          />
        </div>
        <div>
          <Button
            onClick={() => uploadImage()}
            disabled={isInputDisabled}
            variant={'secondary'}
          >
            Upload File
          </Button>
        </div>
        <div>
          {isUploaded ? (
            <small className='text-emerald-500'>Uploaded Succesfully</small>
          ) : (
            <small className='text-amber-300'>Not uploaded</small>
          )}
        </div>
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
  );
}

const ImageMissing = (): ReactElement => {
  return (
    <div className='h-[300px] border rounded-lg justify-center items-center flex mb-2'>
      <h1 className='text-lg'>Image missing</h1>
    </div>
  );
};
