'use client';

import { projectDataState } from '@/store/projects-store';
import { ProjectSchema } from '@/types/project-schema';
import { Timestamp } from 'firebase/firestore';
import { useRecoilState } from 'recoil';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';

type DatePickerProps = {
  isInputDisabled: boolean;
};

export default function DatePicker({ isInputDisabled }: DatePickerProps) {
  const [project, setProject] = useRecoilState<ProjectSchema>(projectDataState);

  const fromTimestampToISO8601 = (date: Timestamp): string | undefined => {
    if (date) {
      const day: string = date.toDate().getDate().toString().padStart(2, '0');
      const month: string = (date.toDate().getMonth() + 1)
        .toString()
        .padStart(2, '0');
      const year: string = date.toDate().getFullYear().toString();
      return `${year}-${month}-${day}`;
    } else {
      return undefined;
    }
  };

  const fromISO8601ToTimestamp = (date: string): Timestamp => {
    return Timestamp.fromDate(new Date(date));
  };

  const isProjectPresent = (): boolean => {
    if (project.endDate) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className='flex flex-col gap-y-3 my-4'>
      <div>
        <Label>Start Date</Label>
        <Input
          type='date'
          disabled={isInputDisabled}
          value={
            project.startDate
              ? fromTimestampToISO8601(project.startDate)
              : undefined
          }
          onChange={(e) =>
            setProject({
              ...project,
              startDate: fromISO8601ToTimestamp(e.target.value),
            })
          }
        />
      </div>
      <div>
        <Label>End Date</Label>
        <Input
          type='date'
          disabled={isInputDisabled}
          value={
            project.endDate
              ? fromTimestampToISO8601(project.endDate)
              : undefined
          }
          onChange={(e) =>
            setProject({
              ...project,
              endDate: Timestamp.fromDate(new Date(e.target.value)),
            })
          }
        />
      </div>
      <div>
        <div className='flex items-center space-x-2'>
          <Checkbox
            id='dates'
            checked={project.endDate ? false : true}
            disabled={isInputDisabled}
          />
          <label
            htmlFor='dates'
            className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
          >
            Present
          </label>
        </div>
      </div>
    </div>
  );
}
