import Hero from '@/components/hero.component';
import ProjectsListUser from '@/components/project/projects-list-user.component';
import WorkListUser from '@/components/work-list-user.component';
import { InformationSchema } from '@/types/information-schema';
import { ProjectSchema } from '@/types/project-schema';
import { getInformation, getProjects } from '@/utils/server-utils';

export default async function Index() {
  const projectsList: ProjectSchema[] | undefined = await getProjects(
    {
      fieldPath: 'createdAt',
      directionStr: 'desc',
    },
    [
      {
        fieldPath: 'isPublished',
        opStr: '==',
        value: true,
      },
      {
        fieldPath: 'type',
        opStr: '==',
        value: 'project',
      },
    ]
  );
  const worksList: ProjectSchema[] | undefined = await getProjects(
    {
      fieldPath: 'createdAt',
      directionStr: 'desc',
    },
    [
      {
        fieldPath: 'isPublished',
        opStr: '==',
        value: true,
      },
      {
        fieldPath: 'type',
        opStr: '==',
        value: 'work',
      },
    ]
  );
  const information: InformationSchema | undefined = await getInformation();
  return (
    <>
      {information ? (
        <Hero information={JSON.parse(JSON.stringify(information))} />
      ) : null}
      {projectsList ? (
        <ProjectsListUser projects={JSON.parse(JSON.stringify(projectsList))} />
      ) : null}
      {worksList ? (
        <WorkListUser worksList={JSON.parse(JSON.stringify(worksList))} />
      ) : null}
    </>
  );
}
