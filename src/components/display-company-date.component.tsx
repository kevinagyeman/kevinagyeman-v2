'use client';

import { clientFormatDateUser } from '@/utils/client-utils';
import { Timestamp } from 'firebase/firestore';
import React from 'react';
import { ReactElement } from 'react';

type DisplayCompanyDateProps = {
  company?: string;
  startDate?: Timestamp;
  endDate?: Timestamp;
  isPresentDate?: boolean;
};

export default function DisplayCompanyDate({
  company,
  startDate,
  endDate,
  isPresentDate,
}: DisplayCompanyDateProps): ReactElement {
  if (company && !startDate && !endDate) {
    return (
      <p className='line-clamp-1 text-muted-foreground text-sm italic'>
        {company}
      </p>
    );
  } else if (!company && startDate && !endDate) {
    return (
      <p className='line-clamp-1 text-muted-foreground text-sm italic'>
        {clientFormatDateUser(startDate)}
      </p>
    );
  } else if (company && startDate && endDate) {
    return (
      <p className='line-clamp-1 text-muted-foreground text-sm italic'>
        {company} • {clientFormatDateUser(startDate)} to{' '}
        {isPresentDate ? 'Present' : clientFormatDateUser(endDate)}
      </p>
    );
  } else if (company && !startDate && endDate) {
    return (
      <p className='line-clamp-1 text-muted-foreground text-sm italic'>
        {company} •{isPresentDate ? 'Present' : clientFormatDateUser(endDate)}
      </p>
    );
  } else if (!company && startDate && endDate) {
    return (
      <p className='line-clamp-1 text-muted-foreground text-sm italic'>
        {clientFormatDateUser(startDate)} to{' '}
        {isPresentDate ? 'Present' : clientFormatDateUser(endDate)}
      </p>
    );
  } else {
    return (
      <p className='line-clamp-1 text-muted-foreground text-sm italic'>-</p>
    );
  }
}
