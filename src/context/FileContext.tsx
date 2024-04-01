import { createContext, useState } from 'react';
import { useFileOperations } from '../hooks/useFileOperations';
import { useSelector } from 'react-redux';
import { dbFile } from '../types';
import toast from 'react-hot-toast';

interface FileContextType {
  files: dbFile[];
  setFiles: React.Dispatch<React.SetStateAction<dbFile[]>>;
  addFile: Function;
  getUserFiles: Function;
  moveToTrash: Function;
}

const initialState: FileContextType = {
  files: [],
  setFiles: () => {},
  addFile: () => {},
  getUserFiles: () => {},
  moveToTrash: () => {},
};

export const FileContext = createContext<FileContextType>(initialState);

export const FileProvider = ({ children }: { children: React.ReactNode }) => {
  const { addFileDB, moveToTrashDB } = useFileOperations();
  const { currentUser } = useSelector((state: any) => state.user);
  const [files, setFiles] = useState<dbFile[]>([]);

  const getUserFiles = async (userId: string) => {
    const res = await fetch(
      `https://filevault.onrender.com/api/file/${userId}`
    );
    const data = await res.json();
    setFiles(data.files);
  };

  const addFile = (file: File) => {
    const newFile = {
      fileName: file.name.split('.')[0],
      fileSize: +(file.size / 1000000).toFixed(2),
      mimeType: file.type,
    };
    setFiles((prev) => [...prev, newFile]);

    addFileDB(
      `https://filevault.onrender.com/api/file/${currentUser._id}`,
      newFile
    );
  };

  const moveToTrash = (fileArg: dbFile) => {
    toast.success(`${fileArg.fileName} moved to trash`);
    moveToTrashDB(`https://filevault.onrender.com/api/file/${fileArg._id}`);
    setFiles(
      files.filter((file) => {
        return file._id !== fileArg._id;
      })
    );
  };

  return (
    <FileContext.Provider
      value={{
        files,
        setFiles,
        addFile,
        getUserFiles,
        moveToTrash,
      }}
    >
      {children}
    </FileContext.Provider>
  );
};
