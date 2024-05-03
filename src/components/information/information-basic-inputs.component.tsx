import { informationDataState } from '@/store/information-store';
import { FormFieldSchema } from '@/types/form-field-schema';
import { InformationSchema } from '@/types/information-schema';
import React from 'react';
import { useRecoilState } from 'recoil';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Input } from '../ui/input';

export default function InformationBasicInputs() {
  const [information, setInformation] =
    useRecoilState<InformationSchema>(informationDataState);
  const formFields: FormFieldSchema[] = [
    {
      label: 'Name',
      type: 'text',
      value: information.name || '',
      required: false,
      onChange: (e) => {
        setInformation({ ...information, name: e.target.value });
      },
    },
    {
      label: 'Surname',
      type: 'text',
      value: information.surname || '',
      required: false,
      onChange: (e) => {
        setInformation({ ...information, surname: e.target.value });
      },
    },
    {
      label: 'Email',
      type: 'text',
      value: information.email || '',
      required: false,
      onChange: (e) => {
        setInformation({ ...information, email: e.target.value });
      },
    },
    {
      label: 'Role',
      type: 'text',
      value: information.role || '',
      required: false,
      onChange: (e) => {
        setInformation({ ...information, role: e.target.value });
      },
    },
    {
      label: 'Summary',
      type: 'textarea',
      value: information.summary || '',
      required: false,
      onChange: (e) => {
        setInformation({ ...information, summary: e.target.value });
      },
    },
    {
      label: 'Additional Information',
      type: 'textarea',
      value: information.additionalInfo || '',
      required: false,
      onChange: (e) => {
        setInformation({ ...information, additionalInfo: e.target.value });
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
              <Input
                className='mt-1'
                required={field.required}
                type={field.type}
                placeholder={field.label}
                value={field.value}
                onChange={field.onChange}
                disabled={field.disabled}
              />
            </>
          ) : (
            <>
              <Label>{field.label}</Label>
              <Textarea
                className='mt-1'
                placeholder={field.label}
                value={field?.value}
                onChange={field.onChange}
                disabled={field.disabled}
                rows={14}
              ></Textarea>
            </>
          )}
        </div>
      ))}
    </>
  );
}
