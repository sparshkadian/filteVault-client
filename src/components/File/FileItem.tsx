import { useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useContext } from 'react';
import { FileContext } from '../../context/FileContext';
import { useFileOperations } from '../../hooks/useFileOperations';
import { checkMimeType } from '../../utils/checkMimeType';
import { dbFile } from '../../types';

const FileItem: React.FC<{ file: dbFile; layout: string }> = ({
  file,
  layout,
}) => {
  const { moveToTrash } = useContext(FileContext);
  const { getFileDownloadUrl, addToStarred, removeFromStarred } =
    useFileOperations();
  const divRef = useRef<HTMLDivElement | null>(null);
  const [openFileOptions, setOpenFileOptions] = useState(false);

  function closeFileOptions() {
    if (divRef.current) {
      divRef.current.style.zIndex = '-1';
      setOpenFileOptions(false);
    }
  }

  return (
    <div
      className={`${
        layout === 'list'
          ? 'flex items-center justify-between px-2'
          : 'w-[250px] h-[250px] flex flex-col items-center'
      }  relative bg-gray-100 rounded-md shadow-md py-3`}
    >
      {/*  */}
      <div ref={divRef} className='rounded-md absolute inset-0 z-[-1]' />

      {/* File Image */}
      <img
        src={checkMimeType(file.mimeType)}
        alt='file-image'
        className={`${
          layout === 'list' ? 'w-[40px] h-[40px]' : 'mt- 4 h-[170px] w-[200px]'
        } object-cover`}
      />

      {/* FileName */}
      <p
        className={`${
          layout === 'list'
            ? 'text-lg text-center'
            : 'h-[30px] mt-4 font-semibold text-lg w-full text-center overflow-hidden'
        } `}
      >
        {file.fileName}
      </p>

      {/* FileOptions */}
      <img
        onClick={() => {
          if (divRef.current) {
            divRef.current.style.zIndex = '1';
            divRef.current.style.opacity = '0.5';
            divRef.current.style.backgroundColor = '#000';
            setOpenFileOptions(true);
          }
        }}
        src='./fileOptions.png'
        alt='options'
        width={20}
        className={`${
          layout === 'list' ? '' : 'absolute right-1'
        } cursor-pointer z-[2]`}
      />

      {openFileOptions && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`${
              file.starred ? 'w-[200px]' : 'w-[160px]'
            } px-2 rounded-md h-[160px] absolute top-2 right-[10px] bg-gray-200 shadow-xl z-10`}
          >
            <div className='h-full w-full realtive'>
              <img
                onClick={() => {
                  closeFileOptions();
                }}
                src='./close.png'
                alt='close'
                width={12}
                className='absolute right-2 top-2 cursor-pointer'
              />

              {/* starred */}
              <div
                onClick={() => {
                  // @ts-ignore
                  file.starred ? removeFromStarred(file) : addToStarred(file);
                  closeFileOptions();
                }}
                className='mt-10 cursor-pointer flex gap-3 items-center rounded-full hover:bg-gray-300 transition-all ease-in-out duration-300 py-1 px-3'
              >
                <img
                  src={file.starred ? './starred.png' : './nonStarred.png'}
                  alt='trash'
                  width={12}
                />
                <p className='text-sm'>
                  {file.starred ? 'Remove from Starred' : 'Add to Starred'}
                </p>
              </div>

              {/* Trash */}
              <div
                onClick={() => {
                  // @ts-ignore
                  moveToTrash(file._id);
                  closeFileOptions();
                }}
                className='mt-2 cursor-pointer flex gap-3 items-center rounded-full hover:bg-gray-300 transition-all ease-in-out duration-300 py-1 px-3'
              >
                <img src='./trash.png' alt='trash' width={15} />
                <p className='text-sm'>Move to Trash</p>
              </div>

              {/* Download */}
              <div
                onClick={() => {
                  getFileDownloadUrl(file.fileName);
                  closeFileOptions();
                }}
                className='mt-2 cursor-pointer flex gap-3 items-center rounded-full hover:bg-gray-300 transition-all ease-in-out duration-300 py-1 px-3'
              >
                <img src='./download.png' alt='trash' width={15} />
                <p className='text-sm'>Download</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default FileItem;
