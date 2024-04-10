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
import { informationDataState } from '@/store/information-store';
import { InformationSchema } from '@/types/information-schema';
import { useRecoilState } from 'recoil';
import { clientGetInformation } from '@/utils/client-utils';
import { useEffect } from 'react';

export default function IconAdmin() {
  const { data: session, status } = useSession();
  const [information, setInformation] =
    useRecoilState<InformationSchema>(informationDataState);

  useEffect(() => {
    clientGetInformation(setInformation);
  }, [setInformation]);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {information.profileImageLink && (
            <Image
              className='h-8 w-8 rounded-full'
              src={information.profileImageLink}
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
