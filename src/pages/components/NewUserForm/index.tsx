import Input from '@/components/FormComponents/Input';
import ErrorToast from '@/components/Toast/ErrorToast';
import SuccessToast from '@/components/Toast/SuccessToast';
import { useState } from 'react';
import toast from 'react-hot-toast';

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
    toast(<ErrorToast message={message} />);
  };

  const triggerSuccessToast = () => {
    toast(<SuccessToast message="User added successfully" />);
  };

  return (
    <div className="w-full sm:w-[500px]">
      <div className="p-6 bg-zinc-50 font-normal border-b border-zinc-200 rounded-t-lg">
        <h1 className="text-xl">New user</h1>
      </div>
      <div className="flex flex-col bg-white p-6">
        <div className="flex flex-col mb-5">
          <label
            htmlFor="name"
            className="font-normal mb-2 text-sm text-zinc-900"
          >
            Name
          </label>
          <Input
            id="name"
            autoFocus
            name="name"
            value={formData.name}
            onChange={event =>
              handleInputChange(event.target.name, event.target.value)
            }
          />
        </div>
        <div className="flex flex-col mb-5">
          <label
            htmlFor="username"
            className="font-normal mb-2 text-zinc-900 text-sm"
          >
            Username
          </label>
          <Input
            id="username"
            name="username"
            value={formData.username}
            onChange={event =>
              handleInputChange(event.target.name, event.target.value)
            }
          />
        </div>
      </div>
      <div className="flex items-center gap-4 justify-end px-6 py-4 border-t border-zinc-200 bg-zinc-50 rounded-b-lg">
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
