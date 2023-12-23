import { Button } from '@/components/ui/button';
import { getInformation } from '@/utils/utils';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import SkillsList from '../skills-list.component';

const InformationInfo = async () => {
  const information: any = await getInformation();

  return (
    <>
      <div className='flex flex-col space-y-6'>
        <div>
          {information.profileImageLink && (
            <Image
              src={information.profileImageLink}
              className='h-44 rounded-full'
              alt='profile image'
            />
          )}
        </div>
        <h2 className='text-3xl font-semibold'>
          {information.name} {information.surname}
        </h2>
        <div>
          <code className='relative rounded bg-muted px-[0.4rem] py-[0.2rem] font-mono text-sm'>
            {information?.role}
          </code>
        </div>
        <p className=' text-xl text-muted-foreground'>
          {/* {splitByLanguage(`${information?.summary}`)} */}
        </p>
        <SkillsList string={`${information?.skills}`} />
        <p className=' text-xl'>
          {/* {splitByLanguage(`${information.additionalInfo}`)} */}
        </p>

        <div className='flex space-x-2'>
          {information.additionalLink && (
            <Button
              variant={'secondary'}
              className='w-full'
              size={'lg'}
              asChild
            >
              <Link href={information.additionalLink} target='_blank'>
                {/* {t('readCv')} <ArrowUpRight className='ml-2 h-5 w-5' /> */}
              </Link>
            </Button>
          )}
          <Button variant={'outline'} size={'lg'} asChild className='ml-auto'>
            <Link href='/'>
              <ArrowLeft className='h-5 w-5' />
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default InformationInfo;
