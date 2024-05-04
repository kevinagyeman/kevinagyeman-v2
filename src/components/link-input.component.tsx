import { ProjectSchema } from '@/types/project-schema';
import { Url } from '@/types/url-schema';
import { Minus, Plus, Trash, X } from 'lucide-react';
import React from 'react';
import { SetterOrUpdater } from 'recoil';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { InformationSchema } from '@/types/information-schema';

type LinkInputProps = {
  data: ProjectSchema | InformationSchema;
  setter: SetterOrUpdater<ProjectSchema | InformationSchema>;
};

export default function LinkInput({ data, setter }: LinkInputProps) {
  const handleLabelChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    link: Url
  ): void => {
    setter({
      ...data,
      links: data?.links?.map((item: Url) =>
        item.label === link.label
          ? { ...item, label: event.target.value }
          : item
      ),
    });
  };

  const handleUrlChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    link: Url
  ): void => {
    setter({
      ...data,
      links: data?.links?.map((item: Url) =>
        item.url === link.url ? { ...item, url: event.target.value } : item
      ),
    });
  };

  const addNewLink = (): void => {
    setter({
      ...data,
      links: [...(data?.links || []), { label: '', url: '' }],
    });
  };

  const removeLink = (link: Url): void => {
    setter({
      ...data,
      links: data?.links?.filter((item: Url) => item.url !== link.url),
    });
  };

  const isButtonEnabled = (): boolean => {
    const existsEmptyLink = !!data?.links?.find((item: Url) => item.url === '');
    if (existsEmptyLink) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className='flex flex-col gap-y-3'>
      <Label>Link Input</Label>
      <div className='flex flex-col gap-y-3'>
        {data.links?.map((link: Url, index: number) => (
          <div
            key={index}
            className='p-3 bg-zinc-100 dark:bg-zinc-900 rounded-lg flex flex-col gap-y-1'
          >
            <div>
              <Label className='text-xs'>Label</Label>
              <Input
                type='text'
                placeholder='Label'
                value={link.label}
                onChange={(event) => handleLabelChange(event, link)}
                required
              />
            </div>
            <div>
              <Label className='text-xs'>Link</Label>
              <div className='flex gap-x-2'>
                <Input
                  type='text'
                  placeholder='Link'
                  value={link.url}
                  onChange={(event) => handleUrlChange(event, link)}
                  required
                />
                <div>
                  <Button
                    size='icon'
                    type='button'
                    variant={'outline'}
                    onClick={() => removeLink(link)}
                  >
                    <X className='h-4 w-4' />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div>
        <Button
          type='button'
          onClick={() => addNewLink()}
          variant={'secondary'}
          disabled={isButtonEnabled()}
        >
          Add New Link <Plus className='w-4 h-4 ml-2' />
        </Button>
      </div>
    </div>
  );
}
