import { Link, useLocation } from 'react-router-dom';

export const NavBar = () => {
  const location = useLocation();

  return (
    <div className='absolute top-0 w-screen h-[10vh] z-10 px-4 flex justify-between items-center'>
      <div>Logo</div>
      {location.pathname !== ('/login' || '/signup') && (
        <div className='flex gap-6 font-semibold'>
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
