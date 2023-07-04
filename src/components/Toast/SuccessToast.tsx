import { CheckCircle } from 'lucide-react';

interface ErrorToastProps {
  message: string;
}

export default function SuccessToast({ message }: ErrorToastProps) {
  return (
    <div className="flex items-center gap-2 bg-white border border-zinc-300 p-4 rounded-lg shadow-lg">
      <CheckCircle size={30} className="text-green-500" />
      <div>
        <h1 className="font-bold">{message}</h1>
      </div>
    </div>
  );
}
