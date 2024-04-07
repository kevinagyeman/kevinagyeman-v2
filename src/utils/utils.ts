import { informationService } from '@/services/information.service';
import { projectService } from '@/services/project.service';
import { InformationSchema } from '@/types/information-schema';
import { ProjectSchema } from '@/types/project-schema';
import { OrderBySchema, WhereSchema } from '@/types/query-schema';
import { useLocale } from 'next-intl';
import { getLocale } from 'next-intl/server';
import { SetterOrUpdater } from 'recoil';

export const serverSplitByLanguage = async (string: string) => {
  const locale = await getLocale();
  return languageHandler(locale, string);
};

export const ClientSplitByLanguage = (string: string) => {
  const locale = useLocale();
  return languageHandler(locale, string);
};

const languageHandler = (locale: string, string: string): string => {
  const itString = string.split('ENG')[0];
  const enString = string.split('ENG')[1];

  if (locale === 'en') {
    return enString;
  } else {
    return itString;
  }
};

export const splitSkills = (
  string: string,
  numberOfEelementsDisplayed?: number
): string[] => {
  const splittedString = string.split(',');
  if (!numberOfEelementsDisplayed) {
    return splittedString;
  } else {
    return splittedString.slice(0, numberOfEelementsDisplayed);
  }
};

export const getProjects = async (
  orderByValue: OrderBySchema,
  whereValue?: WhereSchema
) => {
  const data = await projectService.getAll(orderByValue, whereValue);
  if (data) {
    return data;
  }
};

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

export const getSingleProject = async (projectId: string) => {
  const data = await projectService.getById(projectId);
  if (data) {
    const currentProject: ProjectSchema = {
      ...data,
      id: data.id,
    };
    return currentProject;
  }
};

export const getInformation = async (): Promise<
  InformationSchema | undefined
> => {
  const data = await informationService.getById();
  if (data) {
    const currentInformation: InformationSchema = {
      ...data,
      id: data.id,
    };
    return currentInformation;
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
