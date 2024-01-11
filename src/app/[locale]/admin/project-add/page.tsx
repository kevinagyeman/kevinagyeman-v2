import ProjectsAdd from '@/components/project/projects-add.component';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../../pages/api/auth/[...nextauth]';
import { redirect } from 'next/navigation';

export default function ProjectAdd() {
  return (
    <>
      <h2 className='mb-5 text-3xl font-semibold'>Add New Project</h2>
      <ProjectsAdd />
    </>
  );
}
