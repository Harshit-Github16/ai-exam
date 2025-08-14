// components/Header.jsx
import {  signOut } from "next-auth/react";

export default function Header() {


  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-lg font-bold">Welcome, {'User'} 👋</h1>
      <div className="flex items-center gap-4">
        {/* {session?.user?.image && (
          <img 
            src={session.user.image} 
            alt="Profile picture" 
            className="w-8 h-8 rounded-full border"
          />
        )} */}
        <button
          onClick={() => signOut()}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
