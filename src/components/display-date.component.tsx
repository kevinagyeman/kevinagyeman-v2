'use client';

import { Timestamp } from 'firebase/firestore';
import React from 'react';

type DisplayDateProps = {
  startDate?: Timestamp;
  endDate?: Timestamp;
};

export default function DisplayDate({ startDate, endDate }: DisplayDateProps) {
  return (
    <p>
      {/* {start && (
        <span className='text-muted'>
          {`${start}`} - {`${end}` || 'Present'}
        </span>
      )} */}
      ciao
    </p>
  );
}
