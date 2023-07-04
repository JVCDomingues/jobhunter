import { Job } from '@/hooks/useUser';
import { getDateDifference } from '../helpers/getDateDifference';
import { getDateIntervalMessage } from '../helpers/getIntervalMessage';

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
      <div className="flex items-center gap-3">
        <h1>{job.name}</h1>
        <span className="bg-zinc-700 rounded-full w-1 h-1"></span>
        <span className="text-xs bg-cyan-50 p-1 rounded-lg border border-cyan-300 text-cyan-900">
          {job.company}
        </span>
      </div>
      <span className="text-xs text-zinc-500">{intervalMessage}</span>
    </div>
  );
}
