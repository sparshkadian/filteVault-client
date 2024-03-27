//@ts-nocheck
import { useSelector } from 'react-redux';
import { useRef, useState } from 'react';
import { useFileOperations } from '../hooks/useFileOperations';

const Profile = () => {
  const { currentUser } = useSelector((state: any) => state.user);
  const { changeProfilePicture } = useFileOperations();
  const [formData, setFormData] = useState({
    avatar: currentUser.avatar,
    userName: currentUser.userName,
    about: currentUser.about,
  });
  const [file, setFile] = useState<File | null>(null);
  const fileRef = useRef<File | null>(null);

  const { avatar, userName, about } = formData;

  const handleFileChange = async (e) => {
    const profilePicture = await changeProfilePicture(e.target.files[0]);
    setFormData({ ...formData, avatar: profilePicture });
  };

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <div className='p-2'>
      <form className='rounded-md relative mx-auto max-w-5xl mt-10 sm:flex shadow-lg'>
        {/* Left Panel */}
        <div className='flex flex-col items-center gap-5 p-3'>
          <img
            src={avatar}
            alt='avatar'
            width={120}
            className='mix-blend-multiply'
          />
          <input
            onChange={handleFileChange}
            type='file'
            ref={fileRef}
            className='hidden'
            accept='image/*'
          />
          <button
            onClick={() => {
              if (fileRef.current) {
                fileRef.current.click();
              }
            }}
            type='button'
            className='border-2 border-black p-2 rounded-md'
          >
            Upload New Picture
          </button>
          <input
            onChange={handleInputChange}
            type='text'
            id='userName'
            value={userName}
            className='bg-gray-100 p-2 rounded-md text-center'
          />
          <input
            type='text'
            id='email'
            value={currentUser.email}
            disabled
            className='bg-gray-100 p-2 rounded-md text-center'
          />
        </div>
        {/* Right Panel */}
        <div className='sm:border-l-2 border-l-gray-300 flex-1 p-3 pl-4'>
          <p className='text-lg'>
            Joined On: {currentUser.createdAt.split('T')[0]}
          </p>

          <label htmlFor='about' className='inline-block mt-3'>
            About
          </label>
          <textarea
            onChange={handleInputChange}
            name='about'
            id='about'
            cols='30'
            rows='5'
            value={about}
            className='border-2 rounded-md w-full p-1'
          ></textarea>

          {/* stats */}

          <div className='flex justify-center mt-10'>
            <button className='h-[50px] profile-btn mt-2 bg-slate-500 text-white text-xl hover:opacity-80 w-[150px] p-2 rounded-md'>
              Save Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Profile;
