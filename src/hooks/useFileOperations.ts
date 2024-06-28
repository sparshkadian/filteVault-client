import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase.config';
import { dbFile } from '../types';
import { useDispatch } from 'react-redux';
import { moveToTrash, updatedFiles } from '../redux/file/fileSlice';
import { RootState } from '../redux/store';

export const useFileOperations = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const updateFile = async (url: string, dataToSend: any) => {
    try {
      const res = await fetch(url, {
        method: 'PATCH',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      const data = await res.json();
      if (data.status !== 'success') {
        throw new Error(data.message);
      }
      dispatch(updatedFiles(data.files));
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const checkIOS = async (
    resolve: any,
    downloadLink: string,
    fileId: string
  ) => {
    const data = { downloadLink };
    await updateFile(`http://localhost:4100/api/file/${fileId}`, data);
    if (/iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase())) {
      resolve(downloadLink);
    } else {
      window.open(downloadLink);
    }
  };

  const addFileDB = async (url: string, fileData: any) => {
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
      dispatch(moveToTrash(data.files));
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const addToStarred = async (file: dbFile) => {
    try {
      const res = await fetch(
        `http://localhost:4100/api/file/addToStarred/${file._id}`,
        {
          method: 'PATCH',
        }
      );
      const data = await res.json();
      console.log(data.files);
      dispatch(updatedFiles(data.files));
      toast.success(`${file.fileName} added to Starred`);
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromStarred = async (
    file: dbFile,
    fileId: string,
    starredFiles: dbFile[],
    setStarredFiles: React.Dispatch<React.SetStateAction<dbFile[]>>,
    callfromStarPage: boolean
  ) => {
    try {
      await fetch(
        `http://localhost:4100/api/file/removeFromStarred/${file._id}`,
        {
          method: 'PATCH',
        }
      );
      if (callfromStarPage) {
        setStarredFiles(
          starredFiles.filter((file) => {
            return file._id !== fileId;
          })
        );
      }
      toast.success(`${file.fileName} removed from Starred`);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteFilePerm = async (
    file: dbFile,
    fileId: string,
    trashFiles: any,
    setTrashFiles: React.Dispatch<React.SetStateAction<dbFile[]>>
  ) => {
    try {
      await fetch(`http://localhost:4100/api/file/permanent/${fileId}`, {
        method: 'DELETE',
      });
      toast.success(`${file.fileName} Deleted Permanently`);
      setTrashFiles(
        trashFiles.filter((file: dbFile) => {
          return file._id !== fileId;
        })
      );
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const restoreFile = async (
    file: dbFile,
    fileId: string,
    trashFiles: any,
    setTrashFiles: React.Dispatch<React.SetStateAction<dbFile[]>>
  ) => {
    try {
      const res = await fetch(
        `http://localhost:4100/api/file/moveOutOfTrash/${file._id}`,
        {
          method: 'PATCH',
        }
      );

      const data = await res.json();
      if (data.status !== 'success') {
        throw new Error(data.message);
      }
      toast.success(`${file.fileName} Restored`);
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
    setTrashFiles(
      trashFiles.filter((file: any) => {
        return file._id !== fileId;
      })
    );
  };

  const emptyTrash = async (
    trashFiles: dbFile[],
    setTrashFiles: React.Dispatch<React.SetStateAction<dbFile[]>>
  ) => {
    if (trashFiles.length === 0) {
      toast('Trash is Already Empty', {
        style: { backgroundColor: '#111', color: '#fff' },
      });
      return;
    }
    const trashFileIds = trashFiles.map((file: dbFile) => {
      return file._id;
    });

    await fetch(`http://localhost:4100/api/file/emptyTrash/${trashFileIds}`, {
      method: 'DELETE',
    });
    setTrashFiles([]);
    toast.success('Trash Empty');
  };

  const addFileToFirestore = (file: File) => {
    const storage = getStorage(app);
    const fileName = file.name.split('.')[0];
    const storageRef = ref(storage, `${currentUser.email}/${fileName}`);

    uploadBytes(storageRef, file).then(() => {
      console.log('file Uploaded');
    });
  };

  const getFileDownloadUrl = async (fileName: string, fileId?: string) => {
    const storage = getStorage(app);
    return new Promise<string>((resolve, reject) =>
      getDownloadURL(ref(storage, `${currentUser.email}/${fileName}`))
        .then((url) => {
          if (fileId) checkIOS(resolve, url, fileId);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        })
    );
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
    addToStarred,
    removeFromStarred,
    deleteFilePerm,
    restoreFile,
    emptyTrash,
    addFileToFirestore,
    getFileDownloadUrl,
    changeProfilePicture,
    updateFile,
  };
};
