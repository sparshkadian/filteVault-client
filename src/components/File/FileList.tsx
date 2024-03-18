import { files } from '../../constants';
import FileItem from './FileItem';

const FileList = () => {
  return (
    <div className='grid grid-cols-1 600:grid-cols-2 xl:grid-cols-3 gap-10'>
      {files.map((file, i) => (
        <FileItem key={i} file={file} />
      ))}
    </div>
  );
};

export default FileList;
