import { createContext } from 'react';
import { useFileOperations } from '../hooks/useFileOperations';
import { useSelector } from 'react-redux';
import { dbFile } from '../types';
import toast from 'react-hot-toast';
import { fetchFilesDB, addNewFile } from '../redux/file/fileSlice';
import { useDispatch } from 'react-redux';

interface FileContextType {
  addFile: Function;
  getUserFiles: Function;
  moveToTrash: Function;
}

const initialState: FileContextType = {
  addFile: () => {},
  getUserFiles: () => {},
  moveToTrash: () => {},
};

export const FileContext = createContext<FileContextType>(initialState);

export const FileProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const { addFileDB, moveToTrashDB } = useFileOperations();
  const { currentUser } = useSelector((state: any) => state.user);

  const getUserFiles = async (userId: string) => {
    const res = await fetch(`http://localhost:4100/api/file/${userId}`);
    const data = await res.json();
    dispatch(fetchFilesDB(data.files));
  };

  const addFile = (file: File) => {
    const newFile = {
      fileName: file.name.split('.')[0],

      // Need a better size calculating function -> give in bytes i.e /1024
      // in MB if large again / 1024
      fileSize: +(file.size / 1024).toFixed(2),
      mimeType: file.type,
    };
    dispatch(addNewFile(newFile));
    addFileDB(`http://localhost:4100/api/file/${currentUser._id}`, newFile);
  };

  const moveToTrash = async (fileArg: dbFile) => {
    toast.success(`${fileArg.fileName} moved to trash`);
    moveToTrashDB(`http://localhost:4100/api/file/${fileArg._id}`);
  };

  return (
    <FileContext.Provider
      value={{
        addFile,
        getUserFiles,
        moveToTrash,
      }}
    >
      {children}
    </FileContext.Provider>
  );
};
