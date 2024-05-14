'use client';

import { projectDataState } from '@/store/projects-store';
import { ProjectSchema } from '@/types/project-schema';
import { clientUpload } from '@/utils/client-utils';
import Image from 'next/image';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import DatePicker from '../date-picker.component';
import Dates from '../dates.component';
import LinkInput from '../link-input.component';
import SelectType from '../select-type.component';
import SkillsInput from '../skills-input';
import Upload from '../upload.component';
import BasicInputs from './project-basic-inputs.component';
import ProjectSwitch from './project-switch.component';

type ProjectFormData = {
  submitFunction(event: React.FormEvent<HTMLFormElement>): Promise<void>;
};

export default function ProjectForm({ submitFunction }: ProjectFormData) {
  const [project, setProject] = useRecoilState<ProjectSchema>(projectDataState);
  const [isUploaded, setIsUploaded] = useState<boolean>(false);

  const uploadImage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newUrl = await clientUpload(
      project.imageLink,
      `projects/${project.id}`
    );
    setProject({ ...project, imageLink: newUrl });
    setIsUploaded(true);
  };

  return (
    <>
      <div className='max-w-xs my-10'>
        <Upload
          label={'Upload an image in 16:9'}
          uploadFunction={uploadImage}
          setFile={(event: any) =>
            setProject({
              ...project,
              imageLink: event.target.files && event.target.files[0],
            })
          }
          imageSrc={project.imageLink}
          isUploaded={isUploaded}
          fileAccepted={'image/png,image/jpeg,image/jpg'}
        />
      </div>
      <form
        onSubmit={(event) => submitFunction(event)}
        id='form'
        className='grid lg:grid-cols-3 gap-5'
      >
        <div className='flex flex-col gap-y-10'>
          <Dates updatedAt={project.updatedAt} createdAt={project.createdAt} />
          <ProjectSwitch />
          <SelectType />
          <DatePicker />
          <SkillsInput
            data={project}
            setter={setProject}
            label={'Project skills'}
          />
        </div>
        <div className='flex flex-col gap-y-5'>
          <BasicInputs />
        </div>
        <div className='flex flex-col gap-y-10'>
          <LinkInput data={project} setter={setProject} />
        </div>
      </form>
    </>
  );
}
