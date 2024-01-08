import Hero from '@/components/hero.component';
import ProjectsListUser from '@/components/project/projects-list-user.component';
import { useTranslations } from 'next-intl';

export default function Index() {
  const t = useTranslations('index');
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
