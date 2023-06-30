/* eslint-disable react/no-unescaped-entities */
import Snackbar from '@/components/Snackbar';
import { SnackbarProps } from '@/components/Snackbar/types';
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
  const router = useRouter();

  const handleInputChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

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
      <div className="w-screen h-screen bg-gray-300 flex items-center justify-center">
        <div className="bg-white p-5 rounded-md w-96">
          <h1 className="text-lg mb-5">Register now</h1>
          <div className="form-control mb-3">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              className="w-full px-3 py-2 rounded-md border-2 border-gray-500"
              onChange={event =>
                handleInputChange(event.target.name, event.target.value)
              }
            />
          </div>
          <div className="form-control mb-3">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              className="w-full px-3 py-2 rounded-md border-2 border-gray-500"
              onChange={event =>
                handleInputChange(event.target.name, event.target.value)
              }
            />
          </div>
          <div className="form-control mb-5">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              className="w-full px-3 py-2 rounded-md border-2 border-gray-500"
              onChange={event =>
                handleInputChange(event.target.name, event.target.value)
              }
            />
          </div>
          <button
            className="rounded-md bg-slate-900 font-bold text-white px-5 py-3 w-full disabled:bg-gray-400"
            disabled={!formData.password || formData.password.length < 3}
            onClick={onSubmit}
          >
            Register
          </button>

          <div className="flex items-center gap-2 mt-5">
            <p>Already have an account?</p>
            <Link className="underline" href="/login">
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
