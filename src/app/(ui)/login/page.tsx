'use client';

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { BounceLoader } from 'react-spinners';
import { toast } from 'react-toastify';

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const validateInputs = () => {
    if (user.email === '' || user.password === '') {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  };

  const handleSubmit = () => {
    setLoading(true);

    axios
      .post('/api/auth/login', user)
      .then((res) => {
        if (res.status === 200) {
          router.push('/');
          toast.success(res.data.metadata.message);
        }
      })
      .catch((err) => {
        toast.error(err.response.data.errorMessage);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    validateInputs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center p-5">
      <h1 className="my-8 text-2xl">Login</h1>
      <label htmlFor="email" className="flex flex-col items-center">
        Email
        <input
          id="email"
          type="text"
          placeholder="Email"
          className="border-grey-300 my-4 w-64 rounded-full border p-2 text-black focus:outline-none focus:ring-2 focus:ring-white"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
      </label>
      <label htmlFor="password" className="flex flex-col items-center">
        Password
        <input
          id="password"
          type="password"
          placeholder="Password"
          className="border-grey-300 my-4 w-64 rounded-full border p-2 text-black focus:outline-none focus:ring-2 focus:ring-white"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
      </label>
      <button
        type="submit"
        className="mt-4 flex w-64 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-red-400 p-2 py-2 hover:bg-red-300"
        onClick={handleSubmit}
        disabled={buttonDisabled}
      >
        {loading ? (
          <BounceLoader color="#f2f2f2" className="" size={20} />
        ) : (
          'Login'
        )}
      </button>
      <Link className="my-2 text-sm hover:text-blue-400" href="/register">
        {`Don't`} have an account? Register
      </Link>
    </div>
  );
}
