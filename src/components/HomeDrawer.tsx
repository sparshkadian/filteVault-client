import { useState, useRef } from 'react';
import { Drawer } from 'antd';
import { Link } from 'react-router-dom';

const HomeDrawer = ({ icon }: { icon: string }) => {
  const [open, setOpen] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [barsClicked, setBarsClicked] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  // Comments to remove deploy error
  console.log(file);
  console.log(open);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  window.addEventListener('resize', () => {
    setWidth(window.innerWidth);
  });

  const showDrawer = () => {
    setBarsClicked(true);
    setOpen(true);
  };

  const onClose = () => {
    setBarsClicked(false);
    setOpen(false);
  };

  const checkBarsClicked = () => {
    if (barsClicked) return true;
    else return false;
  };

  return (
    <>
      <img
        src={icon}
        alt='bars'
        width={18}
        onClick={showDrawer}
        className='cursor-pointer absolute top-3 left-3 block 860:hidden'
      />
      <Drawer
        onClose={onClose}
        open={width < 640 && checkBarsClicked()}
        width={220}
        placement='left'
      >
        <div className='sm:flex flex-col gap-3h-full'>
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
            className='mt-3 cursor-pointer flex gap-3 items-center rounded-full hover:bg-gray-200 hover:text-black transition-all ease-in-out duration-300 py-1 px-3'
          >
            <img src='./home.png' alt='trash' width={18} />
            <p>Home</p>
          </Link>

          {/* User Profile */}
          <Link
            to=''
            className='mt-3 cursor-pointer flex gap-3 items-center rounded-full hover:bg-gray-200 hover:text-black transition-all ease-in-out duration-300 py-1 px-3'
          >
            <img src='./user.png' alt='trash' width={18} />
            <p>Profile</p>
          </Link>

          {/* starred */}
          <div className='mt-3 cursor-pointer flex gap-3 items-center rounded-full hover:bg-gray-200 transition-all ease-in-out duration-300 py-1 px-3'>
            <img src='./star.png' alt='trash' width={15} />
            <p>Starred</p>
          </div>
        </div>

        {/* Trash */}
        <div className='mt-3 cursor-pointer flex gap-3 items-center rounded-full hover:bg-gray-200 transition-all ease-in-out duration-300 py-1 px-3'>
          <img src='./trash.png' alt='trash' width={18} />
          <p>Trash</p>
        </div>
      </Drawer>
    </>
  );
};

export default HomeDrawer;
