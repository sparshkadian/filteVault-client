import { Link } from 'react-router-dom';

const DownloadUrlModal = ({
  downloadUrl,
  setDownloadUrl,
}: {
  downloadUrl: string;
  setDownloadUrl: (downloadUrl: string) => void;
}) => {
  return (
    <div className='flex flex-col items-center justify-center gap-2 rounded-md shadow-md w-[380px] h-[250px] bg-gray-200 fixed convert_modal p-5'>
      <p className='text-lg font-semibold'>Click Link to Download File</p>
      <Link
        to={downloadUrl}
        target='_blank'
        className='text-center text-blue-500'
      >
        {downloadUrl}
      </Link>

      <button
        onClick={() => {
          setDownloadUrl('');
        }}
        className='tracking-wider font-semibold mt-2 py-2 px-5 bg-red-500 rounded-md text-white text-lg hover:opacity-90'
      >
        Close
      </button>
    </div>
  );
};

export default DownloadUrlModal;
