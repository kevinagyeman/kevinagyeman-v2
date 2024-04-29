'use client';

import React from 'react';
import { Button } from './ui/button';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

type LinksListProps = {
  links: any;
};

export default function LinksList({ links }: LinksListProps) {
  return (
    <div className='flex flex-wrap gap-x-3 gap-y-1'>
      {links.map((link: any, index: number) => (
        <Button key={index} variant={'outline'} asChild>
          <Link href={link.url} target='_blank'>
            {link.label} <ArrowUpRight className='ml-2 w-5 h-5' />
          </Link>
        </Button>
      ))}
    </div>
  );
}
