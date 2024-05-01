'use client';
import { splitSkills } from '@/utils/server-utils';
import { Badge } from './ui/badge';
import { Check } from 'lucide-react';

type SkillsListProps = {
  skills: string[];
  numberOfSkills?: number;
  type: 'homepage' | 'detail';
  centered?: boolean;
};

export default function SkillsList({
  skills,
  numberOfSkills,
  type,
  centered,
}: SkillsListProps) {
  if (skills) {
    if (type === 'detail') {
      return (
        <div className='flex flex-wrap gap-x-3 gap-y-3'>
          {skills.map((skill, index) => (
            <Badge variant='secondary' key={index} className='font-normal'>
              # {skill}
            </Badge>
          ))}
        </div>
      );
    } else if (type === 'homepage') {
      return (
        <div
          className={
            centered
              ? 'justify-center flex flex-wrap gap-x-3 gap-y-1'
              : 'flex flex-wrap gap-x-3 gap-y-1'
          }
        >
          {skills.slice(0, numberOfSkills).map((skill, index) => (
            <p key={index} className='flex items-center gap-1'>
              <Check className='h-4 w-4' />
              {skill}
            </p>
          ))}
        </div>
      );
    }
  }
}
