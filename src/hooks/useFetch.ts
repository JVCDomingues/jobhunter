import axios from 'axios';
import useSWR from 'swr';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

export function useFetch<Data = any, Error = any>(url: string) {
  const { data, error, isLoading, mutate } = useSWR<Data, Error>(
    url,
    async url => {
      const { data } = await api.get(url);

      return data;
    }
  );

  return { data, error, isLoading, mutate };
}
