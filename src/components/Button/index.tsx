import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean;
  text: string;
}

export default function Button({ fullWidth, text, ...rest }: ButtonProps) {
  return <button {...rest}>{text}</button>;
}
