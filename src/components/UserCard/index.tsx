import { User } from '@/hooks/useUser';
import React from 'react';

interface UserCardProps {
  user: User;
  handleDeleteButton: () => Promise<void>;
}

export default function UserCard({ user, handleDeleteButton }: UserCardProps) {
  return (
    <div className="rounded-md shadow-md w-98 cursor-pointer hover:shadow-lg transition-all border-t-8 border-t-lime-600">
      <div className="p-5">
        <h1 className="text-xl">{user.name}</h1>
        <span>{user.username}</span>
      </div>

      <div className="bg-gray-100 border-t border-t-slate-300 px-5 py-3 mt-1 flex justify-between items-center">
        <span>{user.jobs.length} jobs applied</span>
        <button
          className="bg-red-500 font-bold px-5 py-3 rounded-md text-white"
          onClick={handleDeleteButton}
          data-testid="delete-button"
        >
          Delete user
        </button>
      </div>
    </div>
  );
}
