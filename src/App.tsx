import { Routes, Route, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar';
import Hero from './pages/Hero';
import Home from './pages/Home';
import { Signup } from './pages/Signup';
import { Login } from './pages/Login';
import Profile from './pages/Profile';
import Protected from './components/Protected';
import TrashFiles from './pages/TrashFiles';
import StarredFiles from './pages/StarredFiles';
import { Toaster } from 'react-hot-toast';

const App = () => {
  const location = useLocation();
  return (
    <>
      {location.pathname !== '/home' && location.pathname !== '/profile' && (
        <NavBar />
      )}
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
        <Route
          path='/profile'
          element={
            <Protected>
              <Profile />
            </Protected>
          }
        />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/trash' element={<TrashFiles />} />
        <Route path='/starred' element={<StarredFiles />} />
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
