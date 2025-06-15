'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to welcome page for new users
    router.replace('/welcome');
  }, [router]);

  // This page just redirects, so we can show a simple loader
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 to-green-700 flex items-center justify-center">
      <div className="text-white text-xl">Omdirigerer...</div>
    </div>
  );
}