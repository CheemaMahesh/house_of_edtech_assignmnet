"use client";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function HomePage() {
  const router = useRouter();
  const logout = () => {
    localStorage.removeItem('hedtech');
  }
  useEffect(() => {
    const token = localStorage.getItem('hedtech');
    if (!token) {
      router.push('/auth/signin');
    }
  }, []);
  return (
<>
  <button onClick={logout}>Logout</button>
</>
  );
}
