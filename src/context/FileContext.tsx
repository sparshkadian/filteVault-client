import { createContext, useState } from 'react';
import { useFileOperations } from '../hooks/useFileOperations';
import { useSelector } from 'react-redux';
import { dbFile } from '../types';

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
    const res = await fetch(`http://localhost:4100/api/file/${userId}`);
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

    addFileDB(`http://localhost:4100/api/file/${currentUser._id}`, newFile);
  };

  const moveToTrash = (fileId: string) => {
    moveToTrashDB(`http://localhost:4100/api/file/${fileId}`);
    setFiles(
      files.filter((file) => {
        return file._id !== fileId;
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
