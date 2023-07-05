import ErrorToast from '@/components/Toast/ErrorToast';
import SuccessToast from '@/components/Toast/SuccessToast';
import { useToast } from '@/components/Toast/ToastContext';
import { AlertCircleIcon } from 'lucide-react';

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
  const { openToast } = useToast();

  const deleteUser = async () => {
    const response = await fetch(`api/users/${userId}`, {
      method: 'DELETE',
    });
    const data = await response.json();

    if (response.status === 200) {
      await revalidate();
      handleModalClose();
      triggerSuccessToast('User deleted successfully');
    }

    if (response.status !== 200) {
      triggerErrorToast(data.error);
    }
  };

  const triggerErrorToast = (message: string) => {
    openToast(<ErrorToast message={message} />);
  };

  const triggerSuccessToast = (message: string) => {
    openToast(<SuccessToast message={message} />);
  };

  return (
    <div>
      <div className="flex items-center gap-4 p-5">
        <AlertCircleIcon size={28} className="text-red-600" />
        <span className="font-medium">Delete user</span>
      </div>
      <div className="px-6">
        <p className="text-zinc-500">
          Are you sure you want to delete this user? This action cannot be
          undone.
        </p>
      </div>
      <div className="flex items-center justify-end gap-3 mt-2 p-5">
        <button
          className="border w-[80px] border-zinc-200 rounded-md px-3 py-2 text-sm font-bold hover:bg-zinc-100 transition-all"
          onClick={handleModalClose}
          data-testid="cancel-button"
        >
          Cancel
        </button>
        <button
          className="w-[80px] bg-red-500 font-bold px-3 py-2 rounded-md text-white text-sm hover:bg-red-700 transition-all"
          onClick={deleteUser}
          data-testid="delete-button"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
