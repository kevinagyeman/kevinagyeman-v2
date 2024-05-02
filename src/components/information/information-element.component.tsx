'use client';

import { informationDataState } from '@/store/information-store';
import { InformationSchema } from '@/types/information-schema';
import { clientGetInformation } from '@/utils/client-utils';
import Image from 'next/image';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import SkillsList from '../skills-list.component';
import InformationUpdate from './information-update.component';
import InformationInfoAdmin from './information-admin.component';

export default function InformationElement() {
  const [information, setInformation] =
    useRecoilState<InformationSchema>(informationDataState);

  useEffect(() => {
    clientGetInformation(setInformation);
  }, [setInformation]);
  return (
    <>
      <InformationInfoAdmin />
    </>
  );
}
