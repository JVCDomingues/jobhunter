import { Job } from '@/types/types';
import { Briefcase, ThumbsDown, ThumbsUp } from 'lucide-react';

interface SummaryProps {
  jobs?: Job[];
}

export default function Summary({ jobs }: SummaryProps) {
  const totalAcceptances = jobs?.filter(
    job => job.status === 'Approved'
  ).length;
  const totalRejections = jobs?.filter(job => job.status === 'Rejected').length;

  return (
    <div className="grid lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-white p-5 rounded-lg shadow border border-zinc-200 flex items-center gap-7">
        <div className="bg-indigo-700 p-3 rounded-lg text-white">
          <Briefcase size={30} />
        </div>
        <div>
          <span className="text-sm text-zinc-500 font-normal">
            Total Applications
          </span>
          <h1 className="text-3xl font-bold">{jobs?.length}</h1>
        </div>
      </div>
      <div className="bg-white p-5 rounded-lg shadow border border-zinc-200 flex items-center gap-7">
        <div className="bg-green-600 p-3 rounded-lg text-white">
          <ThumbsUp size={30} />
        </div>
        <div>
          <span className="text-sm text-zinc-500 font-normal">Acceptances</span>
          <h1 className="text-3xl font-bold">{totalAcceptances}</h1>
        </div>
      </div>
      <div className="bg-white p-5 rounded-lg shadow border border-zinc-200 flex items-center gap-7">
        <div className="bg-red-700 p-3 rounded-lg text-white">
          <ThumbsDown size={30} />
        </div>
        <div>
          <span className="text-sm text-zinc-500 font-normal">Rejections</span>
          <h1 className="text-3xl font-bold">{totalRejections}</h1>
        </div>
      </div>
    </div>
  );
}
