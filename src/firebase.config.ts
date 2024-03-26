import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'file-vault-53623.firebaseapp.com',
  projectId: 'file-vault-53623',
  storageBucket: 'file-vault-53623.appspot.com',
  messagingSenderId: '915184895803',
  appId: '1:915184895803:web:be58645992eb772d9d591e',
};

export const app = initializeApp(firebaseConfig);
