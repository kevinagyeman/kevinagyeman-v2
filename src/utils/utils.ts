import { informationService } from '@/services/information.service';
import { projectService } from '@/services/project.service';
import { InformationSchema } from '@/types/information-schema';
import { ProjectSchema } from '@/types/project-schema';
import { OrderBySchema, WhereSchema } from '@/types/query-schema';
import { useLocale } from 'next-intl';
import { getLocale } from 'next-intl/server';

export const splitByLanguage = async (string: string) => {
  const locale = await getLocale();
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

export const getInformation = async () => {
  const data = await informationService.getById();
  if (data) {
    const currentInformation: InformationSchema = {
      ...data,
      id: data.id,
    };
    return currentInformation;
  }
};
