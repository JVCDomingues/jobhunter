import { useState, useEffect, useCallback } from 'react';

export interface User {
  id: number;
  name: string;
  username: string;
  jobs: Job[];
}

export interface Job {
  id: number;
  name: string;
  company: string;
  createdAt: string;
  modality: string;
  status: string;
  applierId: number;
}

const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('api/users');
      const data = await response.json();

      setIsLoading(false);
      setUsers(data);
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const revalidate = useCallback(async () => {
    await fetchUsers();
  }, []);

  return { users, error, isLoading, revalidate };
};

export default useUsers;
