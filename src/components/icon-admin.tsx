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
import { useEffect } from 'react';

export default function IconAdmin() {
  const router = useRouter();
  const [isAdminLoggedData, setIsAdminLoggedData] = useRecoilState<boolean>(
    isAdminLoggedDataState
  );
  const [information, setInformation] =
    useRecoilState<InformationSchema>(informationDataState);

  useEffect(() => {
    getInformation(setInformation);
  }, []);

  const signOut = async () => {
    try {
      await auth.signOut();
      localStorage.removeItem('admin');
      setIsAdminLoggedData(false);
      router.push('/');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {information.profileImageLink && (
          <Image
            className='h-8 w-8 rounded-full'
            src={information.profileImageLink}
            alt='profile'
            width={300}
            height={300}
          />
        )}
      </DropdownMenuTrigger>
      {isAdminLoggedData && (
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
  );
}
