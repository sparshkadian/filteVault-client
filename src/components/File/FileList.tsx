import FileItem from './FileItem';
import { useContext } from 'react';
import { FileContext } from '../../context/FileContext';

const FileList = ({ layout, query }: { layout: string; query: string }) => {
  const { files } = useContext(FileContext);

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
