import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
  const navigate = useNavigate();
  const login = async (
    url: string,
    formData: { email: string; password: string }
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
      toast.success('SignIn Successful');
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
