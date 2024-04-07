import { OrderBySchema } from '@/types/query-schema';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { SetterOrUpdater } from 'recoil';
import { ProjectSchema } from '@/types/project-schema';
import { ArrowDownUp } from 'lucide-react';
import { clientGetProjects } from '@/utils/utils';

type FilterButtonProps = {
  buttonLabel: string;
  orderBy: OrderBySchema;
  ascLabel?: string;
  descLabel?: string;
  projectsSetter: SetterOrUpdater<ProjectSchema[]>;
};

export default function ProjectFilter({
  buttonLabel,
  orderBy,
  descLabel,
  ascLabel,
  projectsSetter,
}: FilterButtonProps) {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='outline'>
            {buttonLabel} <ArrowDownUp className='ml-2 h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-56'>
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() =>
                clientGetProjects(projectsSetter, {
                  fieldPath: orderBy.fieldPath,
                  directionStr: 'asc',
                })
              }
            >
              <span>{ascLabel ? ascLabel : 'Dal meno recente'}</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                clientGetProjects(projectsSetter, {
                  fieldPath: orderBy.fieldPath,
                  directionStr: 'desc',
                })
              }
            >
              <span>{descLabel ? descLabel : 'Dal più recente'}</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
