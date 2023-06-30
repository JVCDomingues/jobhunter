import React, { useEffect, useState } from 'react';
import { SnackbarProps } from './types';

export default function Snackbar({
  timeout = 5000,
  isOpen,
  message,
  type,
}: SnackbarProps) {
  const [openSnackbar, setOpenSnackbar] = useState(isOpen);

  const typeDictionary = {
    error: 'red',
    warning: 'yellow',
    success: 'green',
  };

  useEffect(() => {
    setTimeout(() => {
      setOpenSnackbar(false);
    }, timeout);
  }, [timeout]);

  return (
    <>
      {openSnackbar && (
        <div
          className={`bg-${typeDictionary[type]}-100 border border-${typeDictionary[type]}-400 text-${typeDictionary[type]}-700 px-4 py-3 rounded relative`}
        >
          <span className="block sm:inline">{message}</span>
        </div>
      )}
    </>
  );
}
