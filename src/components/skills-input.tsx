'use client';

import { InformationSchema } from '@/types/information-schema';
import { ProjectSchema } from '@/types/project-schema';
import React, { SetStateAction, useEffect, useState } from 'react';
import { SetterOrUpdater } from 'recoil';
import { Label } from './ui/label';
import { TagInput } from './ui/tag-input';

type SkillsInputProps = {
  label: string;
  setter: SetterOrUpdater<InformationSchema | ProjectSchema>;
  data: InformationSchema | ProjectSchema;
};

export default function SkillsInput({ label, setter, data }: SkillsInputProps) {
  return (
    <div className='flex flex-col gap-y-3'>
      <Label>{label}</Label>
      <div>
        <TagInput
          draggable={true}
          placeholder='Enter a topic'
          tags={data.skills ? data.skills : []}
          setTags={(newTags: any) => {
            setter({ ...data, skills: newTags });
          }}
        />
      </div>
    </div>
  );
}
