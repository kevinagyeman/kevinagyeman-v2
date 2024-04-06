import ProjectsInfo from '@/components/project/projects-info.component';
import { ProjectSchema } from '@/types/project-schema';
import { getSingleProject, serverSplitByLanguage } from '@/utils/utils';
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
    title: `Kevin Agyeman | ${await serverSplitByLanguage(
      `${project?.title}`
    )}`,
    description: `${await serverSplitByLanguage(
      `${project?.shortDescription}`
    )}`,
    keywords: [`${project?.skills}`],
    openGraph: {
      title: `Kevin Agyeman | ${await serverSplitByLanguage(
        `${project?.title}`
      )}`,
      description: `${await serverSplitByLanguage(
        `${project?.shortDescription}`
      )}`,
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

export default function Project({ params }: { params: { id: string } }) {
  if (params.id) {
    return (
      <>
        <ProjectsInfo projectId={params.id} />
      </>
    );
  }
}
