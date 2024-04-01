import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { checkMimeType } from '../utils/checkMimeType';
import { useFileOperations } from '../hooks/useFileOperations';
import { dbFile } from '../types';

const StarredFiles = () => {
  const { currentUser } = useSelector((state: any) => state.user);
  const { removeFromStarred, getFileDownloadUrl } = useFileOperations();
  const [starredFiles, setStarredFiles] = useState<dbFile[]>([]);
  const [openFileOptions, setOpenFileOptions] = useState(false);

  useEffect(() => {
    const getStarredFiles = async () => {
      const res = await fetch(
        `https://filevault.onrender.com/api/file/starredFiles/${currentUser._id}`
      );
      const data = await res.json();
      setStarredFiles(data.files);
    };
    getStarredFiles();
  }, []);

  return (
    <>
      {starredFiles.length === 0 && (
        <div className='mt-[150px] flex justify-center items-center gap-3'>
          <p className='roboto-font border-black text-[6vw]'>
            No Starred Files!
          </p>
          <div className='w-[6vw]'>
            <img
              src='./nonStarred.png'
              alt='empty-trash'
              className='object-cover mb-2'
            />
          </div>
        </div>
      )}

      <div className='mt-[150px] max-w-5xl mx-auto p-2 flex gap-10 flex-wrap items-center justify-center'>
        {starredFiles.map((file: any) => (
          <div
            key={file._id}
            className='relative w-[250px] h-[250px] flex flex-col gap-3 items-center bg-gray-100 rounded-md shadow-md py-3'
          >
            <img
              src={checkMimeType(file.mimeType)}
              alt='file'
              className='h-[170px] w-[200px] object-cover'
            />
            <p className='h-[30px] font-semibold text-lg w-full text-center overflow-hidden'>
              {file.fileName}
            </p>
            <img
              onClick={() => setOpenFileOptions(true)}
              src='./fileOptions.png'
              alt='fileOptions'
              width={20}
              className='absolute right-2 cursor-pointer'
            />

            {/* FileOptions */}
            {openFileOptions && (
              <div className='absolute rounded-md border-2 w-[200px] h-[120px] bg-gray-200 right-3'>
                <img
                  onClick={() => setOpenFileOptions(false)}
                  src='./close.png'
                  alt='close'
                  width={15}
                  className='absolute right-2 top-2 cursor-pointer'
                />

                {/* remove form starred */}
                <div
                  onClick={() => {
                    //@ts-ignore
                    removeFromStarred(
                      file,
                      file._id,
                      starredFiles,
                      setStarredFiles,
                      true
                    );
                  }}
                  className='mt-7 cursor-pointer flex gap-3 items-center rounded-full hover:bg-gray-300 transition-all ease-in-out duration-300 py-1 px-3'
                >
                  <img src='./starred.png' alt='trash' width={15} />
                  <p className='text-sm'>Remove from starred</p>
                </div>

                {/* download */}
                <div
                  onClick={() => {
                    getFileDownloadUrl(file.fileName);
                  }}
                  className='mt-2 cursor-pointer flex gap-3 items-center rounded-full hover:bg-gray-300 transition-all ease-in-out duration-300 py-1 px-3'
                >
                  <img src='./download.png' alt='trash' width={15} />
                  <p className='text-sm'>download</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default StarredFiles;
