import { useState } from 'react';
import { Job } from '@/hooks/useUser';
import { getDateDifference } from '../../helpers/getDateDifference';
import { getDateIntervalMessage } from '../../helpers/getIntervalMessage';
import {
  Building2,
  CalendarDays,
  Flag,
  FolderEdit,
  MapPin,
} from 'lucide-react';
import { jobStatusDictionary } from '../../helpers/jobStatusIcon';
import { filterJobBySearchTerm } from '../../helpers/filterJobBySearchTerm';
import Modal from '@/components/Modal';
import EditJob from '../EditJob';
import DeleteJob from '../DeleteJob';

interface JobTableProps {
  jobs: Job[];
  revalidate: () => Promise<void>;
}

export default function JobTable({ jobs, revalidate }: JobTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState({} as Job);
  const jobsToShow = filterJobBySearchTerm(jobs, searchTerm);

  const handleEditButtonClick = (job: Job) => {
    setEditModalOpen(true);
    setSelectedJob(job);
  };

  const handleDeleteButtonClick = (job: Job) => {
    setSelectedJob(job);
    setDeleteModalOpen(true);
  };

  return (
    <div className="relative overflow-x-auto shadow-sm sm:rounded-lg border border-slate-200 mt-5">
      <div className="p-4 bg-white">
        <label htmlFor="table-search" className="sr-only">
          Search
        </label>
        <div className="relative mt-1 flex items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            id="table-search"
            className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-96 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search for jobs, companies, status and modalities"
            onChange={event => setSearchTerm(event.target.value)}
          />
        </div>
      </div>
      {jobs?.length === 0 ? (
        <div className="flex items-center p-5 justify-center">
          <strong className="text-xl font-medium">No jobs applied!</strong>
        </div>
      ) : (
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-zinc-200 border-t">
            <tr>
              <th scope="col" className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <FolderEdit size={16} />
                  Job title
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center gap-2">
                  <Building2 size={16} />
                  Company
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  Modality
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center gap-2">
                  <Flag size={16} />
                  Status
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center gap-2">
                  <CalendarDays size={16} />
                  Applied in
                </div>
              </th>
            </tr>
          </thead>

          <tbody>
            {jobsToShow?.map(job => (
              <tr
                className="bg-white border-b dark:bg-gray-800 hover:bg-gray-50"
                key={job.id}
              >
                <td className="px-6 py-4">{job.name}</td>
                <td className="px-6 py-4">{job.company}</td>
                <td className="px-6 py-4">{job.modality}</td>
                <td className="px-6 py-4 flex items-center gap-3">
                  {jobStatusDictionary[job.status]}
                  {job.status}
                </td>
                <td className="px-6 py-4">
                  {getDateIntervalMessage(
                    getDateDifference(job.createdAt, new Date())
                  )}
                </td>
                <td>
                  <button
                    className="text-blue-600 font-normal hover:text-blue-500 transition-all ml-6"
                    onClick={() => handleEditButtonClick(job)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600 font-normal hover:text-red-500 transition-all ml-6"
                    onClick={() => handleDeleteButtonClick(job)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Modal isOpen={editModalOpen} handleClose={() => setEditModalOpen(false)}>
        <EditJob
          job={selectedJob}
          handleModalClose={() => setEditModalOpen(false)}
          revalidate={revalidate}
        />
      </Modal>

      <Modal
        isOpen={deleteModalOpen}
        handleClose={() => setDeleteModalOpen(false)}
      >
        <div className="w-96">
          <DeleteJob
            jobId={selectedJob.id}
            handleModalClose={() => setDeleteModalOpen(false)}
            revalidate={revalidate}
          />
        </div>
      </Modal>
    </div>
  );
}
