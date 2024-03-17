import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  return (
    <div className='absolute top-0 w-screen h-[12vh] z-10 px-4 pr-6 flex justify-between items-center'>
      <Link to='/'>
        <img src='./vault.png' alt='logo' width={45} />
      </Link>
      {location.pathname !== '/signup' && location.pathname !== '/login' && (
        <div className='flex gap-8 font-semibold'>
          <Link to='/signup'>
            <button className='nav__button'>Sign up</button>
          </Link>
          <Link to='/login'>
            <button className='nav__button'>Log in</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
