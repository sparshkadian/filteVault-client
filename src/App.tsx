import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Hero from './pages/Hero';
import Home from './pages/Home';
import { Signup } from './pages/Signup';
import { Login } from './pages/Login';
import Protected from './components/Protected';

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<Hero />} />
        <Route
          path='/home'
          element={
            <Protected>
              <Home />
            </Protected>
          }
        />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
