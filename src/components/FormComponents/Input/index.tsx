import React, { InputHTMLAttributes } from 'react';

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  fullWidth?: boolean;
}

export default function Input({ fullWidth, ...rest }: CustomInputProps) {
  return (
    <input
      {...rest}
      className={`py-3 px-4 mb-3 rounded-xl border border-zinc-200 bg-zinc-50 text-md placeholder:text-zinc-500 ${
        fullWidth && 'w-full'
      }`}
    />
  );
}
