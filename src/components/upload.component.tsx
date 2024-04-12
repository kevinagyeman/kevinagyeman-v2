import React from 'react';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Input } from './ui/input';

type UploadProps = {
  label: string;
  isInputDisabled: boolean;
  uploadFunction: () => void;
  setFile: any;
  fileAccepted: string;
};

export default function Upload({
  label,
  isInputDisabled,
  uploadFunction,
  setFile,
  fileAccepted,
}: UploadProps) {
  return (
    <>
      <Label>{label}</Label>
      <div>
        <Input
          placeholder='Choose image'
          accept={fileAccepted}
          type='file'
          onChange={setFile}
          disabled={isInputDisabled}
        />
      </div>
      <div>
        <Button
          onClick={() => uploadFunction()}
          disabled={isInputDisabled}
          variant={'secondary'}
        >
          Upload File
        </Button>
      </div>
    </>
  );
}
