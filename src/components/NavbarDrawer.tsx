import { useState } from 'react';
import { Drawer } from 'antd';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const NavbarDrawer = ({ icon }: { icon: string }) => {
  const { currentUser } = useSelector((state: any) => state.user);
  //@ts-ignore
  const [open, setOpen] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [barsClicked, setBarsClicked] = useState(false);

  window.addEventListener('resize', () => {
    setWidth(window.innerWidth);
  });

  // setBarsClicked need to be set to false again when width > 640

  const showDrawer = () => {
    setBarsClicked(true);
    setOpen(true);
  };

  const onClose = () => {
    setBarsClicked(false);
    setOpen(false);
  };

  const checkBarsClicked = () => {
    if (barsClicked) return true;
    else return false;
  };

  return (
    <>
      <img
        src={icon}
        alt='bars'
        width={25}
        onClick={showDrawer}
        className='cursor-pointer'
      />
      <Drawer
        onClose={onClose}
        open={width < 640 && checkBarsClicked()}
        width={270}
      >
        <div className='flex flex-col gap-5'>
          {!currentUser ? (
            <>
              <Link to='/signup'>
                <button className='nav__button w-full'>Sign up</button>
              </Link>
              <Link to='/login'>
                <button className='nav__button w-full'>Log in</button>
              </Link>
            </>
          ) : (
            <div className='flex flex-col gap-4'>
              <Link to='/profile' className='self-center'>
                <img
                  src={currentUser.avatar}
                  alt='profile'
                  width={150}
                  height={150}
                  className='rounded-full shadow-lg'
                />
              </Link>
              <Link to='/home'>
                <button className='nav__button w-full'>View Files</button>
              </Link>
            </div>
          )}
        </div>
      </Drawer>
    </>
  );
};

export default NavbarDrawer;
