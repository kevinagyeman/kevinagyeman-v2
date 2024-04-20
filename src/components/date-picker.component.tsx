'use client';

import { projectDataState } from '@/store/projects-store';
import { ProjectSchema } from '@/types/project-schema';
import { clientFormatDateUser } from '@/utils/client-utils';
import { Timestamp } from 'firebase/firestore';
import { useRecoilState } from 'recoil';
import { Input } from './ui/input';
import { Label } from './ui/label';

type DatePickerProps = {
  isInputDisabled: boolean;
};

export default function DatePicker({ isInputDisabled }: DatePickerProps) {
  const [project, setProject] = useRecoilState<ProjectSchema>(projectDataState);

  const fromISO8601ToTimestamp = (date: string): Timestamp => {
    return Timestamp.fromDate(new Date(date + 'T20:00:00Z'));
  };

  return (
    <div className='flex flex-col gap-y-3 my-4'>
      <Label>Start Date:</Label>
      <div className='flex flex-row items-center gap-x-3'>
        <div>
          <Input
            type='date'
            disabled={isInputDisabled}
            onChange={(e) =>
              setProject({
                ...project,
                startDate: fromISO8601ToTimestamp(e.target.value),
              })
            }
          />
        </div>
        <span>
          {project.endDate
            ? clientFormatDateUser(project.startDate)
            : 'Not setted'}
        </span>
      </div>
      <div>
        <Label>End Date:</Label>
        <div className='flex flex-row items-center gap-x-3'>
          <div>
            <Input
              type='date'
              disabled={isInputDisabled}
              onChange={(e) =>
                setProject({
                  ...project,
                  endDate: fromISO8601ToTimestamp(e.target.value),
                })
              }
            />
          </div>
          <span>
            {project.endDate
              ? clientFormatDateUser(project.endDate)
              : 'Present'}
          </span>
        </div>
      </div>
      {/* <div>
        <div className='flex items-center space-x-2'>
          <Checkbox
            id='dates'
            disabled={isInputDisabled}
            checked={project.endDate ? false : true}
            onChange={() =>
              setProject({
                ...project,
                endDate: undefined,
              })
            }
          />
          <label
            htmlFor='dates'
            className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
          >
            Present
          </label>
        </div>
      </div> */}
    </div>
  );
}
