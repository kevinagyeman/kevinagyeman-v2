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

export default function BreadcrumbMenu(): ReactElement {
  const t = useTranslations('navbar');
  const pathname = usePathname();
  const splittedPathName = pathname?.split('/').slice(-1).join('');

  const getPageName = () => {
    switch (splittedPathName) {
      case 'about':
        return t('about');
      case 'contact':
        return t('contacts');
      case '':
        return '';
      default:
        return t('project');
    }
  };
  const pageName = getPageName();

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
