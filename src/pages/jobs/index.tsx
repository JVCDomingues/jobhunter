import Header from '@/components/Header';
import useJobs from '@/hooks/useJobs';
import { getDateIntervalMessage } from '../users/helpers/getIntervalMessage';
import { getDateDifference } from '../users/helpers/getDateDifference';
import { Briefcase, ExternalLink } from 'lucide-react';

export default function Jobs() {
  const { jobs, isLoading } = useJobs();

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="h-screen bg-zinc-50">
      <Header />
      <div className="p-7">
        <h1 className="text-3xl font-medium text-zinc-800">Jobs</h1>

        <div className="pt-5 grid grid-cols-3 gap-4">
          {jobs.map(job => (
            <div
              key={job.id}
              className="bg-white rounded-lg border border-zinc-300 shadow"
            >
              <div className="p-6 bg-zinc-100 border-b border-zinc-200 flex items-center gap-5">
                <Briefcase size={30} />
                <div>
                  <h1 className="text-xl font-medium text-zinc-800">
                    {job.name}
                  </h1>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-zinc-500">
                      {getDateIntervalMessage(
                        getDateDifference(job.createdAt, new Date())
                      )}
                    </span>
                    <div className="w-1 h-1 rounded-full bg-zinc-500"></div>
                    <span className="text-sm text-zinc-500">
                      {job.modality}
                    </span>
                  </div>
                  <span className="text-sm text-zinc-500 font-normal">
                    {job.company}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad
                  iure ut soluta aperiam corporis? Dicta, eligendi aut veritatis
                  fugiat fugit praesentium incidunt similique repellendus. Quo
                  excepturi unde asperiores tempore sit.
                </p>
              </div>

              <div className="bg-zinc-100 border-t border-t-zinc-200 px-6 py-3 flex items-center gap-5 justify-between">
                <button className="flex items-center gap-3 text-sm bg-teal-600 text-white font-medium rounded px-4 py-2 hover:bg-teal-500 transition-all">
                  <ExternalLink size={20} />
                  Apply
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
