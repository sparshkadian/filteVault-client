import toast from 'react-hot-toast';
import { fileType } from '../context/FileContext';
import { useSelector } from 'react-redux';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from 'firebase/storage';
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

  const deleteFilePerm = async (
    url: string,
    fileId: string,
    trashFiles: any,
    setTrashFiles: React.Dispatch<React.SetStateAction<fileType[]>>
  ) => {
    try {
      await fetch(url, {
        method: 'DELETE',
      });
      toast.success('File Deleted');
      setTrashFiles(
        trashFiles.filter((file: any) => {
          return file._id !== fileId;
        })
      );
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const addFileToFirestore = (file: File) => {
    const storage = getStorage(app);
    const fileName = file.name.split('.')[0];
    const storageRef = ref(storage, `${currentUser.email}/${fileName}`);

    uploadBytes(storageRef, file).then(() => {
      console.log('file Uploaded');
    });
  };

  const getFileDownloadUrl = (fileName: string) => {
    const storage = getStorage(app);
    getDownloadURL(ref(storage, `${currentUser.email}/${fileName}`))
      .then((url) => {
        window.open(url);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const changeProfilePicture = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const storageRef = ref(storage, `${currentUser.email}/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        (error: any) => {
          toast.error(error.message);
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  return {
    addFileDB,
    moveToTrashDB,
    deleteFilePerm,
    addFileToFirestore,
    getFileDownloadUrl,
    changeProfilePicture,
  };
};
