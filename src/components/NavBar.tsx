import { Link, useLocation } from 'react-router-dom';
import NavbarDrawer from './NavbarDrawer';
import { useContext } from 'react';
import AppContext from '../context/AppContext';

const Navbar = () => {
  const { currentUser } = useContext(AppContext);
  const location = useLocation();

  return (
    <div className='absolute top-0 w-screen h-[12vh] z-10 px-4 pr-6 flex justify-between items-center'>
      <Link to='/'>
        <img src='./vault.png' alt='logo' width={45} />
      </Link>
      {location.pathname !== '/signup' && location.pathname !== '/login' && (
        <>
          <div className='sm:hidden'>
            <NavbarDrawer icon='./bars.png' />
          </div>
          {!currentUser ? (
            <div className='hidden sm:flex gap-8 font-semibold'>
              <Link to='/signup'>
                <button className='nav__button'>Sign up</button>
              </Link>
              <Link to='/login'>
                <button className='nav__button'>Log in</button>
              </Link>
            </div>
          ) : (
            <img
              src='./userAvatar.png'
              alt='profile'
              width={50}
              height={50}
              className='hidden sm:block rounded-full shadow-xl cursor-pointer'
            />
          )}
        </>
      )}
    </div>
  );
};

export default Navbar;
