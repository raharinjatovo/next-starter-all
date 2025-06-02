"use client"
import { signIn, signOut } from "next-auth/react";
import { useRouter } from 'next/navigation'; // Import for navigation

export const LoginButton = () => {
  const router = useRouter(); // Initialize router

  return (
    <div>
      <div className="flex flex-col items-center space-y-4 mt-10">
        <button
          onClick={() => signIn()} // Calls generic sign-in
          className="flex items-center justify-center w-1/5 space-x-3 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-500 shadow-md transition-all duration-300"
        >
          <span>Sign In</span>
        </button>
        <button
          onClick={() => router.push('/register')} // Navigates to register page
          className="flex items-center justify-center w-1/5 space-x-3 px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-500 shadow-md transition-all duration-300"
        >
          <span>Register</span>
        </button>
      </div>
    </div>
  );
};

export const LogoutButton = () => {
  return (
    <div>
      <button
        className="inline-block rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
        onClick={() => signOut()}
      >
        Logout
      </button>
    </div>
  );
};
