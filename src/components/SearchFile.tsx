const SearchFile = () => {
  return (
    <div className='mx-auto mt-3 flex items-center justify-between max-w-2xl bg-gray-100 px-3 py-2 rounded-full shadow-md hover:shadow-xl focus:shadow-xl'>
      <input
        type='text'
        className='w-[90%] p-1 bg-gray-100 focus:outline-none'
        placeholder='Search File'
      />
      <img
        src='./search.png'
        alt='search'
        width={20}
        className='cursor-pointer'
      />
    </div>
  );
};

export default SearchFile;
