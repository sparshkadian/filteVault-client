import { useState, useRef } from 'react';
import { Drawer } from 'antd';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { FileContext } from '../context/FileContext';
import { useFileOperations } from '../hooks/useFileOperations';
import { signOut } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

const HomeDrawer = ({ icon }: { icon: string }) => {
  const { currentUser } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const { addFile } = useContext(FileContext);
  const { addFileToFirestore } = useFileOperations();
  // @ts-ignore
  const [open, setOpen] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [barsClicked, setBarsClicked] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const deleteAccount = async () => {
    try {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then(async (result) => {
        if (result.isConfirmed) {
          await fetch(
            `https://filevault.onrender.com/api/user/${currentUser._id}`,
            {
              method: 'DELETE',
            }
          );
          setTimeout(() => {
            dispatch(signOut());
          }, 1000);
          Swal.fire({
            title: 'Deleted!',
            text: 'Your Account has been deleted.',
            icon: 'success',
          });
        }
      });
    } catch (error: any) {
      toast.error(error.message);
    }
  };

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
        open={width < 860 && checkBarsClicked()}
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
            to='/profile'
            className='mt-3 cursor-pointer flex gap-3 items-center rounded-full hover:bg-gray-200 hover:text-black transition-all ease-in-out duration-300 py-1 px-3'
          >
            <img src='./user.png' alt='trash' width={18} />
            <p>Profile</p>
          </Link>

          {/* starred */}
          <Link
            to='/starred'
            className='mt-3 cursor-pointer flex gap-3 items-center rounded-full hover:bg-gray-200 hover:text-black transition-all ease-in-out duration-300 py-1 px-3'
          >
            <img src='./starred.png' alt='trash' width={15} />
            <p>Starred</p>
          </Link>

          {/* Trash */}
          <Link
            to='/trash'
            className='mt-3 cursor-pointer flex gap-3 items-center rounded-full hover:bg-gray-200 hover:text-black transition-all ease-in-out duration-300 py-1 px-3'
          >
            <img src='./trash.png' alt='trash' width={18} />
            <p>Trash</p>
          </Link>

          {/* SignOut */}
          <div
            onClick={() => {
              dispatch(signOut());
              toast.success('User Signed Out');
            }}
            className='mt-3 cursor-pointer flex gap-3 items-center rounded-full hover:bg-gray-200 hover:text-black transition-all ease-in-out duration-300 py-1 px-3'
          >
            <img src='./logout.png' alt='trash' width={18} />
            <p>Sign out</p>
          </div>

          {/* Delete Account */}
          <div
            onClick={() => {
              deleteAccount();
            }}
            className='mt-3 cursor-pointer flex gap-3 items-center rounded-full hover:bg-gray-200 hover:text-black transition-all ease-in-out duration-300 py-1 px-3'
          >
            <img src='./delete-acc.png' alt='trash' width={18} />
            <p>Delete Account</p>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default HomeDrawer;
