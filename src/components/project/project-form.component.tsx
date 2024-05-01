'use client';

import React, { useState } from 'react';
import DatePicker from '../date-picker.component';
import SelectType from '../select-type.component';
import SkillsInput from '../skills-input';
import BasicInputs from './project-basic-inputs.component';
import ProjectSwitch from './project-switch.component';
import LinkInput from '../link-input.component';
import { projectDataState } from '@/store/projects-store';
import { useRecoilState } from 'recoil';
import { ProjectSchema } from '@/types/project-schema';
import Dates from '../dates.component';
import FileDisplay from '../file-display.component';
import Upload from '../upload.component';
import { clientUpload } from '@/utils/client-utils';
import FunctionFeedback from '../function-feedback.component';

type ProjectFormData = {
  submitFunction(event: React.FormEvent<HTMLFormElement>): Promise<void>;
};

export default function ProjectForm({ submitFunction }: ProjectFormData) {
  const [project, setProject] = useRecoilState<ProjectSchema>(projectDataState);
  const [isUploaded, setIsUploaded] = useState<boolean>(false);

  const uploadImage = async () => {
    const newUrl = await clientUpload(
      project.imageLink,
      `projects/${project.id}`
    );
    setProject({ ...project, imageLink: newUrl });
    setIsUploaded(true);
    return true;
  };

  return (
    <form
      onSubmit={(event) => submitFunction(event)}
      id='form'
      className='grid lg:grid-cols-4 gap-5'
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
      <div className='flex flex-col gap-y-10'>
        <LinkInput data={project} setter={setProject} />
      </div>
      <div className='flex flex-col gap-y-10'>
        <BasicInputs />
      </div>
      <div className='flex flex-col gap-y-10'>
        <div>
          <FileDisplay fileUrl={project.imageLink} />
          <Upload
            label={'Upload an image'}
            uploadFunction={uploadImage}
            setFile={(event: any) =>
              setProject({
                ...project,
                imageLink: event.target.files && event.target.files[0],
              })
            }
            fileAccepted={'image/png,image/jpeg'}
          />
          <FunctionFeedback hasBeenSuccessful={isUploaded} />
        </div>
      </div>
    </form>
  );
}
