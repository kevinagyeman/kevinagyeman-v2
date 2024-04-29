import React from 'react';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Input } from './ui/input';
import FileDisplay from './file-display.component';
import { projectDataState } from '@/store/projects-store';
import { ProjectSchema } from '@/types/project-schema';
import { useRecoilState } from 'recoil';

type UploadProps = {
  label: string;
  uploadFunction: () => void;
  setFile: any;
  fileAccepted: string;
};

export default function Upload({
  label,
  uploadFunction,
  setFile,
  fileAccepted,
}: UploadProps) {
  const [project, setProject] = useRecoilState<ProjectSchema>(projectDataState);

  return (
    <>
      <Label>{label}</Label>
      <div>
        <Input
          placeholder='Choose image'
          accept={fileAccepted}
          type='file'
          onChange={setFile}
        />
      </div>
      <div>
        <Button onClick={() => uploadFunction()} variant={'secondary'}>
          Upload File
        </Button>
      </div>
    </>
  );
}
