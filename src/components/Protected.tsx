import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import { Navigate } from 'react-router-dom';

const Protected = ({ children }: { children: React.ReactNode }) => {
  const { currentUser } = useContext(AppContext);

  return currentUser ? children : <Navigate to='/signup' />;
};

export default Protected;
