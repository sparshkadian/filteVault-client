import { Routes, Route } from 'react-router-dom';
import Hero from './pages/Hero';
import NavBar from './components/NavBar';
import { SignupFormDemo } from './pages/Signup';

const App = () => {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <div className='h-screen w-screen relative'>
            <NavBar />
            <Hero />
          </div>
        }
      />
      <Route path='/signup' element={<SignupFormDemo />} />
    </Routes>
  );
};

export default App;
