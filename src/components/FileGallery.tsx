import SearchFile from './SearchFile';
import FileList from './File/FileList';

const FileGallery = () => {
  return (
    <div className='bg-white mt-10 flex-1 rounded-tl-md p-2'>
      {/* Search Functionality Component*/}
      <SearchFile />

      <div className='h-[75vh] sm:mx-5 mt-10 p-5 overflow-y-scroll'>
        <FileList />
      </div>
    </div>
  );
};

export default FileGallery;
