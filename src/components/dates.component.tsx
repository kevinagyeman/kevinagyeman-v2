import { clientFormatDateDashboard } from '@/utils/client-utils';
import { Timestamp } from 'firebase/firestore';
import React from 'react';

type DatesProps = {
  updatedAt?: Timestamp;
  createdAt?: Timestamp;
};

export default function Dates({ createdAt, updatedAt }: DatesProps) {
  return (
    <div className='flex flex-col mb-4'>
      <small className='text-secondary'>
        Updated At: {clientFormatDateDashboard(updatedAt)}
      </small>
      <small className='text-secondary'>
        Created At: {clientFormatDateDashboard(createdAt)}
      </small>
    </div>
  );
}
