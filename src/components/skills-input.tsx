import { projectDataState } from '@/store/projects-store';
import { ProjectSchema } from '@/types/project-schema';
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { Button } from './ui/button';
import { TagInput } from './ui/tag-input';

type SkillsInputProps = {
  isInputDisabled: boolean;
};

export default function SkillsInput({ isInputDisabled }: SkillsInputProps) {
  const [tags, setTags] = React.useState<string[]>([]);
  const [project, setProject] = useRecoilState<ProjectSchema>(projectDataState);

  const test = () => {
    console.log('tags', tags);
    setProject({ ...project, skills: tags });
    console.log('projects', project.skills);
  };

  return (
    <>
      <TagInput
        draggable={true}
        placeholder='Enter a topic'
        tags={tags}
        className='sm:min-w-[450px]'
        setTags={(newTags) => {
          setTags(newTags);
        }}
      />
      <Button type='button' onClick={() => test()}>
        Submit
      </Button>
    </>
  );
}
