// @ts-nocheck
import { dbFile } from '../types';
import React, { useState, useEffect } from 'react';
import { Drawer } from 'antd';
import { useFileOperations } from '../hooks/useFileOperations';
import { modifyDate } from '../utils/modifyCreatedAtDate';

const FileInfoDrawer: React.FC<{
  file: dbFile | null;
  openFileInfoDrawer: boolean;
  setOpenFileInfoDrawer: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ file, openFileInfoDrawer, setOpenFileInfoDrawer }) => {
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState<string>(file?.description); //get from file.Description
  const { getFileDownloadUrl, updateFile } = useFileOperations();

  useEffect(() => {
    if (openFileInfoDrawer) {
      setOpen(true);
    }
  }, []);

  const onClose = () => {
    setOpen(false);
    setOpenFileInfoDrawer(false);
  };

  const downloadFile = async (
    fileName: string,
    fileId: string,
    downloadLink: string
  ) => {
    if (downloadLink.trim().length !== 0) {
      window.open(downloadLink);
    } else {
      await getFileDownloadUrl(fileName, fileId);
    }
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleFormSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = { description };
    await updateFile(
      `https://filevault.onrender.com/api/file/${file?._id}`,
      data
    );
    window.location.reload(); // need to do it -> no action dispatch mechanism in place
    // to see immediate UI changes.
  };

  return (
    <>
      <Drawer
        title='File Information'
        onClose={onClose}
        open={open}
        width={350}
      >
        <div className='manrope-semibold flex flex-col gap-4'>
          <p>File Name: {file?.fileName}</p>
          <p>File Size: {file?.fileSize} KB</p>
          <p>
            File Type:{' '}
            <span className='text-red-500'>
              {' '}
              {file?.mimeType.split('/')[1].toUpperCase()}
            </span>{' '}
            File
          </p>
          <p>Starred: {file?.starred ? 'Yes' : 'No'}</p>

          {/* User may download from here even before DL is in DB. so add logic. */}
          {/* If no DL call downloadFile from firebase or if present proceed */}
          <p className='flex gap-1'>
            Download File:{' '}
            <div className='flex items-center gap-1'>
              <span
                onClick={() => {
                  downloadFile(file?.fileName, file?._id, file?.downloadLink);
                }}
                className='text-blue-500 cursor-pointer'
              >
                {file?.fileName}
              </span>
              <img
                src='../download-file-drawer.png'
                alt='download file'
                width={12}
              />
            </div>
          </p>
          <p>Uploaded On:&nbsp; {modifyDate(file?.createdAt)}</p>

          {/* File Description -> Problem in backend. Fix that first */}
          <div className='flex flex-col gap-2'>
            <p>Description:</p>
            <form onSubmit={handleFormSubmit} className='w-full'>
              <input
                type='text'
                value={description}
                onChange={handleDescriptionChange}
                className='border-2 rounded-md p-2 w-full focus:outline-none focus:border-blue-500'
                placeholder='Add Description'
              />
              <button className='mt-2 border-2 border-[#ccc] px-5 py-2 rounded-md hover:bg-black hover:text-white transition-all duration-300 ease-in-out hover:border-[black]'>
                Save
              </button>
            </form>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default FileInfoDrawer;
