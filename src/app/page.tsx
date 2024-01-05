'use client';
import Hero from '@/components/hero.component';
import ProjectsListUser from '@/components/project/projects-list-user.component';
import { signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function Home() {
  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/signin');
    },
  });
  return (
    <>
      <div className='p-8'>
        <div className='text-white'>{session?.data?.user?.email}</div>
        <button className='text-white' onClick={() => signOut()}>
          Logout
        </button>
      </div>
      {/* <Hero />
      <ProjectsListUser /> */}
    </>
  );
}

Home.requireAuth = true;
