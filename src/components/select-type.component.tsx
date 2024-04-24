import { projectDataState } from '@/store/projects-store';
import { ProjectSchema } from '@/types/project-schema';
import { ReactElement } from 'react';
import { useRecoilState } from 'recoil';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

export default function SelectType(): ReactElement {
  const [project, setProject] = useRecoilState<ProjectSchema>(projectDataState);

  const projectsTypes = ['work', 'project', 'education'];

  const handleChange = (e: string) => {
    switch (e.valueOf()) {
      case 'project':
        setProject({ ...project, type: 'project' });
        break;
      case 'work':
        setProject({ ...project, type: 'work' });
        break;
      case 'education':
        setProject({ ...project, type: 'education' });
        break;
    }
  };

  return (
    <>
      <Label>Project Type</Label>
      <Select
        onValueChange={(e) => handleChange(e)}
        value={project.type}
        required
      >
        <SelectTrigger>
          <SelectValue placeholder='Item type' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {projectsTypes.map((type: string, index: number) => (
              <SelectItem value={type} key={index}>
                {type}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
}
