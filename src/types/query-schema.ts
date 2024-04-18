import { FieldPath, OrderByDirection, WhereFilterOp } from 'firebase/firestore';

export type WhereSchema = {
  fieldPath: string | FieldPath;
  opStr: WhereFilterOp;
  value: string | boolean;
};

export type OrderBySchema = {
  fieldPath: string | FieldPath;
  directionStr?: OrderByDirection;
};
