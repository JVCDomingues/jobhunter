import axios from 'axios';
import useSWR from 'swr';

export const api = axios.create({
  baseURL: 'http://localhost:3000',
});

/**
 * Custom hook for data fetching using SWR (stale-while-revalidate) with Axios.
 *
 * @template Data
 * @template Error
 * @param {string} url - The URL to fetch the data from.
 * @returns {{
 *   data: Data | undefined,
 *   error: Error | undefined,
 *   isLoading: boolean,
 *   mutate: (data: Data | Promise<Data> | undefined, shouldRevalidate?: boolean) => Promise<Data | undefined>
 * }}
 */

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
