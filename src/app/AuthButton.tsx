"use client"
import { signIn, signOut } from "next-auth/react";

export const LoginButton = () => {
  return (
    <div>
      <div className="flex flex-col items-center space-y-4  mt-10">
        <button
          onClick={() => signIn("github")}
          className="flex items-center w-1/5 space-x-3 px-6 py-3 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-700 shadow-md transition-all duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path d="M12 .297C5.4.297 0 5.697 0 12.297c0 5.3 3.438 9.8 8.207 11.387.6.112.793-.262.793-.585v-2.255c-3.338.725-4.037-1.587-4.037-1.587-.548-1.4-1.338-1.787-1.338-1.787-1.087-.748.088-.733.088-.733 1.2.087 1.837 1.213 1.837 1.213 1.075 1.85 2.825 1.313 3.512 1.012.112-.788.425-1.312.762-1.613-2.662-.3-5.462-1.338-5.462-5.975 0-1.312.462-2.387 1.2-3.238-.113-.3-.525-1.512.113-3.162 0 0 1-.3 3.3 1.213.95-.263 1.975-.362 3-.362 1.025 0 2.05.1 3 .362 2.3-1.512 3.3-1.213 3.3-1.213.637 1.65.225 2.862.113 3.162.75.85 1.2 1.925 1.2 3.238 0 4.65-2.8 5.675-5.462 5.975.438.375.825 1.125.825 2.262v3.338c0 .325.187.7.8.575C20.563 22.1 24 17.6 24 12.297c0-6.6-5.4-12-12-12" />
          </svg>
          <span>Sign in with GitHub</span>
        </button>

        <button
          onClick={() => signIn("google")}
          className="flex items-center w-1/5 space-x-3 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-500 shadow-md transition-all duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            className="w-6 h-6"
          >
            <path
              fill="#FFC107"
              d="M43.611 20.083h-19.54v7.851h11.262c-1.003 4.91-5.249 7.851-11.262 7.851a12.935 12.935 0 0 1 0-25.87c3.391 0 6.474 1.27 8.848 3.348l5.928-5.927C35.041 3.939 29.477 1.5 24.07 1.5 11.324 1.5 1.5 11.324 1.5 24.07S11.324 46.5 24.07 46.5C36.325 46.5 46.5 36.325 46.5 24.07a21.097 21.097 0 0 0-.68-4.987h-2.209Z"
            />
            <path
              fill="#FF3D00"
              d="M7.608 14.56a20.646 20.646 0 0 1 16.462-8.06c4.314 0 8.26 1.401 11.48 3.795L30.52 15.828a12.788 12.788 0 0 0-7.488-2.325c-5.034 0-9.314 3.3-10.872 7.846l-4.552-3.88Z"
            />
            <path
              fill="#4CAF50"
              d="M24.07 46.5c5.703 0 10.612-2.046 14.434-5.375l-6.34-5.548a12.898 12.898 0 0 1-20.292-7.258l-4.51 3.78C11.598 42.068 17.457 46.5 24.07 46.5Z"
            />
            <path
              fill="#1976D2"
              d="M43.611 20.083h-19.54v7.851h11.262c-.9 4.91-4.395 7.851-11.262 7.851a12.935 12.935 0 0 1-8.91-3.435l-4.505 3.846A20.564 20.564 0 0 0 24.07 46.5c12.746 0 22.57-9.824 22.57-22.57 0-.91-.055-1.82-.174-2.847Z"
            />
          </svg>
          <span>Sign in with Google</span>
        </button>
        {/* <button
        onClick={() => signIn("facebook")}
        className=" flex items-center w-1/5	 space-x-3 px-6 py-3 bg-blue-700 text-white font-medium rounded-lg hover:bg-blue-600 shadow-md transition-all duration-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path d="M22.675 0h-21.35C.595 0 0 .6 0 1.326v21.348C0 23.4.595 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.41c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.463.099 2.794.143v3.24h-1.917c-1.504 0-1.796.715-1.796 1.763v2.31h3.588l-.467 3.623h-3.121V24h6.116c.73 0 1.325-.6 1.325-1.326V1.326C24 .6 23.405 0 22.675 0z" />
        </svg>
        <span>Sign in with Facebook</span>
        </button> */}
      <button
        onClick={() => signIn("linkedin")}
        className="flex items-center w-1/5 space-x-3 px-6 py-3 bg-[#0077B5] text-white font-medium rounded-lg hover:bg-[#005580] shadow-md transition-all duration-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path d="M20.447 20.452h-3.554V15.06c0-1.287-.026-2.947-1.797-2.947-1.797 0-2.073 1.4-2.073 2.851v5.489H9.47V9h3.414v1.561h.049c.476-.9 1.637-1.846 3.37-1.846 3.607 0 4.27 2.373 4.27 5.459v6.279zM5.337 7.433a2.063 2.063 0 01-2.063-2.063 2.064 2.064 0 012.063-2.063 2.064 2.064 0 012.063 2.063 2.063 2.063 0 01-2.063 2.063zM6.772 20.452H3.9V9h2.872v11.452zM22.225 0H1.771C.79 0 0 .783 0 1.748v20.505C0 23.217.79 24 1.771 24h20.454C23.21 24 24 23.217 24 22.253V1.748C24 .783 23.21 0 22.225 0z" />
        </svg>
        <span>Sign in with LinkedIn</span>
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
