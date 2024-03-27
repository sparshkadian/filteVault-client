//@ts-nocheck
import { useState, useEffect } from 'react';
import { checkMimeType } from '../utils/checkMimeType';
import { useSelector } from 'react-redux';
import { useFileOperations } from '../hooks/useFileOperations';

const TrashFiles = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { deleteFilePerm } = useFileOperations();
  const [openFileOptions, setOpenFileOptions] = useState(false);
  const [trashFiles, setTrashFiles] = useState([]);

  useEffect(() => {
    const getTrashFiles = async () => {
      const res = await fetch(
        `http://localhost:4100/api/file/trashFiles/${currentUser._id}`
      );
      const data = await res.json();
      setTrashFiles(data.files);
    };
    getTrashFiles();
  }, []);

  return (
    <div className='mt-[150px] max-w-5xl mx-auto p-2 flex gap-10 flex-wrap'>
      {trashFiles.map((file) => (
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
            <div className='absolute rounded-md border-2 w-[175px] h-[120px] bg-gray-200 right-3'>
              <img
                onClick={() => setOpenFileOptions(false)}
                src='./close.png'
                alt='close'
                width={15}
                className='absolute right-2 top-2 cursor-pointer'
              />

              {/* Delete Permanently */}
              <div
                onClick={() => {
                  deleteFilePerm(
                    `http://localhost:4100/api/file/permanent/${file._id}`,
                    file._id,
                    trashFiles,
                    setTrashFiles
                  );
                }}
                className='mt-7 cursor-pointer flex gap-3 items-center rounded-full hover:bg-gray-300 transition-all ease-in-out duration-300 py-1 px-3'
              >
                <img src='./trash.png' alt='trash' width={15} />
                <p className='text-sm'>Delete Permanently</p>
              </div>

              {/* Restore */}
              <div
                onClick={() => {}}
                className='mt-2 cursor-pointer flex gap-3 items-center rounded-full hover:bg-gray-300 transition-all ease-in-out duration-300 py-1 px-3'
              >
                <img src='./restore.png' alt='trash' width={15} />
                <p className='text-sm'>Restore File</p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TrashFiles;
