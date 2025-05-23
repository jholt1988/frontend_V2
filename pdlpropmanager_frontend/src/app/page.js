'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import './globals.css'; // Ensure you have your global styles imported

export default function LandingPage() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="bg-secondary p-10 rounded-xl shadow-xl max-w-xl w-full text-center space-y-6"
      >
  
    
      <div className="bg-[var(--card)] rounded-2xl shadow-lg max-w-md w-full p-8 text-center">
        <div className="flex justify-center mb-4">
          <Image src="/logo.svg" alt="PDL Rentals" width={64} height={64} />
        </div>

        <h1 className="text-3xl font-bold mb-2">Welcome to PDL Rentals</h1>
        <p className="text-gray-400 mb-6">
          A smarter way to manage properties, tenants, and maintenance.
        </p>

        <div className="flex justify-center gap-4 mb-5">
          <Link
            href="/login"
            className="bg-[var(--accent)] text-white font-semibold px-5 py-2 rounded-lg hover:bg-[var(--accent-hover)] transition"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="border border-[var(--accent)] text-[var(--accent)] font-semibold px-5 py-2 rounded-lg hover:bg-[var(--accent)] hover:text-white transition"
          >
            Register
          </Link>
        </div>

        <p className="text-sm text-gray-500">
          Staff or Admin? <Link href="/login" className="underline hover:text-[var(--accent-hover)]">Log in here</Link>.
        </p>
      </div>
  

      </motion.div>
    </>
  );
}
