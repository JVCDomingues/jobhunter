import { useRouter } from 'next/router';
import React from 'react';
import { FiLogOut } from 'react-icons/fi';

export default function Header() {
  const router = useRouter();

  return (
    <header className="bg-slate-200 px-8 py-4 flex justify-between items-center">
      <span className="text-2xl">jobHunter</span>
      <button
        className="bg-slate-700 text-white font-bold px-5 py-3 rounded-md flex items-center gap-4 hover:bg-slate-600 transition-all"
        onClick={() => router.push('/register')}
      >
        <FiLogOut />
        Register
      </button>
    </header>
  );
}
