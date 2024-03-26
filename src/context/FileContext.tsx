import { createContext, useState } from 'react';

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
  const [files, setFiles] = useState<fileType[]>([]);
  console.log(files);

  const addFile = (file: File) => {
    const newFile = {
      fileName: file.name.split('.')[0],
      fileSize: +(file.size / 1000000).toFixed(2),
      mimeType: file.name.split('.')[1],
    };
    setFiles((prev) => [...prev, newFile]);
  };

  return (
    <FileContext.Provider value={{ files, setFiles, addFile }}>
      {children}
    </FileContext.Provider>
  );
};
