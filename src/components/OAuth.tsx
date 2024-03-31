import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { app } from '../firebase.config';
import {
  googleSignInStart,
  googleSignInSuccess,
  googleSignInFailure,
} from '../redux/user/userSlice';
import toast from 'react-hot-toast';

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      dispatch(googleSignInStart());
      const res = await fetch(
        'https://filevault.onrender.com/api/auth/google',
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            userName: result.user.displayName,
            email: result.user.email,
            avatar: result.user.photoURL,
          }),
        }
      );

      const data = await res.json();
      if (data.status !== 'success') {
        dispatch(googleSignInFailure());
        throw new Error(data.message);
      }
      dispatch(googleSignInSuccess(data.user));
      navigate('/home');
    } catch (error: any) {
      toast.error('Error with Google Auth', error.message);
      dispatch(googleSignInFailure());
    }
  };

  return (
    <div onClick={handleGoogleClick}>
      <span>Continue with Google</span>
    </div>
  );
};

export default OAuth;
