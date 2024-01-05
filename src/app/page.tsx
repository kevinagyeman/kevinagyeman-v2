import Hero from '@/components/hero.component';
import ProjectsListUser from '@/components/project/projects-list-user.component';
import { signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function Home() {
  // const session = useSession({
  //   required: true,
  //   onUnauthenticated() {
  //     redirect('/login');
  //   },
  // });
  return (
    <>
      <Hero />
      <ProjectsListUser />
    </>
  );
}

// Home.requireAuth = true;
