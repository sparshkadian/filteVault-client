import FileItem from './FileItem';
import { useContext, useEffect } from 'react';
import { FileContext } from '../../context/FileContext';
import { useSelector } from 'react-redux';

const FileList = ({ layout, query }: { layout: string; query: string }) => {
  const { files, getUserFiles } = useContext(FileContext);
  const { currentUser } = useSelector((state: any) => state.user);

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
          return <FileItem key={i} file={file} layout={layout} />;
        })}
    </div>
  );
};

export default FileList;
