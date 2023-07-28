import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '@/components/Header';
import LoadingScreen from '@/components/LoadingScreen';
import JobTable from './components/JobTable/JobTable';
import { Plus } from 'lucide-react';
import Modal from '@/components/Modal';
import NewJobForm from './components/NewJobForm';
import Summary from './components/Summary';
import { User } from '@/types/types';
import { useFetch } from '@/hooks/useFetch';

export default function UserPage() {
  const { query } = useRouter();
  const { data, error, isLoading, mutate } = useFetch<User>(
    `/api/users/${query.id}`
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <h1>Error</h1>;
  }

  return (
    <>
      <Head>
        <title>{data?.name} | JobHunter</title>
      </Head>
      <div className="h-screen bg-zinc-50">
        <Header />
        {/* Main div */}
        <div className="p-7">
          <div className="flex items-center gap-3 mb-5">
            <h1 className="text-3xl font-medium text-zinc-700">Summary</h1>
            <div className="rounded-full w-1 h-1 bg-slate-500"></div>
            <span className="text-sm text-slate-500">@{data?.username}</span>
          </div>
          <Summary jobs={data?.jobs} />

          <div className="flex items-center justify-between gap-5 mb-3 mt-10">
            <button
              onClick={() => setIsModalOpen(true)}
              className="rounded-md bg-blue-700 text-white p-2 text-sm font-medium flex items-center gap-2 transition-all hover:bg-blue-800"
            >
              <Plus size={18} />
              New application
            </button>
          </div>

          <JobTable jobs={data?.jobs} revalidate={mutate} />
        </div>
        {/* Main div */}

        <Modal isOpen={isModalOpen} handleClose={() => setIsModalOpen(false)}>
          <NewJobForm
            userId={data?.id}
            handleModalClose={() => setIsModalOpen(false)}
            revalidate={mutate}
          />
        </Modal>
      </div>
    </>
  );
}
