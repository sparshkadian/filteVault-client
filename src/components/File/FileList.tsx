import { files } from '../../constants';
import FileItem from './FileItem';

const FileList = ({ layout }: { layout: string }) => {
  console.log(layout);
  return (
    <div
      className={`${
        layout === 'grid'
          ? 'grid grid-cols-1 600:grid-cols-2 xl:grid-cols-3 gap-10'
          : 'flex flex-col gap-5 w-full'
      }`}
    >
      {files.map((file, i) => (
        <FileItem key={i} file={file} layout={layout} />
      ))}
    </div>
  );
};

export default FileList;
