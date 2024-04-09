import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBB3-oIhRJGYZz1fLfyh0qWBiGfLlvGYCk',
  authDomain: 'kevinagyeman-db.firebaseapp.com',
  projectId: 'kevinagyeman-db',
  storageBucket: 'kevinagyeman-db.appspot.com',
  messagingSenderId: '1860106427',
  appId: '1:1860106427:web:4e3c261454bae0651d919e',
  measurementId: 'G-THFVBS56D2',
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();
const storage = getStorage(app);

export { app, auth, db, storage };
