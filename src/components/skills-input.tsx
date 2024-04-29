'use client';

import React, { useEffect } from 'react';
import { Label } from './ui/label';
import { TagInput } from './ui/tag-input';

type SkillsInputProps = {
  label: string;
  setter: any;
  data: any;
};

export default function SkillsInput({ label, setter, data }: SkillsInputProps) {
  const [tags, setTags] = React.useState<string[]>(
    data.skills ? data.skills : []
  );

  useEffect(() => {
    setter({ ...data, skills: tags });
  }, [tags]);

  return (
    <>
      <Label>{label}</Label>
      <div className='mb-4 mt-2'>
        <TagInput
          draggable={true}
          placeholder='Enter a topic'
          tags={tags}
          className='sm:min-w-[450px]'
          setTags={(newTags) => {
            setTags(newTags);
          }}
        />
      </div>
    </>
  );
}
