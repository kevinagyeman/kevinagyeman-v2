import { informationService } from '@/services/information.service';
import { projectService } from '@/services/project.service';
import { InformationSchema } from '@/types/information-schema';
import { ProjectSchema } from '@/types/project-schema';
import { OrderBySchema, WhereSchema } from '@/types/query-schema';
import { SetterOrUpdater } from 'recoil';

export const clientGetSingleProject = async (
  projectId: string,
  projectSetter: SetterOrUpdater<ProjectSchema>
) => {
  const data = await projectService.getById(projectId);
  if (data) {
    const currentProject: ProjectSchema = {
      ...data,
      id: data.id,
    };
    projectSetter(currentProject);
  }
};

export const clientGetProjects = async (
  projectsSetter: SetterOrUpdater<ProjectSchema[]>,
  orderByValue: OrderBySchema,
  whereValue?: WhereSchema
) => {
  const data = await projectService.getAll(orderByValue, whereValue);
  if (data) {
    projectsSetter(data);
  }
};

export const clientGetInformation = async (
  informationSetter: SetterOrUpdater<InformationSchema>
) => {
  const data = await informationService.getById();
  if (data) {
    const currentInformation: InformationSchema = {
      ...data,
      id: data.id,
    };
    informationSetter(currentInformation);
  }
};
