import toast from 'react-hot-toast';
import { fileType } from '../context/FileContext';
import { useSelector } from 'react-redux';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { app } from '../firebase.config';

export const useFileOperations = () => {
  const { currentUser } = useSelector((state: any) => state.user);
  const addFileDB = async (url: string, fileData: fileType) => {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(fileData),
      });

      const data = await res.json();
      if (data.status !== 'success') {
        throw new Error(data.message);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const moveToTrashDB = async (url: string) => {
    try {
      const res = await fetch(url, {
        method: 'DELETE',
      });

      const data = await res.json();
      if (data.status !== 'success') {
        throw new Error(data.message);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const addFileToFirestore = (file: File) => {
    const storage = getStorage(app);
    const storageRef = ref(storage, `${currentUser.email}/${file.name}`);

    uploadBytes(storageRef, file).then(() => {
      console.log('file Uploaded');
    });
  };

  return { addFileDB, moveToTrashDB, addFileToFirestore };
};
