import Input from '@/components/FormComponents/Input';
import ErrorToast from '@/components/Toast/ErrorToast';
import SuccessToast from '@/components/Toast/SuccessToast';
import { useToast } from '@/components/Toast/ToastContext';
import { useState } from 'react';

interface NewJobFormProps {
  userId: number;
  handleModalClose: () => void;
  revalidate: () => Promise<void>;
}

export default function NewJobForm({
  userId,
  handleModalClose,
  revalidate,
}: NewJobFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    createdAt: '',
  });

  const { openToast } = useToast();

  const handleInputChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    const payload = {
      ...formData,
      createdAt: new Date(formData.createdAt).toISOString(),
      userId,
    };

    const response = await fetch('http://localhost:3000/api/jobs', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (response.status === 201) {
      handleSuccess();
    } else {
      triggerErrorToast(data.message);
    }
  };

  const triggerSuccessToast = () => {
    openToast(<SuccessToast message="Job added successfully" />);
  };

  const triggerErrorToast = (message: string) => {
    openToast(<ErrorToast message={message} />);
  };

  const handleSuccess = async () => {
    await revalidate();
    handleModalClose();
    triggerSuccessToast();
    setFormData({
      name: '',
      company: '',
      createdAt: '',
    });
  };

  return (
    <div className="w-[450px]">
      <div className="p-6 bg-zinc-50 font-bold border-b border-zinc-200 rounded-t-lg">
        <h1 className="text-md">New application</h1>
      </div>

      <div className="bg-white p-6 flex flex-col">
        <Input
          placeholder="Job name"
          autoFocus
          name="name"
          value={formData.name}
          onChange={event =>
            handleInputChange(event.target.name, event.target.value)
          }
        />
        <Input
          placeholder="Company"
          name="company"
          value={formData.company}
          onChange={event =>
            handleInputChange(event.target.name, event.target.value)
          }
        />
        <Input
          type="date"
          name="createdAt"
          value={formData.createdAt}
          onChange={event =>
            handleInputChange(event.target.name, event.target.value)
          }
        />
      </div>

      <div className="p-6 border-t border-zinc-200 bg-zinc-50 flex items-center gap-4 justify-end rounded-b-lg">
        <button
          className="rounded-md p-2 w-[90px] bg-white border border-zinc-200"
          onClick={handleModalClose}
        >
          Cancel
        </button>
        <button
          className="bg-blue-600 text-white font-bold p-2 rounded-md w-[90px] hover:bg-blue-800 transition-all"
          onClick={handleSubmit}
          disabled={!formData.company || !formData.name || !formData.createdAt}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
