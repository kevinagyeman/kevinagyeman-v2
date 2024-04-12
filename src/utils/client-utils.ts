import { storage } from '@/firebase';
import { informationService } from '@/services/information.service';
import { projectService } from '@/services/project.service';
import { InformationSchema } from '@/types/information-schema';
import { ProjectSchema } from '@/types/project-schema';
import { OrderBySchema, WhereSchema } from '@/types/query-schema';
import { Timestamp } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
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

export const clientUpload = async (image: any, storagePath: string) => {
  try {
    if (image) {
      const imgRef = ref(storage, storagePath);
      const value = await uploadBytes(imgRef, image);
      const url = await getDownloadURL(value.ref);
      return url;
    }
  } catch (e) {
    console.log(e);
  }
};

export const clientFormatDate = (
  date: Timestamp | undefined
): string | undefined => {
  if (date) {
    const dateFormatted = new Date(date.seconds * 1000).toLocaleString([], {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
    return dateFormatted;
  }
};

export const clientEditButton = (
  isInputDisabled: boolean,
  setIsInputDisabled: React.Dispatch<React.SetStateAction<boolean>>,
  id: string,
  setHook: SetterOrUpdater<ProjectSchema | InformationSchema>
) => {
  if (isInputDisabled) {
    setIsInputDisabled(false);
  } else {
    clientGetSingleProject(id, setHook);
    setIsInputDisabled(true);
  }
};
