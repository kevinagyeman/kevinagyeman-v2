'use client';

import React from 'react';
import { Button } from './ui/button';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Url } from '@/types/url-schema';

type LinksListProps = {
  links: Url[];
};

export default function LinksList({ links }: LinksListProps) {
  return (
    <div className='flex flex-wrap gap-x-3 gap-y-1'>
      {links.map((link: Url, index: number) => (
        <Button key={index} asChild>
          <Link href={link.url} target='_blank'>
            {link.label} <ArrowUpRight className='ml-2 w-5 h-5' />
          </Link>
        </Button>
      ))}
    </div>
  );
}
