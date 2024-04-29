import { projectDataState } from '@/store/projects-store';
import { InformationSchema } from '@/types/information-schema';
import { Link, ProjectSchema } from '@/types/project-schema';
import { Minus } from 'lucide-react';
import React from 'react';
import { SetterOrUpdater, useRecoilState } from 'recoil';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

type LinkInputProps = {
  data: ProjectSchema;
  setter: SetterOrUpdater<ProjectSchema>;
};

export default function LinkInput({ data, setter }: LinkInputProps) {
  const handleLabelChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    link: Link
  ) => {
    setter({
      ...data,
      links: data?.links?.map((item: Link) =>
        item.label === link.label
          ? { ...item, label: event.target.value }
          : item
      ),
    });
  };

  const handleUrlChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    link: Link
  ) => {
    setter({
      ...data,
      links: data?.links?.map((item: Link) =>
        item.url === link.url ? { ...item, url: event.target.value } : item
      ),
    });
  };

  const addNewLink = () => {
    setter({
      ...data,
      links: [...(data?.links || []), { label: '', url: '' }],
    });
  };

  const removeLink = (link: Link) => {
    setter({
      ...data,
      links: data?.links?.filter((item: Link) => item.url !== link.url),
    });
  };

  const isButtonEnabled = (): boolean => {
    const existsEmptyLink = !!data?.links?.find(
      (item: Link) => item.url === ''
    );
    if (existsEmptyLink) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      <Label>Link Input</Label>
      <div className='flex flex-col gap-3'>
        {data.links?.map((link: Link, index: number) => (
          <div key={index}>
            <div className='flex flex-row gap-3 items-center p-4 bg-secondary rounded-lg mt-2'>
              <div className='flex flex-col gap-y-2 flex-auto'>
                <Label className='text-xs'>Label</Label>
                <Input
                  type='text'
                  placeholder='Label link'
                  value={link.label}
                  onChange={(event) => handleLabelChange(event, link)}
                  required
                />
                <Label className='text-xs'>Link</Label>
                <Input
                  type='text'
                  placeholder='Link'
                  value={link.url}
                  onChange={(event) => handleUrlChange(event, link)}
                  required
                />
              </div>
              <Button
                size='icon'
                className='rounded-full'
                type='button'
                onClick={() => removeLink(link)}
              >
                <Minus className='h-4 w-4' />
              </Button>
            </div>
          </div>
        ))}
        <div>
          <Button
            type='button'
            onClick={() => addNewLink()}
            variant={'secondary'}
            disabled={isButtonEnabled()}
          >
            Add New Link
          </Button>
        </div>
      </div>
    </>
  );
}
