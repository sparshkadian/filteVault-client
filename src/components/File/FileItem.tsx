interface FileProps {
  fileName: string;
  type: string;
  image: string;
}

const FileItem: React.FC<{ file: FileProps }> = ({ file }) => {
  return (
    <div className='relative bg-gray-100 rounded-md shadow-md py-3 w-[250px] h-[250px] flex flex-col items-center'>
      <img
        src='./fileOptions.png'
        alt='options'
        width={20}
        className='absolute right-1 cursor-pointer'
      />
      <img
        src={file.image}
        alt='file-image'
        className='mt-4 object-cover h-[170px] w-[200px] rounded-md'
      />
      <p className='h-[30px] mt-2 font-semibold text-lg w-full text-center overflow-hidden'>
        {file.fileName}
      </p>
    </div>
  );
};

export default FileItem;
