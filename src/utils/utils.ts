import i18n from '@/i18n';
import { informationService } from '@/services/information.service';
import { projectService } from '@/services/project.service';
import { InformationSchema } from '@/types/information-schema';
import { ProjectSchema } from '@/types/project-schema';
import { OrderBySchema, WhereSchema } from '@/types/query-schema';
import { SetterOrUpdater } from 'recoil';

// export const splitByLanguage = (string: string): string => {
//   const itString = string.split('ENG')[0];
//   const enString = string.split('ENG')[1];

//   if (i18n.language === 'en-GB') {
//     return enString;
//   } else {
//     return itString;
//   }
// };

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

// export const getInformationServer = async () => {
//   try {
//     const data = await informationService.getById();
//     if (data) {
//       const currentInformation: InformationSchema = {
//         ...data,
//         id: data.id,
//       };
//       return currentInformation;
//     }
//   } catch (e) {
//     console.log(e);
//   }
// };
