import { createSlice } from '@reduxjs/toolkit';
import { dbFile } from '../../types';

const initialState = {
  files: [] as dbFile[],
};

const fileSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {
    fetchFilesDB: (state, action) => {
      state.files = action.payload;
    },
    addNewFile: (state, action) => {
      state.files = [...state.files, action.payload];
    },
    updatedFiles: (state, action) => {
      state.files = action.payload;
    },
    moveToTrash: (state, action) => {
      state.files = action.payload;
    },
  },
});

export const { fetchFilesDB, addNewFile, moveToTrash, updatedFiles } =
  fileSlice.actions;

export default fileSlice.reducer;
