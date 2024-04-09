'use client';

import { storage } from '@/firebase';
import { projectService } from '@/services/project.service';
import { projectDataState } from '@/store/projects-store';
import { ProjectSchema } from '@/types/project-schema';
import {
  clientGetSingleProject,
  clientUploadImage,
} from '@/utils/client-utils';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
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
  };

  useEffect(() => {
    setImg(project.imageLink);
    clientGetSingleProject(projectId, setProject);
  }, []);

  return (
    <>
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
      {project.imageLink && (
        <Image src={project.imageLink} alt='profile' width={300} height={300} />
      )}
      <Label>Upload an image</Label>
      <Input
        placeholder='Choose image'
        accept='image/png,image/jpeg'
        type='file'
        onChange={(e) => {
          setImg(e.target.files && e.target.files[0]);
        }}
        disabled={isInputDisabled}
      />
      <div>
        <Button
          onClick={() => uploadImage()}
          disabled={isInputDisabled}
          variant={'secondary'}
        >
          Upload File
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
  );
}
