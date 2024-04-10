'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AdminData } from '@/types/admin-schema';
import { FormFieldSchema } from '@/types/form-field-schema';
import { signIn, useSession } from 'next-auth/react';
import { useLocale } from 'next-intl';
import { redirect } from 'next/navigation';
import { useState, ReactElement } from 'react';

export default function Login(): ReactElement {
  const [admin, setAdmin] = useState<AdminData>({
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
        setAdmin({ ...admin, email: e.target.value });
      },
    },
    {
      label: 'Password',
      type: 'password',
      required: true,
      onChange: (e) => {
        setAdmin({ ...admin, password: e.target.value });
      },
    },
  ];

  const logIn = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      await signIn('credentials', {
        email: admin.email,
        password: admin.password,
        redirect: false,
        callbackUrl: `/${locale}/admin/dashboard`,
      });
    } catch (e) {}
  };

  return (
    <div className='container max-w-lg'>
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
            <Button
              type='submit'
              className='mt-3 w-full'
              disabled={!admin.email || !admin.password}
            >
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
