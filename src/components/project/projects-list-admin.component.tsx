'use client';

import { useEffect } from 'react';
import { projectsList, projectsListState } from '@/store/projects-store';
import { OrderBySchema } from '@/types/query-schema';
import {
  ClientSplitByLanguage,
  clientGetProjects,
  splitSkills,
} from '@/utils/utils';
import { Timestamp } from 'firebase/firestore';
import { ArrowDownUp, Check, FilterX, Search } from 'lucide-react';

import { SetterOrUpdater, useRecoilState } from 'recoil';
import { Link } from '../../../navigation';
import { ProjectSchema } from '../../types/project-schema';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import Divider from '../ui/divider';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import ProjectsUpdate from './project-update.component';
import DeleteModal from './projects-delete.component';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import ProjectUpdate from './project-update.component';

export default function ProjectsListAdmin() {
  const [projects, setProjects] =
    useRecoilState<ProjectSchema[]>(projectsListState);

  const formatDate = (date: Timestamp | undefined): string | undefined => {
    if (date) {
      const dateFormatted = new Date(date.seconds * 1000).toLocaleString([], {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
      return dateFormatted;
    }
  };

  useEffect(() => {
    clientGetProjects(setProjects, {
      fieldPath: 'createdAt',
      directionStr: 'desc',
    });
  }, [projects]);

  return (
    <>
      <Divider title={'Filters'} />
      <div className='flex flex-wrap justify-center gap-2'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline'>
              Status <Search className='ml-2 h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-56'>
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() =>
                  clientGetProjects(
                    setProjects,
                    {
                      fieldPath: 'createdAt',
                      directionStr: 'desc',
                    },
                    {
                      fieldPath: 'isPublished',
                      opStr: '==',
                      value: true,
                    }
                  )
                }
              >
                <span>Solo i pubblicati </span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  clientGetProjects(
                    setProjects,
                    {
                      fieldPath: 'createdAt',
                      directionStr: 'desc',
                    },
                    {
                      fieldPath: 'isPublished',
                      opStr: '==',
                      value: false,
                    }
                  )
                }
              >
                <span>Solo le bozze</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <FilterButton
          buttonLabel={'Title'}
          orderBy={{ fieldPath: 'title' }}
          projectsSetter={setProjects}
          descLabel='Dalla Z alla A'
          ascLabel='Dalla A alla Z'
        />
        <FilterButton
          buttonLabel={'Updated At'}
          orderBy={{ fieldPath: 'updatedAt' }}
          projectsSetter={setProjects}
        />
        <FilterButton
          buttonLabel={'Created At'}
          orderBy={{ fieldPath: 'createdAt' }}
          projectsSetter={setProjects}
        />
        <Button
          variant='outline'
          onClick={() =>
            clientGetProjects(setProjects, {
              fieldPath: 'createdAt',
              directionStr: 'desc',
            })
          }
        >
          Reset filtri <FilterX className='ml-2 h-4 w-4' />
        </Button>
      </div>
      <Divider title={'Projects'} />

      {projects?.map((project: ProjectSchema, index: number) => (
        <div
          className='mb-4 flex flex-col space-y-2 rounded-lg border p-6'
          key={index}
        >
          <div>
            {project.isPublished ? (
              <Badge variant='secondary'>Published</Badge>
            ) : (
              <Badge variant='outline'>Draft</Badge>
            )}
          </div>
          <p className='text-l truncate font-semibold'>{`${project.title}`}</p>
          <p className='truncate text-sm text-muted-foreground'>
            {`${project.shortDescription}`}
          </p>
          <div className='flex flex-wrap gap-x-3 gap-y-0'>
            {splitSkills(`${project.skills}`, 3).map(
              (skill: string, index: number) => (
                <small key={index} className='flex items-center gap-1'>
                  <Check className='h-3 w-3' />
                  {skill}
                </small>
              )
            )}
          </div>
          <p className='text-xs text-muted-foreground'>
            Updated At: {formatDate(project.updatedAt)}
            <br />
            Created At: {formatDate(project.createdAt)}
          </p>
          <div className='flex gap-x-3 pt-3'>
            <p>{project.id}</p>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant='outline'>modifica vedi</Button>
              </DialogTrigger>
              <DialogContent className='max-h-screen overflow-y-auto my-10'>
                <ProjectUpdate projectId={project.id} />
              </DialogContent>
            </Dialog>
            {/* <DeleteModal projectId={project.id} /> */}
          </div>
        </div>
      ))}
    </>
  );
}

type FilterButton = {
  buttonLabel: string;
  orderBy: OrderBySchema;
  ascLabel?: string;
  descLabel?: string;
  projectsSetter: SetterOrUpdater<ProjectSchema[]>;
};

const FilterButton = ({
  buttonLabel,
  orderBy,
  descLabel,
  ascLabel,
  projectsSetter,
}: FilterButton) => {
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
};
