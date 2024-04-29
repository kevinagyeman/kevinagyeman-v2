import React from 'react';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { useRecoilState } from 'recoil';
import { projectDataState } from '@/store/projects-store';
import { ProjectSchema } from '@/types/project-schema';

export default function ProjectSwitch() {
  const [project, setProject] = useRecoilState<ProjectSchema>(projectDataState);
  return (
    <div className='mb-4 flex items-center space-x-2'>
      <Switch
        id='status-mode'
        onCheckedChange={(e) => {
          setProject({ ...project, isPublished: e.valueOf() });
        }}
        checked={project?.isPublished}
      />
      <Label htmlFor='status-mode'>
        {project?.isPublished ? 'Published' : 'Draft'}
      </Label>
    </div>
  );
}
