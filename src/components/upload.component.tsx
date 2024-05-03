'use';

import { UploadIcon } from 'lucide-react';
import FileDisplay from './file-display.component';
import FunctionFeedback from './function-feedback.component';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useState } from 'react';

type UploadProps = {
  label: string;
  uploadFunction(event: React.FormEvent<HTMLFormElement>): Promise<void>;
  setFile: any;
  fileAccepted: string;
  imageSrc?: string;
  isUploaded: boolean;
};
export default function Upload({
  label,
  uploadFunction,
  setFile,
  fileAccepted,
  isUploaded,
  imageSrc,
}: UploadProps) {
  return (
    <form onSubmit={(event) => uploadFunction(event)}>
      <div className='flex flex-col gap-y-2'>
        {/* {imageSrc && <FileDisplay fileUrl={imageSrc} />} */}
        <Label>{label}</Label>
        <div>
          <Input
            placeholder='Choose file'
            accept={fileAccepted}
            type='file'
            onChange={setFile}
            required
          />
        </div>
        <div>
          <Button variant={'secondary'} type='submit'>
            Upload File <UploadIcon className='w-4 h-4 ml-2' />
          </Button>
        </div>
        <FunctionFeedback hasBeenSuccessful={isUploaded} />
      </div>
    </form>
  );
}
