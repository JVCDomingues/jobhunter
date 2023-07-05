import { User } from '@/hooks/useUser';
import { Trash2Icon, GanttChartIcon } from 'lucide-react';
import React from 'react';

interface UserCardProps {
  user: User;
  handleDeleteButton: () => void;
  handleNavigation: () => void;
}

export default function UserCard({
  user,
  handleDeleteButton,
  handleNavigation,
}: UserCardProps) {
  return (
    <div className="rounded-md border shadow border-zinc-200 w-98   bg-white">
      <div className="p-5">
        <h1 className="text-xl">{user.name}</h1>
        <span className="text-sm text-zinc-500">@{user.username}</span>
      </div>

      <div className="bg-gray-100 border-t border-t-zinc-300 px-5 py-3 mt-1 flex justify-between items-center">
        <span className="text-sm text-zinc-500">
          {user.jobs.length} jobs applied
        </span>
        <div className="flex items-center gap-2">
          <button
            className="bg-zinc-600 p-3 rounded-full text-white  hover:bg-zinc-800 transition-all"
            onClick={handleNavigation}
            data-testid="navigate-button"
          >
            <GanttChartIcon size={20} />
          </button>
          <button
            className="bg-red-500 p-3 rounded-full text-white hover:bg-red-700 transition-all"
            onClick={handleDeleteButton}
            data-testid="delete-button"
          >
            <Trash2Icon size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
