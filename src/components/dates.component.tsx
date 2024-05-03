import { clientFormatDateDashboard } from '@/utils/client-utils';
import { Timestamp } from 'firebase/firestore';
import React from 'react';

type DatesProps = {
  updatedAt?: Timestamp;
  createdAt?: Timestamp;
};

export default function Dates({ createdAt, updatedAt }: DatesProps) {
  return (
    <div className='flex flex-col'>
      <small className='text-muted-foreground'>
        Updated At: {clientFormatDateDashboard(updatedAt)}
      </small>
      <small className='text-muted-foreground'>
        Created At: {clientFormatDateDashboard(createdAt)}
      </small>
    </div>
  );
}
