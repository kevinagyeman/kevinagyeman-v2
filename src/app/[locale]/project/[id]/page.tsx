import ProjectsInfo from '@/components/project/projects-info.component';

export default function Project({ params }: { params: { id: string } }) {
  if (params.id) {
    return (
      <>
        <ProjectsInfo projectId={params.id} />
      </>
    );
  }
}
