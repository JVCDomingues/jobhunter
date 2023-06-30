import Header from '@/components/Header';
import React from 'react';

export default function NewJob() {
  const saveNewJob = async () => {
    const response = await fetch('api/jobs', {
      method: 'POST',
      body: JSON.stringify({
        name: 'software enginner - frontend',
        company: 'Mercado Livre',
      }),
    });
  };

  return (
    <>
      <Header />
      <div className="w-screen flex item-center justify-center">
        <div className="shadow-md mt-5 p-5 rounded-md w-80">
          <h1 className="mb-5 text-xl ">New Job</h1>
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="w-full px-3 py-2 rounded-md border-2 border-gray-500 mb-3"
          />
          <input
            type="text"
            name="company"
            placeholder="Company"
            className="w-full px-3 py-2 rounded-md border-2 border-gray-500"
          />

          <button className="rounded-md w-full bg-slate-900 font-bold px-5 py-3 text-white mt-5 hover:bg-slate-700 transition-all">
            Save
          </button>
        </div>
      </div>
    </>
  );
}
