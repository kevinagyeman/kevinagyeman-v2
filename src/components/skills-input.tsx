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
    <div className='flex flex-col gap-y-3'>
      <Label>{label}</Label>
      <div>
        <TagInput
          draggable={true}
          placeholder='Enter a topic'
          tags={tags}
          setTags={(newTags) => {
            setTags(newTags);
          }}
        />
      </div>
    </div>
  );
}
