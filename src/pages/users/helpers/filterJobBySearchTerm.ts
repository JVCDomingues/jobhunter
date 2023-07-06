import { Job } from '@/hooks/useUser';

export const filterJobBySearchTerm = (jobs: Job[], searchTerm: string) => {
  const filteredJobs = searchTerm
    ? jobs.filter(job => job.name.toLowerCase().includes(searchTerm))
    : jobs;

  return filteredJobs;
};
