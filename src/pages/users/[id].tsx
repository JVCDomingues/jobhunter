import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '@/components/Header';
import LoadingScreen from '@/components/LoadingScreen';
import JobCard from './components/JobCard';
import { User } from '@/hooks/useUser';
import { Plus } from 'lucide-react';
import Modal from '@/components/Modal';
import NewJobForm from './components/NewJobForm';

export default function UserPage() {
  const { query } = useRouter();
  const [user, setUser] = useState({} as User);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchUser = async () => {
    setIsLoading(true);
    const response = await fetch(`http://localhost:3000/api/users/${query.id}`);
    const data = await response.json();

    if (response.ok) {
      setUser(data);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (query.id) {
      fetchUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.id]);

  const revalidate = async () => {
    await fetchUser();
  };

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

          <div className="flex items-center gap-5 mb-3">
            <h1 className="text-3xl font-bold">{user?.jobs?.length} jobs</h1>
            <button
              onClick={() => setIsModalOpen(true)}
              className="rounded-md bg-blue-700 text-white p-2 text-sm font-bold flex items-center gap-2 transition-all hover:bg-blue-800"
            >
              <Plus size={18} />
              New application
            </button>
          </div>

          <div className="grid lg:grid-cols-4 sm:grid-cols-1 md:grid-cols-2 gap-3">
            {user?.jobs?.length > 0 &&
              user.jobs.map(job => <JobCard job={job} key={job.id} />)}
          </div>
        </div>
        {/* Main div */}

        <Modal isOpen={isModalOpen} handleClose={() => setIsModalOpen(false)}>
          <NewJobForm
            userId={user.id}
            handleModalClose={() => setIsModalOpen(false)}
            revalidate={revalidate}
          />
        </Modal>
      </div>
    </>
  );
}
