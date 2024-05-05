import { Timestamp } from 'firebase/firestore';
import { Url } from './url-schema';

export type InformationSchema = {
  id: string;
  name?: string;
  surname?: string;
  role?: string;
  summary?: string;
  profileImageLink?: string;
  skills?: string[];
  email?: string;
  links?: Url[];
  additionalInfo?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
};
