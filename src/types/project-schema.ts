import { Timestamp } from 'firebase/firestore';
import { Url } from './url-schema';

export type ProjectSchema = {
  id: string;
  title?: string;
  shortDescription?: string;
  description?: string;
  imageLink?: string;
  links?: Url[];
  skills?: string[];
  isPublished?: boolean;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
  startDate?: Timestamp;
  endDate?: Timestamp;
  isPresentDate?: boolean;
  type?: 'project' | 'work' | 'education' | 'other';
  company?: string;
};
