'use client';
import { splitSkills } from '@/utils/server-utils';
import { Badge } from './ui/badge';

type SkillsListProps = {
  skills: string[];
  numberOfSkills?: number;
};

export default function SkillsList({
  skills,
  numberOfSkills,
}: SkillsListProps) {
  if (skills) {
    return (
      <div className='flex flex-wrap gap-x-3 gap-y-3'>
        {skills.slice(0, numberOfSkills).map((skill, index) => (
          <Badge variant='secondary' key={index} className='font-normal'>
            # {skill}
          </Badge>
        ))}
      </div>
    );
  }
}
