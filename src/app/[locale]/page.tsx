import Hero from '@/components/hero.component';
import ProjectsListUser from '@/components/project/projects-list-user.component';
import { signOut, useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { redirect } from 'next/navigation';

export default function Index() {
  const t = useTranslations('Index');
  // const session = useSession({
  //   required: true,
  //   onUnauthenticated() {
  //     redirect('/login');
  //   },
  // });
  return (
    <>
      <h1>{t('title')}</h1>;
      {/* <Hero />
      <ProjectsListUser /> */}
    </>
  );
}

// Home.requireAuth = true;
