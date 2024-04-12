import { clientFormatDate } from '@/utils/client-utils';
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
        Updated At: {clientFormatDate(updatedAt)}
      </small>
      <small className='text-secondary'>
        Created At: {clientFormatDate(createdAt)}
      </small>
    </div>
  );
}
