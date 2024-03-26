import { useRef } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { FileContext } from '../context/FileContext';
import { useFileOperations } from '../hooks/useFileOperations';

const HomeSideMenu = () => {
  const { addFile } = useContext(FileContext);
  const { addFileToFirestore } = useFileOperations();
  const [file, setFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  if (file) {
    addFile(file);
    addFileToFirestore(file);
    setFile(null);
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className='w-[220px] p-2 pl-3 hidden 860:flex flex-col gap-3'>
      {/* Logo */}
      <div className='ml-3 mt-2 flex items-center gap-3'>
        <img src='./vault.png' alt='logo' width={30} />
        <p className='text-lg'>
          File <span className='text-blue-500 font-semibold'>Vault</span>
        </p>
      </div>

      {/* Form */}
      <form>
        <input
          onChange={handleFileChange}
          type='file'
          ref={fileRef}
          className='hidden'
        />
      </form>

      {/* Add New */}
      <div
        onClick={() => {
          fileRef.current?.click();
        }}
        className='w-[100px] shadow-md bg-white cursor-pointer flex justify-between items-center rounded-xl hover:shadow-lg transition-all ease-in-out duration-300 py-3 px-4'
      >
        <img src='./plus.png' alt='trash' width={18} />
        <p>New</p>
      </div>

      {/* Home */}
      <Link
        to='/'
        className='cursor-pointer flex gap-3 items-center rounded-full hover:bg-gray-200 transition-all ease-in-out duration-300 py-1 px-3'
      >
        <img src='./home.png' alt='trash' width={18} />
        <p>Home</p>
      </Link>

      {/* User Profile */}
      <Link
        to=''
        className='cursor-pointer flex gap-3 items-center rounded-full hover:bg-gray-200 transition-all ease-in-out duration-300 py-1 px-3'
      >
        <img src='./user.png' alt='trash' width={18} />
        <p>Profile</p>
      </Link>

      {/* starred */}
      <div className='cursor-pointer flex gap-3 items-center rounded-full hover:bg-gray-200 transition-all ease-in-out duration-300 py-1 px-3'>
        <img src='./star.png' alt='trash' width={15} />
        <p>Starred</p>
      </div>

      {/* Trash */}
      <div className='cursor-pointer flex gap-3 items-center rounded-full hover:bg-gray-200 transition-all ease-in-out duration-300 py-1 px-3'>
        <img src='./trash.png' alt='trash' width={18} />
        <p>Trash</p>
      </div>
    </div>
  );
};

export default HomeSideMenu;
