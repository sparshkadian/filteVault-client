import FileItem from './FileItem';
import { useState, useContext, useEffect } from 'react';
import { FileContext } from '../../context/FileContext';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const FileList = ({ layout, query }: { layout: string; query: string }) => {
  const { getUserFiles } = useContext(FileContext);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const files = useSelector((state: RootState) => state.file.files);
  const [openFileOptions, setOpenFileOptions] = useState<string | null>(null);

  useEffect(() => {
    getUserFiles(currentUser._id);
  }, []);

  return (
    <div
      className={`${
        layout === 'grid'
          ? 'grid grid-cols-1 600:grid-cols-2 xl:grid-cols-3 gap-10'
          : 'flex flex-col gap-5 max-w-4xl mx-auto'
      }`}
    >
      {files
        .filter((file) => {
          return file.fileName
            .toLowerCase()
            .replace(/\s/g, '')
            .includes(query.trim().toLowerCase());
        })
        .map((file, i) => {
          return (
            <FileItem
              key={i}
              file={file}
              layout={layout}
              openFileOptions={openFileOptions}
              setOpenFileOptions={setOpenFileOptions}
            />
          );
        })}
    </div>
  );
};

export default FileList;
