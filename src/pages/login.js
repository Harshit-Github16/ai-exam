import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';

export default function EduMitraLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  async function handleLogin(e) {
    e.preventDefault();
    const res = await signIn('credentials', {
      redirect: false,
      identifier: username,
      password
    });

    if (res?.ok) {
      setError("");
      setIsLoggedIn(true);
    } else {
      setError("Invalid credentials");
    }
  }

  if (isLoggedIn) return router.push('/dashboard');

  return (
    <div
      className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center"
      style={{ background: 'var(--color-muted)', fontFamily: "'Poppins', sans-serif" }}
    >
      <motion.div
        className="flex rounded-lg shadow-lg w-full max-w-4xl overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ backgroundColor: "#f7f5ff" }}
      >
        {/* Left side form */}
        <div className="w-1/2 p-10 flex flex-col justify-center bg-white">
          <h1 className="text-3xl font-bold mb-1" style={{ color: 'var(--color-dark)' }}>PrepVerse</h1>
          <p className="mb-6 font-medium" style={{ color: 'var(--color-dark)' }}>
            Welcome! Please login to continue.
          </p>

          <form onSubmit={handleLogin} className="space-y-6">
            <motion.input
              type="text"
              placeholder="Username"
              className="w-full border rounded-md p-3 focus:outline-none"
              style={{ borderColor: 'var(--color-secondary)', color: 'var(--color-dark)' }}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              whileFocus={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              autoComplete="username"
            />
            <motion.input
              type="password"
              placeholder="Password"
              className="w-full border rounded-md p-3 focus:outline-none"
              style={{ borderColor: 'var(--color-secondary)', color: 'var(--color-dark)' }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              whileFocus={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              autoComplete="current-password"
            />
            {error && (
              <motion.div
                className="text-red-600 font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {error}
              </motion.div>
            )}

            <motion.button
              type="submit"
              className="w-full text-white font-semibold py-3 rounded-md shadow-md"
              style={{ background: 'var(--color-primary)' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Login
            </motion.button>

            {/* Register Option */}
            <motion.button
              type="button"
              className="w-full font-semibold py-3 rounded-md shadow-md border"
              style={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/register')}
            >
              Register
            </motion.button>
          </form>
        </div>

        {/* Right side animation */}
        <div
          className="w-1/2 flex items-center justify-center relative"
          style={{ overflow: "hidden", background: 'var(--color-secondary)' }}
        >
          <motion.div
            className="w-48 h-48 rounded-xl bg-indigo-400"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 10, -10, 0],
              borderRadius: ["20%", "40%", "20%"],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}
