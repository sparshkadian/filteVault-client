import { files } from '../../constants';
import FileItem from './FileItem';

const FileList = ({ layout, query }: { layout: string; query: string }) => {
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
        .map((file) => {
          return <FileItem key={file.id} file={file} layout={layout} />;
        })}
    </div>
  );
};

export default FileList;
