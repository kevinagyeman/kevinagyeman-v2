import { informationDataState } from '@/store/information-store';
import { InformationSchema } from '@/types/information-schema';
import { ChevronRight, Send } from 'lucide-react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilState } from 'recoil';
import SkeletonLoader from './skeleton.component';
import SkillsList from './skills-list.component';
import { Button } from './ui/button';
import Link from 'next/link';
import { informationService } from '@/services/information.service';
import { getInformation } from '@/utils/utils';

const Hero = async () => {
  // const { t } = useTranslation();
  const information: any = await getInformation();

  return (
    <>
      {!information.id ? (
        <SkeletonLoader />
      ) : (
        <div
          className='mb-8 
        flex flex-col space-y-5'
        >
          <div>
            <code className='relative rounded bg-muted px-[0.4rem] py-[0.2rem] font-mono text-sm'>
              {information?.role}
            </code>
          </div>
          <h1 className='text-4xl font-extrabold lg:text-5xl'>
            {information?.name} {information?.surname}
          </h1>
          <p className='text-l line-clamp-2 text-muted-foreground lg:text-xl'>
            {information?.summary}
          </p>
          <SkillsList string={`${information?.skills}`} numberOfSkills={4} />
          <div className='flex flex-wrap gap-3'>
            <Button variant={'secondary'} size={'lg'} asChild>
              <Link href='/contact'>
                {/* {t('hero.contactButton')} */}
                <Send className='ml-2 h-4 w-4' />
              </Link>
            </Button>
            <Button variant={'outline'} size={'lg'} asChild>
              <Link href='/about'>
                {/* {t('hero.readMoreButton')} */}
                <ChevronRight className='h-5 w-5' />
              </Link>
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;
