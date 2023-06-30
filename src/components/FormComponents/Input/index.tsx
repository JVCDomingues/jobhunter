import React, { InputHTMLAttributes } from 'react';

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  fullWidth?: boolean;
}

export default function Input({ fullWidth, ...rest }: CustomInputProps) {
  return (
    <input
      {...rest}
      className={`py-5 px-4 mb-3 rounded-xl border border-zinc-200 bg-white text-lg placeholder:text-zinc-500 ${
        fullWidth && 'w-full'
      }`}
    />
  );
}
