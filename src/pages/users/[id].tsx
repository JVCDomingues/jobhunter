import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import LoadingScreen from '@/components/LoadingScreen';
import { User } from '@/hooks/useUser';
import { getDateDifference } from './helpers/getDateDifference';
import { getDateIntervalMessage } from './helpers/getIntervalMessage';
import Head from 'next/head';

export default function UserPage() {
  const { query } = useRouter();
  const [user, setUser] = useState({} as User);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      const response = await fetch(
        `http://localhost:3000/api/users/${query.id}`
      );
      const data = await response.json();

      if (response.ok) {
        setUser(data);
      }

      setIsLoading(false);
    };

    if (query.id) {
      fetchUser();
    }
  }, [query.id]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Head>
        <title>{user?.name}</title>
      </Head>
      <div className="h-screen bg-zinc-50">
        <Header />
        {/* Main div */}
        <div className="p-7">
          <h1 className="mb-5 text-3xl font-bold">User</h1>
          <div className="bg-white rounded-md shadow-sm w-full p-5 border border-zinc-300 mb-5">
            <h1 className="text-xl">{user.name}</h1>
            <span className="text-sm text-zinc-500">@{user.username}</span>
          </div>

          <h1 className="text-3xl font-bold mb-3">{user?.jobs?.length} jobs</h1>

          <div className="grid lg:grid-cols-4 sm:grid-cols-1 md:grid-cols-2 gap-3">
            {user?.jobs?.length > 0 &&
              user.jobs.map(job => {
                const differenceInDays = getDateDifference(
                  job.createdAt,
                  new Date()
                );

                const intervalMessage =
                  getDateIntervalMessage(differenceInDays);

                return (
                  <div
                    className="bg-white rounded-md shadow-sm w-full p-5 border border-zinc-300"
                    key={job.id}
                  >
                    <div className="flex items-center gap-3">
                      <h1>{job.name}</h1>
                      <span className="bg-zinc-700 rounded-full w-1 h-1"></span>
                      <span className="text-xs bg-cyan-50 p-1 rounded-lg border border-cyan-300 text-cyan-900">
                        {job.company}
                      </span>
                    </div>
                    <span className="text-xs text-zinc-500">
                      {intervalMessage}
                    </span>
                  </div>
                );
              })}
          </div>
        </div>
        {/* Main div */}
      </div>
    </>
  );
}
