/* eslint-disable react/no-unescaped-entities */
import Input from '@/components/FormComponents/Input';
import Snackbar from '@/components/Snackbar';
import { SnackbarProps } from '@/components/Snackbar/types';
import Spinner from '@/components/Spinner';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

export default function Login() {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
  });
  const [snackbarData, setSnackbarData] = useState<SnackbarProps>({
    isOpen: false,
    message: '',
    type: 'error',
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleInputChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSubmit = async (event: React.FormEvent) => {
    setIsLoading(true);
    const response = await fetch('api/users/new', {
      method: 'POST',
      body: JSON.stringify(formData),
    });

    const hasError = response.status === 400;

    if (hasError) {
      setSnackbarData({
        isOpen: true,
        message: 'User already exists!',
        type: 'error',
      });
      return;
    }

    setIsLoading(false);

    handleSuccessRegistration();
  };

  const handleSuccessRegistration = () => {
    setFormData({
      name: '',
      username: '',
      password: '',
    });
    setSnackbarData({
      isOpen: true,
      message: 'User created successfully!',
      type: 'success',
    });
    router.push('/');
  };

  return (
    <>
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-screen h-screen bg-zinc-300 flex flex-col gap-5 items-center justify-center">
        <div className="bg-white rounded-md w-[600px] shadow-md">
          <div className="border-b border-zinc-300 p-7 bg-zinc-100 rounded-t-lg">
            <h1 className="text-xl ">Register now</h1>
          </div>
          <div className="p-7 flex flex-col bg-white">
            <Input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              fullWidth
              autoFocus
              onChange={event =>
                handleInputChange(event.target.name, event.target.value)
              }
            />

            <Input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              fullWidth
              onChange={event =>
                handleInputChange(event.target.name, event.target.value)
              }
            />
            <Input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              fullWidth
              onChange={event =>
                handleInputChange(event.target.name, event.target.value)
              }
            />
          </div>

          <div className="p-7 border-t border-t-zinc-300 border-b border-b-zinc-300">
            <button
              className="flex items-center justify-center rounded-md bg-blue-800 font-bold text-white px-5 py-4 w-full disabled:bg-gray-400 hover:bg-blue-900 transition-all disabled:cursor-not-allowed"
              disabled={!formData.password || formData.password.length < 3}
              onClick={onSubmit}
            >
              {isLoading ? <Spinner /> : 'Register'}
            </button>
          </div>

          <div className="flex items-center gap-2 p-7 bg-zinc-100 rounded-b-lg">
            <p>Already have an account?</p>
            <Link
              className="hover:text-blue-900 text-blue-700 font-semibold transition-all"
              href="/login"
            >
              Sign in now
            </Link>
          </div>
        </div>
        <Snackbar
          isOpen={snackbarData.isOpen}
          message={snackbarData.message}
          type={snackbarData.type}
        />
      </div>
    </>
  );
}
