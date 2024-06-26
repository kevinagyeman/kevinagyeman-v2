import { OrderBySchema, WhereSchema } from '@/types/query-schema';
import {
  DocumentData,
  FieldValue,
  FirestoreSettings,
  QueryFieldFilterConstraint,
  QuerySnapshot,
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  deleteField,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from '../firebase';
import { ProjectSchema } from '../types/project-schema';

const projectsCollection = collection(db, '/projects');

const setting: FirestoreSettings = {};
setting.ignoreUndefinedProperties = true;

const mappedProjects = (data: QuerySnapshot<DocumentData, DocumentData>) => {
  const result: ProjectSchema[] = data.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return result;
};

const deleteUndefinedField = (value: any) => {
  if (value !== undefined && value !== null) {
    return value;
  } else {
    return deleteField();
  }
};

export const projectService = {
  getAll: async (orderByValue: OrderBySchema, whereValue?: WhereSchema[]) => {
    try {
      const orderByQuery = orderBy(
        orderByValue.fieldPath,
        orderByValue.directionStr
      );
      const whereQueries = whereValue?.map((condition: WhereSchema) =>
        where(condition.fieldPath, condition.opStr, condition.value)
      );
      const finalQuery = whereQueries
        ? query(projectsCollection, ...whereQueries, orderByQuery)
        : query(projectsCollection, orderByQuery);

      const data = await getDocs(finalQuery);
      return mappedProjects(data);
    } catch (error) {
      console.error(error);
    }
  },

  create: async (project: ProjectSchema) => {
    try {
      await addDoc(projectsCollection, {
        ...project,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    } catch (error) {
      console.error(error);
    }
  },

  delete: async (id: string) => {
    try {
      const data = doc(projectsCollection, id);
      await deleteDoc(data);
    } catch (error) {
      console.error(error);
    }
  },

  update: async (projectId: string, project: ProjectSchema) => {
    try {
      const data = doc(projectsCollection, projectId);

      await updateDoc(data, {
        ...project,
        startDate: deleteUndefinedField(project.startDate),
        endDate: deleteUndefinedField(project.endDate),
        updatedAt: new Date(),
      });
    } catch (error) {
      console.error(error);
    }
  },

  getById: async (projectId: string) => {
    try {
      const data = await getDoc(doc(projectsCollection, projectId));
      if (data.exists()) {
        const result = { ...data.data(), id: data.id };
        return result;
      }
    } catch (error) {
      console.error(error);
    }
  },
};
