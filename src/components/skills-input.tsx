import { projectDataState } from '@/store/projects-store';
import { ProjectSchema } from '@/types/project-schema';
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { TagInput } from './ui/tag-input';
import { Label } from './ui/label';

type SkillsInputProps = {
  isInputDisabled: boolean;
};

export default function SkillsInput({ isInputDisabled }: SkillsInputProps) {
  const [project, setProject] = useRecoilState<ProjectSchema>(projectDataState);
  const [tags, setTags] = React.useState<string[]>(
    project.skills ? project.skills : []
  );

  useEffect(() => {
    setProject({ ...project, skills: tags });
  }, [tags]);

  return (
    <>
      <Label>Skills project</Label>
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
