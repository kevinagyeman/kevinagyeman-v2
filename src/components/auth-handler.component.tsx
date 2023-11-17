'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AuthHandler(Component: any) {
  return function AuthHandler(props: any) {
    const isAdminLoggedData = localStorage.getItem('admin');
    const router = useRouter();
    useEffect(() => {
      if (!isAdminLoggedData) {
        router.push('/');
      }
    }, []);

    if (!isAdminLoggedData) {
      return null;
    }

    return <Component {...props} />;
  };
}
