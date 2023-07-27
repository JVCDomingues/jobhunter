import { useEffect, useState } from 'react';
import Input from '@/components/FormComponents/Input';
import { modalities, status } from '../NewJobForm/constants';
import ErrorToast from '@/components/Toast/ErrorToast';
import SuccessToast from '@/components/Toast/SuccessToast';
import { toast } from 'react-hot-toast';
import { Job } from '@/types/types';
import { api } from '@/hooks/useFetch';

interface EditJobProps {
  job: Job;
  handleModalClose: () => void;
  revalidate: () => Promise<void>;
}

export default function EditJob({
  job,
  handleModalClose,
  revalidate,
}: EditJobProps) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    createdAt: '',
    modality: '',
    status: '',
  });

  const handleInputChange = (name: string, value: string) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const payload = {
      ...formData,
      createdAt: new Date(formData.createdAt).toISOString(),
    };

    const { data, status } = await api.put(`/api/jobs/${job.id}`, payload);

    if (status === 200) {
      handleUpdateSuccess();
    } else {
      triggerErrorToast(data.message);
    }
  };

  const triggerErrorToast = (message: string) => {
    toast(<ErrorToast message={message} />);
  };

  const triggerSuccessToast = (message: string) => {
    toast(<SuccessToast message={message} />);
  };

  const handleUpdateSuccess = async () => {
    handleModalClose();
    await revalidate();
    triggerSuccessToast('Job updated successfully');
  };

  useEffect(() => {
    setFormData(job);
  }, [job]);

  return (
    <div className="w-full sm:w-[500px]">
      <div className="p-6 bg-zinc-50 font-normal border-b border-zinc-200 rounded-t-lg">
        <h1 className="text-xl">Edit application</h1>
      </div>

      <div className="bg-white p-6 flex flex-col">
        <div className="mb-5 flex flex-col">
          <label
            htmlFor="jobName"
            className="font-normal mb-2 text-sm text-zinc-900"
          >
            Job name
          </label>
          <Input
            autoFocus
            name="name"
            id="jobName"
            value={formData.name}
            onChange={event =>
              handleInputChange(event.target.name, event.target.value)
            }
          />
        </div>
        <div className="mb-5 flex flex-col">
          <label
            htmlFor="jobName"
            className="font-normal mb-2 text-sm text-zinc-900"
          >
            Company
          </label>
          <Input
            name="company"
            value={formData.company}
            onChange={event =>
              handleInputChange(event.target.name, event.target.value)
            }
          />
        </div>
        <div className="mb-5 flex flex-col">
          <label
            htmlFor="modality"
            className="font-normal mb-2 text-sm text-zinc-900"
          >
            Modality
          </label>
          <select
            id="modality"
            name="modality"
            value={formData.modality}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 font-normal"
            onChange={event =>
              handleInputChange(event.target.name, event.target.value)
            }
          >
            <option selected>Choose a modality</option>
            {modalities.map((modality, index) => (
              <option value={modality} key={index}>
                {modality}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-5 flex flex-col">
          <label
            htmlFor="status"
            className="font-normal mb-2 text-sm text-zinc-900"
          >
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 font-normal"
            onChange={event =>
              handleInputChange(event.target.name, event.target.value)
            }
          >
            <option selected>Choose a status</option>
            {status.map((status, index) => (
              <option value={status} key={index}>
                {status}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-5 flex flex-col">
          <label
            htmlFor="jobName"
            className="font-normal mb-2 text-sm text-zinc-900"
          >
            Application date
          </label>
          <Input
            type="date"
            name="createdAt"
            value={formData.createdAt}
            onChange={event =>
              handleInputChange(event.target.name, event.target.value)
            }
          />
        </div>
      </div>

      <div className="py-4 px-6 border-t border-zinc-200 bg-zinc-50 flex items-center gap-4 justify-end rounded-b-lg">
        <button
          className="rounded-md p-2 sm:w-[90px] w-full bg-white border border-zinc-200"
          onClick={handleModalClose}
        >
          Cancel
        </button>
        <button
          className="bg-blue-600 text-white font-bold p-2 rounded-md sm:w-[90px] w-full hover:bg-blue-800 transition-all disabled:bg-zinc-500 disabled:cursor-not-allowed"
          onClick={handleSubmit}
          disabled={!formData.company || !formData.name || !formData.createdAt}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
