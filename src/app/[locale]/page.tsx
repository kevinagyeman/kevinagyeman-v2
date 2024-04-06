import Hero from '@/components/hero.component';
import ProjectsListUser from '@/components/project/projects-list-user.component';
import { ProjectSchema } from '@/types/project-schema';
import { getProjects } from '@/utils/utils';

export default async function Index() {
  const projectsList: ProjectSchema[] | undefined = await getProjects(
    {
      fieldPath: 'createdAt',
      directionStr: 'desc',
    },
    {
      fieldPath: 'isPublished',
      opStr: '==',
      value: true,
    }
  );
  return (
    <>
      <Hero />
      {projectsList ? (
        <ProjectsListUser projects={JSON.parse(JSON.stringify(projectsList))} />
      ) : null}
    </>
  );
}
