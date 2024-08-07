import SearchFile from './SearchFile';
import FileList from './File/FileList';
import { useState } from 'react';

const FileGallery = () => {
  const [layout, setLayout] = useState(
    window.localStorage.getItem('layout') || 'grid'
  );
  const [searchFile, setSearchFile] = useState<string>('');

  return (
    <div className='bg-white mt-10 flex-1 rounded-tl-md p-2'>
      {/* Search Functionality Component*/}
      <div className='w-full'>
        <SearchFile setSearchFile={setSearchFile} />

        <div className='bg-gray-100 rounded-full max-w-[100px] mx-auto mt-4  flex items-center'>
          <div
            onClick={() => {
              window.localStorage.setItem('layout', 'list');
              setLayout('list');
            }}
            className={`${
              layout === 'list' ? 'bg-blue-200' : 'hover:bg-gray-200'
            } cursor-pointer rounded-l-full border-r border-r-black w-1/2 p-2 flex items-center justify-center`}
          >
            <img
              src='./list-layout.png'
              alt='list-layout'
              width={15}
              title='List Layout'
            />
          </div>

          <div
            onClick={() => {
              window.localStorage.setItem('layout', 'grid');
              setLayout('grid');
            }}
            className={`${
              layout === 'grid' ? 'bg-blue-200' : 'hover:bg-gray-200'
            } cursor-pointer w-1/2 p-2 rounded-r-full flex items-center justify-center`}
          >
            <img
              src='./grid-layout.png'
              alt='grid-layout'
              width={15}
              title='Grid Layout'
            />
          </div>
        </div>
      </div>

      <div
        className={`${
          layout === 'grid' ? 'flex justify-center' : ''
        } h-[70vh] sm:mx-5 mt-10 p-5 pb-10 overflow-y-scroll`}
      >
        <FileList layout={layout} query={searchFile} />
      </div>
    </div>
  );
};

export default FileGallery;
