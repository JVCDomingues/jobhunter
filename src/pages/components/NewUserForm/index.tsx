import Input from '@/components/FormComponents/Input';
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
    if (response.status === 201) {
      handleSuccessRegistration();
    }

    if (response.status !== 201) {
      console.error('An error ocurred');
    }
  };

  const handleSuccessRegistration = async () => {
    await revalidate();
    handleModalClose();
    setFormData({
      name: '',
      username: '',
    });
  };

  return (
    <>
      <h1 className="text-xl mb-5 font-semibold">Add new user</h1>
      <div className="flex flex-col bg-white">
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
      <div className="flex items-center gap-5 justify-end">
        <button
          className="p-3 text-md bg-blue-700 text-white rounded-md hover:bg-blue-800 transition-all cursor-pointer mt-3 w-full"
          onClick={handleSubmit}
          disabled={!formData.username}
        >
          Add user
        </button>
      </div>
    </>
  );
}
