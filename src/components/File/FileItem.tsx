import { useState, useContext, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FileContext } from '../../context/FileContext';
import { useFileOperations } from '../../hooks/useFileOperations';
import { checkMimeType } from '../../utils/checkMimeType';
import { dbFile } from '../../types';
import DownloadUrlModal from '../Modals/DownloadUrlModal';
import FileInfoDrawer from '../FileInfoDrawer';

const FileItem: React.FC<{
  file: dbFile;
  layout: string;
  openFileOptions: string | null;
  setOpenFileOptions: React.Dispatch<React.SetStateAction<string | null>>;
}> = ({ file, layout, openFileOptions, setOpenFileOptions }) => {
  const { moveToTrash } = useContext(FileContext);
  const { getFileDownloadUrl, addToStarred, removeFromStarred } =
    useFileOperations();
  const [downloadUrl, setDownloadUrl] = useState<string>('');
  const [openFileInfoDrawer, setOpenFileInfoDrawer] = useState<boolean>(false);
  const [fileForDrawer, setFileForDrawer] = useState<dbFile | null>(null);

  function closeFileOptions() {
    setOpenFileOptions(null);
  }

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (e.target.id !== 'fileOptions') {
        setOpenFileOptions(null);
      }
    };
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const checkDownloadUrlExists = async (file: dbFile) => {
    if (file.downloadLink) {
      if (/iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase())) {
        setDownloadUrl(file.downloadLink);
      } else {
        window.open(file.downloadLink);
      }
    } else {
      const url: string = await getFileDownloadUrl(file.fileName, file._id);
      setDownloadUrl(url);
    }
  };

  return (
    <>
      <div
        className={`${
          layout === 'list'
            ? 'flex items-center justify-between px-2'
            : 'w-[250px] h-[250px] flex flex-col items-center'
        }  relative bg-gray-100 rounded-md shadow-md py-3`}
      >
        {/*  */}
        <div
          className='rounded-md absolute inset-0'
          style={{
            zIndex: openFileOptions === file._id ? '1' : '-1',
            opacity: openFileOptions === file._id ? '0.5' : '0',
            backgroundColor:
              openFileOptions === file._id ? '#000' : 'transparent',
          }}
        />

        {/* File Image */}
        <img
          src={checkMimeType(file.mimeType)}
          alt='file-image'
          className={`${
            layout === 'list'
              ? 'w-[40px] h-[40px]'
              : 'mt- 4 h-[170px] w-[200px]'
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
            if (file._id) {
              setOpenFileOptions(file._id);
            }
          }}
          src='./fileOptions.png'
          alt='options'
          width={20}
          className={`${
            layout === 'list' ? '' : 'absolute right-1'
          } cursor-pointer z-[2]`}
          id='fileOptions'
        />

        {openFileOptions === file._id && (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: '175px' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              id='fileOptions'
              className={`${
                file.starred ? 'w-[215px]' : 'w-[170px]'
              } px-2 rounded-md h-[175px] absolute top-2 right-[10px] bg-gray-200 shadow-xl z-10`}
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
                  className='mt-7 cursor-pointer flex gap-3 items-center rounded-full hover:bg-gray-300 transition-all ease-in-out duration-300 py-1 px-3'
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
                    moveToTrash(file);
                    closeFileOptions();
                  }}
                  className='mt-2 cursor-pointer flex gap-3 items-center rounded-full hover:bg-gray-300 transition-all ease-in-out duration-300 py-1 px-3'
                >
                  <img src='./trash.png' alt='trash' width={15} />
                  <p className='text-sm'>Move to Trash</p>
                </div>

                {/* Download */}
                <div
                  onClick={async () => {
                    checkDownloadUrlExists(file);
                    closeFileOptions();
                  }}
                  className='mt-2 cursor-pointer flex gap-3 items-center rounded-full hover:bg-gray-300 transition-all ease-in-out duration-300 py-1 px-3'
                >
                  <img src='./download.png' alt='trash' width={15} />
                  <p className='text-sm'>Download</p>
                </div>

                {/* File Information */}
                <div
                  onClick={() => {
                    setFileForDrawer(file);
                    setOpenFileInfoDrawer(true);
                  }}
                  className='mt-2 cursor-pointer flex gap-3 items-center rounded-full hover:bg-gray-300 transition-all ease-in-out duration-300 py-1 px-3'
                >
                  <img src='./file-info.png' alt='trash' width={15} />
                  <p className='text-sm'>File Information</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
        {downloadUrl && (
          <DownloadUrlModal
            downloadUrl={downloadUrl}
            setDownloadUrl={setDownloadUrl}
          />
        )}
      </div>
      {openFileInfoDrawer && (
        <FileInfoDrawer
          file={fileForDrawer}
          openFileInfoDrawer={openFileInfoDrawer}
          setOpenFileInfoDrawer={setOpenFileInfoDrawer}
        />
      )}
    </>
  );
};

export default FileItem;
