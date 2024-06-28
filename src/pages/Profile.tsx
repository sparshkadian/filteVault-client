import { useSelector } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import { useFileOperations } from '../hooks/useFileOperations';
import { useProfileUpdate } from '../hooks/useProfileUpdate';
import toast from 'react-hot-toast';

const Profile = () => {
  const { currentUser } = useSelector((state: any) => state.user);
  const { changeProfilePicture } = useFileOperations();
  const { profileUpdate } = useProfileUpdate();
  const [formData, setFormData] = useState({
    avatar: currentUser.avatar,
    userName: currentUser.userName,
    about: currentUser.about,
  });
  const [file, setFile] = useState<File | null>(null);
  console.log(file);
  const fileRef = useRef<HTMLInputElement>(null);

  const { avatar, userName, about } = formData;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const toastSytling = { backgroundColor: 'black', color: 'white' };

  useEffect(() => {
    if (file) {
      const uploadFile = async () => {
        toast('Uploading Profile Picture', { style: toastSytling });
        const profilePicture = await changeProfilePicture(file);
        setFormData({ ...formData, avatar: profilePicture });
        setFile(null);
        toast('Upload complete', { style: toastSytling });
        setTimeout(() => {
          toast('Click on save changes to Persist', { style: toastSytling });
        }, 500);
      };
      uploadFile();
    }
  }, [file]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    profileUpdate(
      `http://localhost:4100/api/user/${currentUser._id}`,
      formData
    );
  };

  return (
    <div className='p-2'>
      <form
        onSubmit={handleSubmit}
        className='rounded-md relative mx-auto max-w-5xl mt-10 sm:flex shadow-lg'
      >
        {/* Left Panel */}
        <div className='flex flex-col items-center gap-5 p-3'>
          <img
            src={avatar}
            alt='avatar'
            width={120}
            height={120}
            className='rounded-full'
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
            className='bg-gray-100 p-2 rounded-md text-center cursor-not-allowed'
          />
        </div>

        {/* Right Panel */}
        <div className='sm:border-l-2 border-l-gray-300 flex-1 p-3 pl-4 flex flex-col'>
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
            cols={30}
            rows={5}
            value={about}
            className='border-2 rounded-md w-full p-1'
          ></textarea>

          {/* stats */}

          <div className='mt-2 flex justify-center items-end flex-1'>
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
