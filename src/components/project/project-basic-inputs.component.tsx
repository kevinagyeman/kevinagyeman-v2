'use client';

import { projectDataState } from '@/store/projects-store';
import { FormFieldSchema } from '@/types/form-field-schema';
import { ProjectSchema } from '@/types/project-schema';
import { useRecoilState } from 'recoil';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';

export default function BasicInputs() {
  const [project, setProject] = useRecoilState<ProjectSchema>(projectDataState);
  const formFields: FormFieldSchema[] = [
    {
      label: 'Title',
      type: 'text',
      value: project.title || '',
      required: true,
      onChange: (e) => {
        setProject({ ...project, title: e.target.value });
      },
    },
    {
      label: 'Short Description',
      type: 'textarea',
      value: project.shortDescription || '',
      required: true,
      onChange: (e) => {
        setProject({ ...project, shortDescription: e.target.value });
      },
    },
    {
      label: 'Description',
      type: 'textarea',
      value: project.description || '',
      required: false,
      onChange: (e) => {
        setProject({ ...project, description: e.target.value });
      },
    },
  ];

  return (
    <>
      {formFields.map((field: FormFieldSchema, index: number) => (
        <div key={index}>
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
    </>
  );
}
