import { AlertCircle } from 'lucide-react';

interface ErrorToastProps {
  message: string;
}

export default function ErrorToast({ message }: ErrorToastProps) {
  return (
    <div className="flex items-center gap-2 bg-white border border-zinc-300 p-4 rounded-lg shadow-lg">
      <AlertCircle size={30} className="text-red-500" />
      <h1 className="font-bold">{message}</h1>
    </div>
  );
}
