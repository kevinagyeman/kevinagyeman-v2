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
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import ProjectFilter from './project-filter.component';

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
      <FilterSection />
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[100px]'>ID</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Updated At</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead className='text-right'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects?.map((project: ProjectSchema, index: number) => (
            <TableRow key={index}>
              <TableCell className='font-medium'>{project.id}</TableCell>
              <TableCell>
                {project.isPublished ? (
                  <Badge variant='secondary'>Published</Badge>
                ) : (
                  <Badge variant='outline'>Draft</Badge>
                )}
              </TableCell>
              <TableCell>{project.title}</TableCell>
              <TableCell>{formatDate(project.updatedAt)}</TableCell>
              <TableCell>{formatDate(project.createdAt)}</TableCell>
              <TableCell className='text-right'>
                <div className='flex gap-x-3 pt-3'>
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

const FilterSection = () => {
  const [projects, setProjects] =
    useRecoilState<ProjectSchema[]>(projectsListState);

  return (
    <>
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
        <ProjectFilter
          buttonLabel={'Title'}
          orderBy={{ fieldPath: 'title' }}
          projectsSetter={setProjects}
          descLabel='Dalla Z alla A'
          ascLabel='Dalla A alla Z'
        />
        <ProjectFilter
          buttonLabel={'Updated At'}
          orderBy={{ fieldPath: 'updatedAt' }}
          projectsSetter={setProjects}
        />
        <ProjectFilter
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
    </>
  );
};
