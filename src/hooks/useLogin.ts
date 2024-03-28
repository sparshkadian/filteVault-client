import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';

export const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const login = async (
    url: string,
    formData: { email: string; password: string }
  ) => {
    try {
      dispatch(loginStart());
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.status !== 'success') {
        dispatch(loginFailure());
        throw new Error(data.message);
      }
      toast.success('Signin Successful');
      dispatch(loginSuccess(data.user));
      setTimeout(() => {
        navigate('/home');
      }, 500);
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return { login };
};
