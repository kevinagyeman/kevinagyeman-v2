'use client';

import { FormFieldSchema } from '@/types/form-field-schema';
import { ProjectSchema } from '@/types/project-schema';
import React from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Textarea } from '../ui/textarea';
import DatePicker from '../date-picker.component';
import SelectType from '../select-type.component';
import SkillsInput from '../skills-input';
import LinkInput from '../link-input.component';

type ProjectFormData = {
  project: ProjectSchema;
  projectSetter: React.Dispatch<React.SetStateAction<ProjectSchema>>;
  submitFunction(e: React.FormEvent<HTMLFormElement>): Promise<void>;
};

export default function ProjectForm({
  project,
  projectSetter,
  submitFunction,
}: ProjectFormData) {
  const formFields: FormFieldSchema[] = [
    {
      label: 'Title',
      type: 'text',
      value: project.title || '',
      required: true,
      onChange: (e) => {
        projectSetter({ ...project, title: e.target.value });
      },
    },
    {
      label: 'Link',
      type: 'text',
      value: project.link || '',
      required: false,
      onChange: (e) => {
        projectSetter({ ...project, link: e.target.value });
      },
    },
    {
      label: 'Short Description',
      type: 'textarea',
      value: project.shortDescription || '',
      required: true,
      onChange: (e) => {
        projectSetter({ ...project, shortDescription: e.target.value });
      },
    },
    {
      label: 'Description',
      type: 'textarea',
      value: project.description || '',
      required: false,
      onChange: (e) => {
        projectSetter({ ...project, description: e.target.value });
      },
    },
  ];

  return (
    <>
      <form onSubmit={(e) => submitFunction(e)} id='form'>
        <div className='mb-4 flex items-center space-x-2'>
          <Switch
            id='status-mode'
            onCheckedChange={(e) => {
              projectSetter({ ...project, isPublished: e.valueOf() });
            }}
            checked={project?.isPublished}
          />
          <Label htmlFor='status-mode'>
            {project?.isPublished ? 'Published' : 'Draft'}
          </Label>
        </div>
        <SelectType />
        <DatePicker />
        <SkillsInput />
        <LinkInput />
        {formFields.map((field: FormFieldSchema, index: number) => (
          <div className='my-6' key={index}>
            {field.type === 'text' ? (
              <>
                <Label>{field.label}</Label>
                {field.hint && (
                  <p className='text-xs text-muted-foreground'>{field.hint}</p>
                )}
                <Input
                  className='mt-1'
                  required={field.required}
                  type={field.type}
                  placeholder={field.label}
                  value={field.value}
                  onChange={field.onChange}
                />
              </>
            ) : (
              <>
                <Label>{field.label}</Label>
                {field.hint && (
                  <p className='text-xs text-muted-foreground'>{field.hint}</p>
                )}
                <Textarea
                  className='mt-1'
                  placeholder={field.label}
                  value={field.value}
                  onChange={field.onChange}
                  rows={14}
                ></Textarea>
              </>
            )}
          </div>
        ))}
      </form>
    </>
  );
}
