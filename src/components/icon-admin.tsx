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

export default function IconAdmin() {
  const router = useRouter();
  const [isAdminLogged, setIsAdminLogged] = useState<boolean>();
  // const [information, setInformation] =
  //   useRecoilState<InformationSchema>(informationDataState);

  useEffect(() => {
    getInformation();
    auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAdminLogged(true);
      } else {
        setIsAdminLogged(false);
      }
    });
  }, []);

  const signOut = async () => {
    try {
      await auth.signOut();
      localStorage.removeItem('admin');
      setIsAdminLogged(false);
      router.push('/');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <p>loggato: {isAdminLogged}</p>
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
        {isAdminLogged && (
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
