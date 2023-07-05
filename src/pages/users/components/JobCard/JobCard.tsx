import { Job } from '@/hooks/useUser';
import { getDateDifference } from '../../helpers/getDateDifference';
import { getDateIntervalMessage } from '../../helpers/getIntervalMessage';

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  const differenceInDays = getDateDifference(job.createdAt, new Date());

  const intervalMessage = getDateIntervalMessage(differenceInDays);

  return (
    <div
      className="bg-white rounded-md shadow-sm p-5 border border-zinc-300"
      key={job.id}
    >
      <div className="flex items-center gap-3 mb-3">
        <h1>{job.name}</h1>
        <span className="bg-zinc-700 rounded-full w-1 h-1"></span>
        <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
          {job.company}
        </span>
      </div>
      <span className="bg-gray-100 text-gray-800 text-xs font-normal inline-flex items-center px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-400 border border-gray-400">
        <svg
          className="w-2.5 h-2.5 mr-1.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
        </svg>
        {intervalMessage}
      </span>
    </div>
  );
}
