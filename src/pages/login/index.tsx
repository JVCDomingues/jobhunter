/* eslint-disable react/no-unescaped-entities */
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';

export default function Login() {
  return (
    <>
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-screen h-screen bg-gray-300 flex items-center justify-center">
        <form className="bg-white p-5 rounded-md w-96">
          <h1 className="text-lg mb-5">Welcome to jobHunter!</h1>
          <div className="form-control mb-3">
            <input
              type="text"
              placeholder="Username"
              className="w-full px-3 py-2 rounded-md border-2 border-gray-500"
            />
          </div>
          <div className="form-control mb-5">
            <input
              type="password"
              placeholder="Password"
              className="w-full px-3 py-2 rounded-md border-2 border-gray-500"
            />
          </div>
          <button className="rounded-md bg-slate-900 font-bold text-white px-5 py-3 w-full">
            Sign In
          </button>

          <div className="flex items-center gap-2 mt-5">
            <p>Don't have an account?</p>
            <Link className="underline" href="/register">
              Register now
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
