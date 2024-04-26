import { projectDataState } from '@/store/projects-store';
import { Link, ProjectSchema } from '@/types/project-schema';
import { Minus } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

export default function LinkInput() {
  const [project, setProject] = useRecoilState<ProjectSchema>(projectDataState);
  return (
    <>
      <Label>Link Input</Label>
      <div className='flex flex-col gap-3'>
        {project.links?.map((link: Link, index: number) => (
          <div key={index}>
            <div className='flex flex-row gap-3 items-center p-4 bg-secondary rounded-lg mt-2'>
              <div className='flex flex-col gap-y-2 flex-auto'>
                <Label className='text-xs'>Label</Label>
                <Input
                  type='text'
                  placeholder='Label link'
                  value={link.label}
                  onChange={(event) =>
                    setProject({
                      ...project,
                      links: project?.links?.map((item: Link) =>
                        item.label === link.label
                          ? { ...item, label: event.target.value }
                          : item
                      ),
                    })
                  }
                  required
                />
                <Label className='text-xs'>Link</Label>
                <Input
                  type='text'
                  placeholder='Link'
                  value={link.url}
                  onChange={(event) =>
                    setProject({
                      ...project,
                      links: project?.links?.map((item: Link) =>
                        item.url === link.url
                          ? { ...item, url: event.target.value }
                          : item
                      ),
                    })
                  }
                  required
                />
              </div>
              <Button
                size='icon'
                className='rounded-full'
                type='button'
                onClick={() =>
                  setProject({
                    ...project,
                    links: project?.links?.filter(
                      (item: Link) => item.url !== link.url
                    ),
                  })
                }
              >
                <Minus className='h-4 w-4' />
              </Button>
            </div>
          </div>
        ))}
        <div>
          <Button
            type='button'
            onClick={() => {
              setProject({
                ...project,
                links: [...(project?.links || []), { label: '', url: '' }],
              });
            }}
            variant={'secondary'}
          >
            Add New Link
          </Button>
        </div>
      </div>
    </>
  );
}
