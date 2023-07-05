/* eslint-disable jsx-a11y/no-static-element-interactions */
import { X } from 'lucide-react';

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  handleClose: () => void;
}

export default function Modal({ isOpen, handleClose, children }: ModalProps) {
  return (
    <div
      className={`fixed inset-0 flex justify-center items-center transition-colors ${
        isOpen ? 'visible bg-black/20' : 'invisible'
      }`}
      onClick={handleClose}
      data-testid="modal-container"
    >
      <div
        onClick={event => event.stopPropagation()}
        className={`bg-white rounded-xl shadow transition-all ${
          isOpen ? 'scale-100 opacity-100' : 'scale-125 opacity-0'
        }`}
      >
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600 transition-all"
        >
          <X />
        </button>
        {children}
      </div>
    </div>
  );
}
