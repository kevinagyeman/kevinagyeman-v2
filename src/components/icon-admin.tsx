'use client';

import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import Link from 'next/link';

export default function IconAdmin() {
  const { data: session, status } = useSession();
  const adminImageLink =
    'https://firebasestorage.googleapis.com/v0/b/kevinagyeman-db.appspot.com/o/profile-photo.jpg?alt=media&token=45868e69-9037-4b08-86f0-b7a7ab5367c9';

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {adminImageLink && (
            <Image
              className='h-8 w-8 rounded-full'
              src={adminImageLink}
              alt='profile'
              width={32}
              height={32}
            />
          )}
        </DropdownMenuTrigger>

        <DropdownMenuContent className='w-56'>
          <DropdownMenuGroup>
            {status === 'authenticated' ? (
              <DropdownMenuItem
                onClick={() => signOut()}
                className='cursor-pointer'
              >
                Logout
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem className='cursor-pointer' asChild>
                <Link href='/login' rel='canonical' prefetch={true}>
                  Login
                </Link>
              </DropdownMenuItem>
            )}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
