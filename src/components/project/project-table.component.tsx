import { projectsListState } from '@/store/projects-store';
import { ProjectSchema } from '@/types/project-schema';
import { Timestamp } from 'firebase/firestore';
import { Pencil, Trash } from 'lucide-react';
import { useRecoilState } from 'recoil';
import CustomModalDialog from '../custom-modal-dialog.component';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import ProjectUpdate from './project-update.component';
import DeleteModal from './projects-delete.component';

export default function ProjectTable() {
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

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Actions</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>ID</TableHead>
          <TableHead>Updated At</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Delete</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {projects?.map((project: ProjectSchema, index: number) => (
          <TableRow key={index}>
            <TableCell className='p-0 text-center'>
              <EditProjectModal projectId={project.id} />
            </TableCell>
            <TableCell className='truncate p-0 '>{project.title}</TableCell>
            <TableCell>
              {project.isPublished ? (
                <Badge>Published</Badge>
              ) : (
                <Badge variant='secondary'>Draft</Badge>
              )}
            </TableCell>
            <TableCell className='truncate p-0'>{project.id}</TableCell>
            <TableCell className='truncate p-0'>
              {formatDate(project.updatedAt)}
            </TableCell>
            <TableCell className='truncate p-0'>
              {formatDate(project.createdAt)}
            </TableCell>
            <TableCell className='p-0 text-center'>
              <DeleteModalDialog projectId={project.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

const EditProjectModal = ({ projectId }: { projectId: string }) => {
  return (
    <CustomModalDialog
      dialogTrigger={
        <Button variant='outline' size='icon'>
          <Pencil className='h-4 w-4' />
        </Button>
      }
    >
      <ProjectUpdate projectId={projectId} />
    </CustomModalDialog>
  );
};

const DeleteModalDialog = ({ projectId }: { projectId: string }) => {
  return (
    <CustomModalDialog
      dialogTrigger={
        <Button variant='ghost' size='icon'>
          <Trash className='h-4 w-4' color='tomato' />
        </Button>
      }
    >
      <DeleteModal projectId={projectId} />
    </CustomModalDialog>
  );
};
