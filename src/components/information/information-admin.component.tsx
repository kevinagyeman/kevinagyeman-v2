import { informationDataState } from '@/store/information-store';
import { InformationSchema } from '@/types/information-schema';
import { Pencil } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRecoilState } from 'recoil';
import SkillsList from '../skills-list.component';
import { Button } from '../ui/button';

export default function InformationInfoAdmin() {
  const [information, setInformation] =
    useRecoilState<InformationSchema>(informationDataState);

  return (
    <div className='flex flex-col gap-y-5'>
      <div>
        {information.profileImageLink && (
          <Image
            src={information.profileImageLink}
            className='rounded-full'
            alt='profile image'
            width='0'
            height='0'
            sizes='100vw'
            style={{ width: '100%', height: 'auto', maxWidth: '150px' }}
          />
        )}
      </div>
      <h4 className='text-xl font-semibold'>
        {information?.name} {information?.surname}
      </h4>
      <p>{information?.role}</p>
      <p className='text-muted-foreground font-extralight'>
        {information?.summary}
      </p>
      {information?.skills && (
        <SkillsList
          skills={information?.skills}
          type='detail'
          centered={true}
        />
      )}
      {information && (
        <p className='font-extralight'>{information.additionalInfo}</p>
      )}
      <p className='font-semibold'>{information?.email}</p>
      <div>
        <Button asChild variant={'secondary'}>
          <Link href={'/admin/dashboard/information-edit'}>
            Edit information <Pencil className='w-4 h-4 ml-2' />
          </Link>
        </Button>
      </div>
    </div>
  );
}
