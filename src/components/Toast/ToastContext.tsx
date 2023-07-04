import { X } from 'lucide-react';
import { createContext, useContext, useState } from 'react';

interface ContextProps {
  openToast: (component: React.ReactNode, timeout?: number) => void;
  closeToast: (id: string) => void;
}

interface ToastProviderProps {
  children: React.ReactNode;
}

interface Toast {
  fakeStringId: string;
  component: React.ReactNode;
}

export const ToastContext = createContext({} as ContextProps);

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const openToast = (component: React.ReactNode, timeout = 5000) => {
    const fakeStringId = Math.random().toString(36).slice(2);
    setToasts(toasts => [...toasts, { fakeStringId, component }]);

    setTimeout(() => closeToast(fakeStringId), timeout);
  };

  const closeToast = (id: string) => {
    setToasts(toasts => toasts.filter(toast => toast.fakeStringId !== id));
  };

  return (
    <ToastContext.Provider value={{ openToast, closeToast }}>
      <div className="space-y-2 absolute top-4 right-4">
        {toasts.map(({ fakeStringId, component }) => (
          <div className="relative w-[300px]" key={fakeStringId}>
            <button
              className="absolute top-2 right-2 p-1 rounded-lg bg-gray-200/20 text-gray-800/60"
              onClick={() => closeToast(fakeStringId)}
            >
              <X size={16} />
            </button>
            {component}
          </div>
        ))}
      </div>
      {children}
    </ToastContext.Provider>
  );
}

export const useToast = () => {
  const context = useContext(ToastContext);
  return context;
};
