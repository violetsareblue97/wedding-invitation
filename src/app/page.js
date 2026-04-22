'use client'

import { useState, useEffect } from 'react'
import MainPage from '@/components/MainPage'

export default function Home() {
  const [hasStarted, setHasStarted] = useState(false)

  // PINDAHKAN KE SINI (Di dalam body fungsi Home)
  useEffect(() => {
    const setHeight = () => {
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    };
    setHeight();
    window.addEventListener('resize', setHeight);
    return () => window.removeEventListener('resize', setHeight);
  }, []);

  return (
    <main className="h-[100dvh] w-full relative overflow-hidden" style={{ height: 'calc(var(--vh, 1vh) * 100)' }}>
      {!hasStarted && <MainPage onStart={() => setHasStarted(true)} />}
    </main>
  )
}