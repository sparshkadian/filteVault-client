import Hero from './pages/Hero';
import NavBar from './components/NavBar';

const App = () => {
  return (
    <div className='h-screen w-screen relative'>
      <NavBar />
      <Hero />
    </div>
  );
};

export default App;
