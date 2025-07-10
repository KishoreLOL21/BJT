'use client';

import { useState } from 'react';
import { FaApple, FaGoogle } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';
import { FaFlagUsa } from 'react-icons/fa';

export default function SignUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-black/80 rounded-2xl shadow-xl p-8 w-full max-w-md backdrop-blur-md">
        <div className="flex justify-between mb-6">
          <button className="text-white bg-white/10 px-4 py-2 rounded-full font-semibold">Sign up</button>
          <button className="text-gray-400 px-4 py-2">Sign in</button>
        </div>
        <h2 className="text-white text-2xl font-semibold mb-6">Create an account</h2>

        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-1/2 px-4 py-3 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-1/2 px-4 py-3 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none"
          />
        </div>

        <div className="flex items-center bg-gray-800 rounded-md px-4 py-3 mb-4">
          <FiMail className="text-gray-400 mr-3" />
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-transparent outline-none text-white w-full"
          />
        </div>

        <div className="flex items-center bg-gray-800 rounded-md px-4 py-3 mb-6">
          <FaFlagUsa className="text-gray-400 mr-3" />
          <span className="text-white mr-2">+1</span>
          <input
            type="tel"
            placeholder="(775) 351-6501"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="bg-transparent outline-none text-white w-full"
          />
        </div>

        <button className="w-full bg-white text-black font-semibold py-3 rounded-md hover:bg-gray-200 transition mb-4">
          Create an account
        </button>

        <div className="text-center text-gray-500 text-sm mb-4">OR SIGN IN WITH</div>

        <div className="flex gap-4 mb-4">
          <button className="flex-1 flex items-center justify-center gap-2 border border-gray-600 text-white py-3 rounded-md hover:bg-gray-700 transition">
            <FaGoogle /> Google
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 border border-gray-600 text-white py-3 rounded-md hover:bg-gray-700 transition">
            <FaApple /> Apple
          </button>
        </div>

        <p className="text-xs text-gray-500 text-center">
          By creating an account, you agree to our <span className="underline">Terms & Service</span>
        </p>
      </div>
    </div>
  );
}
