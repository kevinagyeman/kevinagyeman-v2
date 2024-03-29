import { Button } from '@/components/ui/button';
import { getInformation, splitByLanguage } from '@/utils/utils';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import SkillsList from '../skills-list.component';
import { Link } from '../../../navigation';
import { InformationSchema } from '@/types/information-schema';
import { getTranslations } from 'next-intl/server';

const InformationInfo = async () => {
  const information: InformationSchema | undefined = await getInformation();
  const t = await getTranslations('about');

  return (
    <>
      <div className='flex flex-col space-y-6'>
        <div>
          {information?.profileImageLink && (
            <Image
              src={information.profileImageLink}
              className='rounded-full'
              alt='Profile image'
              width={'176'}
              height={'176'}
            />
          )}
        </div>
        <h1 className='text-3xl font-semibold'>
          {information?.name} {information?.surname}
        </h1>
        <div>
          <h2>
            <code className='relative rounded bg-muted px-[0.4rem] py-[0.2rem] font-mono text-sm'>
              {information?.role}
            </code>
          </h2>
        </div>
        <p className=' text-xl text-muted-foreground'>
          {await splitByLanguage(`${information?.summary}`)}
        </p>
        <SkillsList string={`${information?.skills}`} />
        <p className=' text-xl'>
          {await splitByLanguage(`${information?.additionalInfo}`)}
        </p>

        <div className='flex space-x-2'>
          {information?.additionalLink && (
            <Button
              variant={'secondary'}
              className='w-full'
              size={'lg'}
              asChild
            >
              <Link
                href={information.additionalLink}
                target='_blank'
                rel='external'
              >
                {t('readResume')} <ArrowUpRight className='ml-2 h-5 w-5' />
              </Link>
            </Button>
          )}
          <Button variant={'outline'} size={'lg'} asChild className='ml-auto'>
            <Link href='/' rel='canonical'>
              <ArrowLeft className='h-5 w-5' />
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default InformationInfo;
