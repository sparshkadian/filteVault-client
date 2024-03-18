import FileGallery from '../components/FileGallery';
import HomeSideMenu from '../components/HomeSideMenu';
import HomeDrawer from '../components/HomeDrawer';

const Home = () => {
  return (
    <div className='860:bg-gray-100/70 flex h-screen relative'>
      <HomeDrawer icon='./bars.png' />
      <HomeSideMenu />
      <FileGallery />
    </div>
  );
};

export default Home;
