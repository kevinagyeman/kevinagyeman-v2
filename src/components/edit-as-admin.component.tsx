import React from 'react';
import { Button } from './ui/button';
import Link from 'next/link';
import { LockKeyhole } from 'lucide-react';
import { useSession } from 'next-auth/react';

type EditAsAdminProps = {
  href: string;
};

export default function EditAsAdmin({ href }: EditAsAdminProps) {
  const { data: session, status } = useSession();
  const isAdminLogged = status === 'authenticated';

  return (
    <>
      {isAdminLogged ? (
        <Button asChild size={'sm'} className='w-[150px]' variant={'ghost'}>
          <Link href={href} className='text-cyan-500'>
            Edit as admin <LockKeyhole className='w-4 h-4 ml-2' />
          </Link>
        </Button>
      ) : null}
    </>
  );
}
