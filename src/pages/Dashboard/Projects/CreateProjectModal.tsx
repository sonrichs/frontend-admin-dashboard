import { useState } from 'react';
import Modal from '../../../components/Common/Modal';
import { ProjectCreationForm } from './ProjectCreationForm';
import ProtectedRoute from '../../../components/Common/ProtectedRoute';

export default function CreateProjectModal() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <ProtectedRoute>
      <button
        onClick={openModal}
        className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
      >
        Create
      </button>

      <Modal
        isOpen={isModalOpen}
        closeModal={closeModal}
      >
        <div className="max-w-full text-center">
          <div className="mx-auto my-4 w-full">
            <h3 className="text-lg font-black text-gray-800">Create</h3>
            <ProjectCreationForm closeModal={closeModal} />
          </div>
        </div>
      </Modal>
    </ProtectedRoute>
  );
}
