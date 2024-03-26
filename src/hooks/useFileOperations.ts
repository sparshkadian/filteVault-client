import toast from 'react-hot-toast';
import { fileType } from '../context/FileContext';

export const useFileOperations = () => {
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
  return { addFileDB, moveToTrashDB };
};
