'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { auth } from '@/firebase';
import { isAdminLoggedDataState } from '@/store/admin-store';
import { AdminData } from '@/types/admin-schema';
import { FormFieldSchema } from '@/types/form-field-schema';
import { UserCredential, signInWithEmailAndPassword } from 'firebase/auth';
import { redirect, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { signIn, useSession } from 'next-auth/react';
import { useLocale } from 'next-intl';

export default function Login() {
  const [admin, setUser] = useState<AdminData>({
    email: '',
    password: '',
  });

  const locale = useLocale();
  const { data: session, status } = useSession();

  if (status === 'authenticated') {
    redirect('/');
  }

  const formFields: FormFieldSchema[] = [
    {
      label: 'Email',
      type: 'text',
      required: true,
      onChange: (e) => {
        setUser({ ...admin, email: e.target.value });
      },
    },
    {
      label: 'Password',
      type: 'password',
      required: true,
      onChange: (e) => {
        setUser({ ...admin, password: e.target.value });
      },
    },
  ];

  const logIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signIn('credentials', {
      email: admin.email,
      password: admin.password,
      redirect: true,
      callbackUrl: `/${locale}/admin/dashboard`,
    });
  };

  return (
    <>
      <div className='flex  w-full flex-col items-center justify-center align-middle'>
        <div className='w-80  rounded-lg border p-6'>
          <h3 className='mb-3 scroll-m-20 text-2xl font-semibold tracking-tight'>
            Login
          </h3>
          <form onSubmit={(e) => logIn(e)}>
            {formFields.map((field: FormFieldSchema, index: number) => (
              <div className='my-5' key={index}>
                <Label>{field.label}</Label>
                <Input
                  required={field.required}
                  type={field.type}
                  placeholder={field.label}
                  onChange={field.onChange}
                  disabled={field.disabled}
                  autoComplete='on'
                />
              </div>
            ))}
            <Button type='submit' className='mt-3 w-full'>
              Login
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
