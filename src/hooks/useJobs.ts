import { useCallback, useEffect, useState } from 'react';
import { Job } from './useUser';

const useJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchJobs = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('api/jobs');
      const data = await response.json();

      setJobs(data);
    } catch (err) {
      setError(true);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const revalidate = useCallback(async () => {
    await fetchJobs();
  }, []);

  return { jobs, isLoading, error, revalidate };
};

export default useJobs;
