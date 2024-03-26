import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import {
  signupStart,
  signupSuccess,
  signupFailure,
} from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';

export const useSignup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signup = async (
    url: string,
    formData: { userName: string; email: string; password: string }
  ) => {
    try {
      dispatch(signupStart());
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.status !== 'success') {
        dispatch(signupFailure());
        throw new Error(data.message);
      }
      toast.success('Account Created');
      dispatch(signupSuccess(data.user));
      setTimeout(() => {
        navigate('/home');
      }, 500);
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return { signup };
};
