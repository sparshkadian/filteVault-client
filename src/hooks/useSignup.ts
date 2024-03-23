import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const useSignup = () => {
  const navigate = useNavigate();
  const signup = async (
    url: string,
    formData: { userName: string; email: string; password: string }
  ) => {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.status !== 'success') {
        throw new Error(data.message);
      }
      toast.success('Account Created');
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
