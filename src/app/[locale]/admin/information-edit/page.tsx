'use client';
import InformationUpdate from '@/components/information/information-update.component';
import { RecoilRoot } from 'recoil';

const InformationEdit = () => {
  return (
    <>
      <h2 className='mb-5 text-3xl font-semibold'>Edit information</h2>
      <RecoilRoot>
        <InformationUpdate />
      </RecoilRoot>
    </>
  );
};

export default InformationEdit;
