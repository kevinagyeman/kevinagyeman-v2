'use client';

import { projectDataState } from '@/store/projects-store';
import { ProjectSchema } from '@/types/project-schema';
import {
  clientFormatDateAdmin,
  clientFormatDateUser,
} from '@/utils/client-utils';
import { Timestamp } from 'firebase/firestore';
import { useRecoilState } from 'recoil';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { X } from 'lucide-react';
import { Checkbox } from './ui/checkbox';
import { FormEvent, useEffect, useState } from 'react';
import { CheckedState } from '@radix-ui/react-checkbox';

export default function DatePicker() {
  const [project, setProject] = useRecoilState<ProjectSchema>(projectDataState);
  const [isEndDateVisible, setIsEndDateVisible] = useState<boolean>(
    !!!project.isPresentDate
  );
  const [error, setError] = useState<boolean>(false);

  const isDateRangeValid = () => {
    if (project.startDate && project.endDate) {
      if (project.startDate.seconds < project.endDate.seconds) {
        setError(false);
      } else {
        setError(true);
        setProject({
          ...project,
          endDate: undefined,
        });
        console.log('startDate mus be greather than endDate');
      }
    }
  };

  const fromISO8601ToTimestamp = (date: string): Timestamp => {
    return Timestamp.fromDate(new Date(date + 'T20:00:00Z'));
  };

  const handleCheckBoxValueChange = (e: CheckedState) => {
    if (e.valueOf()) {
      setProject({ ...project, isPresentDate: true });
      setIsEndDateVisible(false);
    } else {
      setProject({ ...project, isPresentDate: false });
      setIsEndDateVisible(true);
    }
  };

  useEffect(() => {
    isDateRangeValid();
  }, [project]);

  return (
    <div className='flex flex-col gap-y-3'>
      <div>
        <Label>Start Date</Label>
        <div className='flex flex-row items-center gap-x-3'>
          <div className='flex gap-x-2'>
            <Input
              type='date'
              onChange={(e) => {
                setProject({
                  ...project,
                  startDate: fromISO8601ToTimestamp(e.target.value),
                });
              }}
            />
            <div>
              <Button
                size='icon'
                type='button'
                variant={'outline'}
                onClick={() => {
                  setProject({
                    ...project,
                    startDate: undefined,
                  });
                }}
              >
                <X className='h-4 w-4' />
              </Button>
            </div>
          </div>
          <span>
            {project.startDate
              ? clientFormatDateAdmin(project.startDate)
              : 'Not setted'}
          </span>
        </div>
      </div>
      {isEndDateVisible && (
        <div>
          <Label>End Date</Label>
          <div className='flex flex-row items-center gap-x-3'>
            <div className='flex gap-x-2'>
              <Input
                type='date'
                onChange={(e) => {
                  setProject({
                    ...project,
                    endDate: fromISO8601ToTimestamp(e.target.value),
                  });
                }}
              />
              <div>
                <Button
                  size='icon'
                  type='button'
                  variant={'outline'}
                  onClick={() =>
                    setProject({
                      ...project,
                      endDate: undefined,
                    })
                  }
                >
                  <X className='h-4 w-4' />
                </Button>
              </div>
            </div>
            <span>
              {project.endDate
                ? clientFormatDateAdmin(project.endDate)
                : 'Not setted'}
            </span>
          </div>
        </div>
      )}
      <div className='flex items-center space-x-2'>
        <Checkbox
          id='isPresentDate'
          onCheckedChange={(e) => handleCheckBoxValueChange(e)}
          checked={project.isPresentDate}
        />
        <label
          htmlFor='isPresentDate'
          className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
        >
          Present
        </label>
      </div>
      {error && (
        <p className='text-red-600 text-xs'>
          Start Date must be greather than End Date
        </p>
      )}
    </div>
  );
}
