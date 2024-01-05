'use client';
import { auth } from '@/firebase';
import { isAdminLoggedDataState } from '@/store/admin-store';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { InformationSchema } from '@/types/information-schema';
import { informationDataState } from '@/store/information-store';
import { getInformation } from '@/utils/utils';
import { useEffect, useState } from 'react';
import { signOut, useSession } from 'next-auth/react';

export default function IconAdmin() {
  const { data: session, status } = useSession();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {
            <Image
              className='h-8 w-8 rounded-full'
              src=''
              alt='profile'
              width={300}
              height={300}
            />
          }
        </DropdownMenuTrigger>
        {status === 'authenticated' && (
          <DropdownMenuContent className='w-56'>
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => signOut()}
                className='cursor-pointer'
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        )}
      </DropdownMenu>
    </>
  );
}
