import Hero from '@/components/hero.component';
import ProjectsListUser from '@/components/project/projects-list-user.component';
import { useTranslations } from 'next-intl';

export default function Index() {
  return (
    <>
      <Hero />
      <ProjectsListUser />
    </>
  );
}
