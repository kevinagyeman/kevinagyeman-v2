import React, { useEffect, useState } from 'react';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Minus, Plus } from 'lucide-react';
import { useRecoilState } from 'recoil';
import { Link, ProjectSchema } from '@/types/project-schema';
import { projectDataState } from '@/store/projects-store';

export default function LinkInput() {
  const [project, setProject] = useRecoilState<ProjectSchema>(projectDataState);
  const [links, setLinks] = useState<Link[]>(
    project.links ? project.links : []
  );

  const handleAddLink = () => {
    const newLink: Link = { label: '', url: '' };
    setLinks([...links, newLink]);
  };

  const handleRemoveLink = (index: number) => {
    const updatedLinks: Link[] = [...links];
    updatedLinks.splice(index, 1);
    setLinks(updatedLinks);
  };

  const handleLabelChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updatedLinks: Link[] = [...links];
    updatedLinks[index].label = event.target.value;
    setLinks(updatedLinks);
  };

  const handleUrlChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updatedLinks: Link[] = [...links];
    updatedLinks[index].url = event.target.value;
    setLinks(updatedLinks);
  };

  useEffect(() => {
    console.log(project.links);
  }, [project]);

  return (
    <>
      <Label>Link Input</Label>
      <div className='flex flex-col gap-3'>
        {links.map((link: Link, index: number) => (
          <div key={index}>
            <div className='flex flex-row gap-3 items-center p-4 bg-secondary rounded-lg mt-2'>
              <div className='flex flex-col gap-y-2 flex-auto'>
                <Input
                  type='text'
                  placeholder='Label link'
                  value={link.label}
                  onChange={(event) => handleLabelChange(event, index)}
                  required
                />
                <Input
                  type='text'
                  placeholder='Link'
                  value={link.url}
                  onChange={(event) => handleUrlChange(event, index)}
                  required
                />
              </div>
              <Button
                size='icon'
                className='rounded-full'
                type='button'
                onClick={() => handleRemoveLink(index)}
              >
                <Minus className='h-4 w-4' />
              </Button>
            </div>
          </div>
        ))}
        <div>
          <Button
            type='button'
            onClick={() => handleAddLink()}
            variant={'secondary'}
          >
            Add New Link
          </Button>
          <Button
            type='button'
            onClick={() => setProject({ ...project, links: links })}
            variant={'secondary'}
          >
            confirm
          </Button>
        </div>
      </div>
    </>
  );
}
