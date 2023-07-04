import Input from '@/components/FormComponents/Input';
import ErrorToast from '@/components/Toast/ErrorToast';
import SuccessToast from '@/components/Toast/SuccessToast';
import { useToast } from '@/components/Toast/ToastContext';
import { useState } from 'react';

interface NewUserFormProps {
  handleModalClose: () => void;
  revalidate: () => Promise<void>;
}

export default function NewUserForm({
  handleModalClose,
  revalidate,
}: NewUserFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
  });
  const { openToast } = useToast();

  const handleInputChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    const response = await fetch('api/users/new', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    if (response.status === 201) {
      handleSuccessRegistration();
    }

    if (response.status !== 201) {
      triggerErrorToast(data.message);
    }
  };

  const handleSuccessRegistration = async () => {
    await revalidate();
    handleModalClose();
    triggerSuccessToast();
    setFormData({
      name: '',
      username: '',
    });
  };

  const triggerErrorToast = (message: string) => {
    openToast(<ErrorToast message={message} />);
  };

  const triggerSuccessToast = () => {
    openToast(<SuccessToast message="User added successfully" />);
  };

  return (
    <div className="w-[450px]">
      <div className="p-6 bg-zinc-50 font-bold border-b border-zinc-200 rounded-t-lg">
        <h1 className="text-md">New user</h1>
      </div>
      <div className="flex flex-col bg-white p-6">
        <Input
          placeholder="Name"
          autoFocus
          name="name"
          value={formData.name}
          onChange={event =>
            handleInputChange(event.target.name, event.target.value)
          }
        />
        <Input
          placeholder="Username"
          name="username"
          value={formData.username}
          onChange={event =>
            handleInputChange(event.target.name, event.target.value)
          }
        />
      </div>
      <div className="flex items-center gap-4 justify-end p-6 border-t border-zinc-200 bg-zinc-50 rounded-b-lg">
        <button
          className="rounded-md p-2 w-[90px] bg-white border border-zinc-200"
          onClick={handleModalClose}
        >
          Cancel
        </button>
        <button
          className="bg-blue-600 text-white font-bold p-2 rounded-md w-[90px] hover:bg-blue-800 transition-all cursor-pointer"
          onClick={handleSubmit}
          disabled={!formData.username}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
