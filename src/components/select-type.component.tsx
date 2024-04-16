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

type SelectTypeProps = {
  isInputDisabled: boolean;
};

export default function SelectType({
  isInputDisabled,
}: SelectTypeProps): ReactElement {
  const [project, setProject] = useRecoilState<ProjectSchema>(projectDataState);

  const handleChange = (e: string) => {
    if (e.valueOf() === 'project') {
      setProject({ ...project, type: 'project' });
    } else if (e.valueOf() === 'work') {
      setProject({ ...project, type: 'work' });
    }
  };

  return (
    <>
      <Label>Project Type</Label>
      <Select
        onValueChange={(e) => handleChange(e)}
        value={project.type}
        disabled={isInputDisabled}
        required
      >
        <SelectTrigger>
          <SelectValue placeholder='Item type' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value='project'>Project</SelectItem>
            <SelectItem value='work'>Work</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
}
