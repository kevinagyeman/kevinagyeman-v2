'use client';

import InformationUpdate from '@/components/information/information-update.component';
import { RecoilRoot } from 'recoil';

export default function InformationAdmin() {
  return (
    <RecoilRoot>
      <InformationUpdate />
    </RecoilRoot>
  );
}
