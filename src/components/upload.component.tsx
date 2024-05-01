import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

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
