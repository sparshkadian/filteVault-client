import { files } from '../../constants';
import FileItem from './FileItem';

const FileList = ({ layout }: { layout: string }) => {
  return (
    <div
      className={`${
        layout === 'grid'
          ? 'grid grid-cols-1 600:grid-cols-2 xl:grid-cols-3 gap-10'
          : 'flex flex-col gap-5 max-w-4xl mx-auto'
      }`}
    >
      {files.map((file) => (
        <FileItem key={file.id} file={file} layout={layout} />
      ))}
    </div>
  );
};

export default FileList;
