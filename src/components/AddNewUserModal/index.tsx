import useUsers from '@/hooks/useUser';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import Input from '../FormComponents/Input';

interface AddNewUserModalProps {
  handleClose: () => void;
}

export default function AddNewUserModal({ handleClose }: AddNewUserModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
  });

  const handleInputChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('api/users/new', {
        method: 'POST',
        body: JSON.stringify(formData),
      });
      if (response.status === 201) {
        handleSuccessRegistration();
      }
    } catch (err) {}
  };

  const handleSuccessRegistration = () => {
    handleClose();
    revalidate();
  };

  useEffect(() => {}, []);

  return (
    <div className="w-screen h-screen absolute flex items-center justify-center top-0 bottom-0 backdrop-blur-md transition-all">
      <div className="rounded-lg shadow w-[500px] border border-zinc-200">
        <div className="p-7 flex items-center justify-between border-b border-zinc-300 bg-zinc-100">
          <h1 className="text-xl">Add new user</h1>
          <button className="rounded-md p-1 hover:bg-zinc-200 transition-all">
            <X onClick={handleClose} />
          </button>
        </div>
        <div className="p-7 flex flex-col bg-white">
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
          <Input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={event =>
              handleInputChange(event.target.name, event.target.value)
            }
          />
        </div>
        <div className="border-t border-zinc-300 p-7 bg-zinc-100">
          <button
            className="p-4 text-xl bg-blue-700 text-white w-full rounded-md hover:bg-blue-800 transition-all cursor-pointer"
            onClick={handleSubmit}
            disabled={!formData.password}
          >
            Add user
          </button>
        </div>
      </div>
    </div>
  );
}
