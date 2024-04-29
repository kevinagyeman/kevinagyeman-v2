import { Timestamp } from 'firebase/firestore';
import { Link } from './project-schema';

export type InformationSchema = {
  id: string;
  name?: string;
  surname?: string;
  role?: string;
  summary?: string;
  profileImageLink?: string;
  skills?: string[];
  email?: string;
  links?: Link[];
  additionalLink?: string;
  additionalInfo?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
};
