import React from 'react';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { useRecoilState } from 'recoil';
import { ProjectSchema } from '@/types/project-schema';
import { initProjectData, projectDataState } from '@/store/projects-store';

type CustomModalDialogProps = {
  children: React.ReactNode;
  dialogTrigger: React.ReactNode;
};

export default function CustomModalDialog({
  dialogTrigger,
  children,
}: CustomModalDialogProps) {
  const [project, setProject] = useRecoilState<ProjectSchema>(projectDataState);

  return (
    <Dialog onOpenChange={() => setProject(initProjectData)}>
      <DialogTrigger asChild>{dialogTrigger}</DialogTrigger>
      <DialogContent
        className='max-h-screen overflow-y-auto my-10'
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        {children}
      </DialogContent>
    </Dialog>
  );
}
