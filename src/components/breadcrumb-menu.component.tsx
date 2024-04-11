'use client';

import { usePathname } from 'next/navigation';
import { ReactElement, useEffect, useState } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from './ui/breadcrumb';
import { useTranslations } from 'next-intl';

type BreadcrumbMenuProps = {
  pageName: string;
};

export default function BreadcrumbMenu({
  pageName,
}: BreadcrumbMenuProps): ReactElement {
  const t = useTranslations('navbar');

  return (
    <>
      {pageName && (
        <Breadcrumb className='mb-8'>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href='/'>{t('home')}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{pageName}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )}
    </>
  );
}
