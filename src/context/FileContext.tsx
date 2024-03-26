import { createContext, useState } from 'react';
import { useAddFile } from '../hooks/useAddFile';
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
}

const initialState: FileContextType = {
  files: [],
  setFiles: () => {},
  addFile: () => {},
};

export const FileContext = createContext<FileContextType>(initialState);

export const FileProvider = ({ children }: { children: React.ReactNode }) => {
  const { currentUser } = useSelector((state: any) => state.user);
  const { addFileDB } = useAddFile();
  const [files, setFiles] = useState<fileType[]>([]);

  const addFile = (file: File) => {
    const newFile = {
      fileName: file.name.split('.')[0],
      fileSize: +(file.size / 1000000).toFixed(2),
      mimeType: file.name.split('.')[1],
    };
    setFiles((prev) => [...prev, newFile]);

    addFileDB(`http://localhost:4100/api/file/${currentUser._id}`, newFile);
  };

  return (
    <FileContext.Provider value={{ files, setFiles, addFile }}>
      {children}
    </FileContext.Provider>
  );
};
