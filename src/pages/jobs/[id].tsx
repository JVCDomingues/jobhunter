import Header from '@/components/Header';
import { useFetch } from '@/hooks/useFetch';
import { Job } from '@/types/types';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { getDateIntervalMessage } from '../users/helpers/getIntervalMessage';
import { getDateDifference } from '../users/helpers/getDateDifference';
import { Building2, Calendar, MapPin } from 'lucide-react';

export default function Jobs() {
  const { query } = useRouter();
  const { data, error, isLoading } = useFetch<Job>(`/api/jobs/${query.id}`);

  if (isLoading) {
    return <h1>Loading job...</h1>;
  }

  return (
    <div className="h-screen bg-zinc-50">
      <Head>
        <title>Job detail</title>
      </Head>
      <Header />
      <div className="p-7">
        <h1 className="text-4xl font-medium text-slate-600">{data?.name}</h1>
        <div className="flex items-center gap-8 mt-4 xs:flex-col">
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-slate-500" />
            <span className="text-sm text-slate-500">
              {getDateIntervalMessage(
                getDateDifference(data?.createdAt, new Date())
              )}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Building2 size={16} className="text-slate-500" />
            <span className="text-sm text-slate-500">{data?.company}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-slate-500" />
            <span className="text-sm text-slate-500">{data?.modality}</span>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-slate-800">{data?.description}</p>
        </div>
      </div>
    </div>
  );
}
