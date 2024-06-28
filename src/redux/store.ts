import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userSlice from './user/userSlice';
import fileSlice from './file/fileSlice';
import { dbFile } from '../types';
import { userType } from '../types';

const rootReducer = combineReducers({ user: userSlice, file: fileSlice });

export interface RootState {
  user: {
    currentUser: userType;
    loading: Boolean;
  };
  file: {
    files: dbFile[];
  };
}

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
