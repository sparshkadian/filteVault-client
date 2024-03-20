import { SetStateAction } from 'react';
import { useState } from 'react';

const SearchFile = ({
  setSearchFile,
}: {
  setSearchFile: React.Dispatch<SetStateAction<string>>;
}) => {
  const [query, setQuery] = useState<string>('');

  return (
    <div className='mx-auto mt-3 flex items-center justify-between max-w-2xl bg-gray-100 px-3 py-2 rounded-full shadow-md hover:shadow-xl focus:shadow-xl'>
      <input
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setSearchFile(e.target.value);
          setQuery(e.target.value);
        }}
        type='text'
        value={query}
        className='w-[90%] p-1 bg-gray-100 focus:outline-none'
        placeholder='Search File'
      />
      {query.length > 0 && (
        <img
          onClick={() => {
            setSearchFile('');
            setQuery('');
          }}
          src='./close.png'
          alt='search'
          width={15}
          className='cursor-pointer mr-1'
        />
      )}
    </div>
  );
};

export default SearchFile;
