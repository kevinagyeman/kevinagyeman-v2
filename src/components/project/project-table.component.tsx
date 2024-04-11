import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { projectsListState } from '@/store/projects-store';
import { ProjectSchema } from '@/types/project-schema';
import { Trash } from 'lucide-react';
import { useRecoilState } from 'recoil';
import CustomModalDialog from '../custom-modal-dialog.component';
import { Button } from '../ui/button';
import ProjectUpdate from './project-update.component';
import DeleteModal from './projects-delete.component';

export default function ProjectTable() {
  const [projects, setProjects] =
    useRecoilState<ProjectSchema[]>(projectsListState);

  return (
    <Accordion type='single' className='w-full' collapsible>
      {projects?.map((project: ProjectSchema, index: number) => (
        <AccordionItem value={project.id} key={project.id}>
          <AccordionTrigger className='hover:no-underline'>
            <div className='text-left'>
              <div className='flex flex-col'>
                <small className='text-secondary'>
                  {project.isPublished ? (
                    <span className='text-emerald-500'>Published</span>
                  ) : (
                    <span className='text-amber-300'>Draft</span>
                  )}{' '}
                  | {project.id}
                </small>
                <h1 className='text-lg'>{project.title}</h1>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <ProjectUpdate projectId={project.id} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

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
