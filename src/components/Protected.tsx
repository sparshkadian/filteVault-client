import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const Protected = ({ children }: { children: React.ReactNode }) => {
  const { currentUser } = useSelector((state: any) => state.user);

  return currentUser ? children : <Navigate to='/signup' />;
};

export default Protected;
