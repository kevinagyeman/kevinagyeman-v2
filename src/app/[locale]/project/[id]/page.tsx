import PageNotFound from '@/components/page-not-found.component';
import ProjectsInfo from '@/components/project/projects-info.component';
import { ProjectSchema } from '@/types/project-schema';
import { getSingleProject } from '@/utils/server-utils';
import { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: { id: string; locale: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const project: ProjectSchema | undefined = await getSingleProject(params.id);

  return {
    title: `Kevin Agyeman | ${project?.title}`,
    description: `${project?.shortDescription}`,
    keywords: [`${project?.skills}`],
    openGraph: {
      title: `Kevin Agyeman | ${project?.title}`,
      description: `${project?.shortDescription}`,
      url: 'https://kevinagyeman.com',
      siteName: 'Kevin Agyeman',
      images: [
        {
          url: `${project?.imageLink}`,
          width: 800,
          height: 600,
        },
        {
          url: `${project?.imageLink}`,
          width: 1800,
          height: 1600,
        },
      ],
      locale: params.locale,
      type: 'website',
    },
  };
}

export default async function Project({ params }: { params: { id: string } }) {
  const project: ProjectSchema | undefined = await getSingleProject(params.id);

  if (project?.id) {
    return <ProjectsInfo project={JSON.parse(JSON.stringify(project))} />;
  } else {
    return <PageNotFound />;
  }
}
