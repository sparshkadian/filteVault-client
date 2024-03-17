import { Routes, Route } from 'react-router-dom';
import Hero from './pages/Hero';
import { Signup } from './pages/Signup';
import { Login } from './pages/Login';
import { NavBar } from './components/Navbar';

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<Hero />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
