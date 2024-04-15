'use client';

import { addDays, format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import * as React from 'react';
import { DateRange } from 'react-day-picker';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { projectDataState } from '@/store/projects-store';
import { ProjectSchema } from '@/types/project-schema';
import { Timestamp } from 'firebase/firestore';
import { useState } from 'react';
import { useRecoilState } from 'recoil';

type DatePickerProps = {
  className?: React.HTMLAttributes<HTMLDivElement>;
  isInputDisabled: boolean;
};

export default function DatePicker({
  isInputDisabled,
  className,
}: DatePickerProps) {
  const [project, setProject] = useRecoilState<ProjectSchema>(projectDataState);
  const [date, setDate] = useState<DateRange | undefined>({
    from: project.startDate?.toDate() || new Date(),
    to: project.endDate?.toDate() || addDays(new Date(), 1),
  });

  const updateProjectDate = () => {
    console.log('date', date);
    console.log('startDate', project.startDate);
    console.log('endDate', project.endDate);

    if (date?.from) {
      setProject({ ...project, startDate: Timestamp.fromDate(date.from) });
    }
    if (date?.to) {
      setProject({ ...project, endDate: Timestamp.fromDate(date.to) });
    }
  };

  return (
    <div className={cn('grid gap-2 my-4', className)}>
      <Popover onOpenChange={() => updateProjectDate()}>
        <PopoverTrigger asChild disabled={isInputDisabled}>
          <Button
            id='date'
            variant={'outline'}
            className={cn(
              'w-[300px] justify-start text-left font-normal',
              !date && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className='mr-2 h-4 w-4' />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} -{' '}
                  {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0' align='start'>
          <Calendar
            initialFocus
            mode='range'
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
