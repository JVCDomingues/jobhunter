import { AlertTriangle } from 'lucide-react';

interface DeleteUserDialogProps {
  handleModalClose: () => void;
  revalidate: () => Promise<void>;
  userId: number;
}

export default function DeleteUserDialog({
  handleModalClose,
  revalidate,
  userId,
}: DeleteUserDialogProps) {
  const deleteUser = async () => {
    const response = await fetch(`api/users/${userId}`, {
      method: 'DELETE',
    });

    if (response.status === 200) {
      await revalidate();
      handleModalClose();
    }

    if (response.status !== 200) {
      console.error('error');
    }
  };

  return (
    <div>
      <div className="flex items-center gap-5">
        <AlertTriangle
          className="bg-red-100 p-2 rounded-full border border-red-300 text-red-500"
          size={40}
        />
        <span className="font-medium">Delete user</span>
      </div>
      <p className="mt-5 text-zinc-500">
        Are you sure you want to delete this user? This action cannot be undone.
      </p>
      <div className="flex items-center justify-end gap-3 mt-6">
        <button
          className="border w-[80px] border-zinc-200 rounded-md px-3 py-2 text-sm font-bold hover:bg-zinc-100 transition-all"
          onClick={handleModalClose}
        >
          Cancel
        </button>
        <button
          className="w-[80px] bg-red-500 font-bold px-3 py-2 rounded-md text-white text-sm hover:bg-red-700 transition-all"
          onClick={deleteUser}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
