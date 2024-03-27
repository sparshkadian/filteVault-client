import toast from 'react-hot-toast';
import {
  profileUpdateStart,
  profileUpdateSuccess,
  profileUpdateFailure,
} from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';

export const useProfileUpdate = () => {
  const dispatch = useDispatch();
  const profileUpdate = async (
    url: string,
    formData: { userName: string; avatar: string; about: string }
  ) => {
    try {
      dispatch(profileUpdateStart());
      const res = await fetch(url, {
        method: 'PATCH',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.status !== 'success') {
        dispatch(profileUpdateFailure());
        throw new Error(data.message);
      }
      dispatch(profileUpdateSuccess(data.user));
      toast.success('Profile Updated Successfully');
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return { profileUpdate };
};
