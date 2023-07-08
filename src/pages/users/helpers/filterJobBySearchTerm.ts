import { Job } from '@/hooks/useUser';

const filterJob = (term: string, fieldToFilter: string) => {
  return fieldToFilter.includes(term);
};

export const filterJobBySearchTerm = (jobs: Job[], searchTerm: string) => {
  const capitalizedSearchTerm = searchTerm.toLowerCase();

  const filteredJobs = searchTerm
    ? jobs.filter(
        job =>
          filterJob(capitalizedSearchTerm, job.name.toLowerCase()) ||
          filterJob(capitalizedSearchTerm, job.company.toLowerCase()) ||
          filterJob(capitalizedSearchTerm, job.modality.toLowerCase()) ||
          filterJob(capitalizedSearchTerm, job.status.toLowerCase())
      )
    : jobs;

  return filteredJobs;
};
