import { files } from '../../constants';
import FileItem from './FileItem';

const FileList = () => {
  return (
    <div className='flex gap-10 flex-wrap'>
      {files.map((file, i) => (
        <FileItem key={i} file={file} />
      ))}
    </div>
  );
};

export default FileList;
