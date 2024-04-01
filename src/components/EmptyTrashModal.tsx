import { Modal } from 'antd';
import { useFileOperations } from '../hooks/useFileOperations';
import { useState } from 'react';
import { dbFile } from '../types';

const EmptyTrashModal = ({
  trashFiles,
  setTrashFiles,
  modalOpen,
  setIsEmptyTrashModalOpen,
}: {
  trashFiles: dbFile[];
  setTrashFiles: React.Dispatch<React.SetStateAction<dbFile[]>>;
  modalOpen: boolean;
  setIsEmptyTrashModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { emptyTrash } = useFileOperations();
  // @ts-ignore
  const [isModalOpen, setIsModalOpen] = useState(modalOpen);

  const handleOk = () => {
    setIsEmptyTrashModalOpen(false);
    emptyTrash(trashFiles, setTrashFiles);
  };

  const handleCancel = () => {
    setIsEmptyTrashModalOpen(false);
  };

  return (
    <Modal
      title='Delete Forever?'
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      okButtonProps={{ danger: true }}
      okText='Delete Forever'
    >
      <p className='text-sm'>
        All Items in the trash will be deleted forever and you won't be able to
        restore them
      </p>
    </Modal>
  );
};

export default EmptyTrashModal;
