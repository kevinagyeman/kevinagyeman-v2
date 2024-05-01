import {
  FirebaseApp,
  FirebaseOptions,
  getApp,
  getApps,
  initializeApp,
} from 'firebase/app';
import { Auth, getAuth } from 'firebase/auth';
import {
  Firestore,
  getFirestore,
  initializeFirestore,
} from 'firebase/firestore';
import { FirebaseStorage, getStorage } from 'firebase/storage';

const firebaseConfig: FirebaseOptions = {
  apiKey: 'AIzaSyBB3-oIhRJGYZz1fLfyh0qWBiGfLlvGYCk',
  authDomain: 'kevinagyeman-db.firebaseapp.com',
  projectId: 'kevinagyeman-db',
  storageBucket: 'kevinagyeman-db.appspot.com',
  messagingSenderId: '1860106427',
  appId: '1:1860106427:web:4e3c261454bae0651d919e',
  measurementId: 'G-THFVBS56D2',
};

const app: FirebaseApp = getApps().length
  ? getApp()
  : initializeApp(firebaseConfig);
initializeFirestore(app, {
  ignoreUndefinedProperties: true,
});
const db: Firestore = getFirestore(app);
const auth: Auth = getAuth(app);
const storage: FirebaseStorage = getStorage(app);

export { app, auth, db, storage };
