import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  // Add your Firebase config here
  // For development, you can use these placeholder values
  // Replace with your actual Firebase project config
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "hill-sync-transit",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;