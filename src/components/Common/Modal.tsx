import React from 'react';

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, closeModal, children }) => {
  return (
    // backdrop
    <div
      onClick={closeModal}
      className={`fixed inset-0 flex items-center justify-center transition-colors ${
        isOpen ? 'visible bg-black/20' : 'invisible'
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`rounded-xl bg-white p-6 shadow transition-all ${
          isOpen ? 'scale-100 opacity-100' : 'scale-125-opacity-0'
        } `}
      >
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 rounded-lg bg-white p-1 text-gray-400 hover:cursor-pointer hover:bg-gray-50"
        >
          ✖️
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
