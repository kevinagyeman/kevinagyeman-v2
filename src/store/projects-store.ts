'use client';

import { ProjectSchema } from '@/types/project-schema';
import { atom } from 'recoil';

const projectData: ProjectSchema = {
  id: '',
  isPublished: false,
};

export const initProjectData: ProjectSchema = projectData;

export const projectDataState = atom({
  key: 'projectDataState',
  default: projectData,
});

export const initProjectsList: ProjectSchema[] = [];

export const projectsListState = atom({
  key: 'projectsListState',
  default: initProjectsList,
});
