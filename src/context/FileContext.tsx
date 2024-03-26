import { createContext, useState } from 'react';
import { useFileOperations } from '../hooks/useFileOperations';
import { useSelector } from 'react-redux';

export interface fileType {
  fileName: string;
  mimeType: string;
  fileSize: number;
}

interface FileContextType {
  files: fileType[];
  setFiles: React.Dispatch<React.SetStateAction<fileType[]>>;
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
  const [files, setFiles] = useState<fileType[]>([]);

  const getUserFiles = async (userId: string) => {
    const res = await fetch(`/api/file/${userId}`);
    const data = await res.json();
    setFiles(data.files);
  };

  const addFile = (file: File) => {
    const newFile = {
      fileName: file.name.split('.')[0],
      fileSize: +(file.size / 1000000).toFixed(2),
      mimeType: file.name.split('.')[1],
    };
    setFiles((prev) => [...prev, newFile]);

    addFileDB(`/api/file/${currentUser._id}`, newFile);
  };

  const moveToTrash = (fileId: string) => {
    setFiles(
      files.filter((file) => {
        // @ts-ignore
        return file._id !== fileId;
      })
    );

    moveToTrashDB(`/api/file/${fileId}`);
  };

  return (
    <FileContext.Provider
      value={{ files, setFiles, addFile, getUserFiles, moveToTrash }}
    >
      {children}
    </FileContext.Provider>
  );
};
