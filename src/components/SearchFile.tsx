import { SetStateAction } from 'react';
import { useState, useRef, useEffect } from 'react';
import toast from 'react-hot-toast';

const SearchFile = ({
  setSearchFile,
}: {
  setSearchFile: React.Dispatch<SetStateAction<string>>;
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [query, setQuery] = useState<string>('');
  const [keyPressed, setKeyPressed] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!keyPressed) {
        toast('Press / to jump to Search', {
          position: 'bottom-left',
        });
        setKeyPressed(true);
      } else if (e.key === '/' && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
        setKeyPressed(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [keyPressed]);

  return (
    <div className='mx-auto mt-3 flex items-center justify-between max-w-2xl bg-gray-100 px-3 py-2 rounded-full shadow-md hover:shadow-xl focus:shadow-xl'>
      <input
        ref={inputRef}
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
