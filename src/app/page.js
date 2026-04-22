'use client'

import { useState, useEffect } from 'react'
import MainPage from '@/components/MainPage'

export default function Home() {
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    const setHeight = () => {
      // Mengatur variabel custom --vh untuk akurasi tinggi layar mobile
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    };
    
    setHeight();
    window.addEventListener('resize', setHeight);
    window.addEventListener('orientationchange', setHeight);
    
    return () => {
      window.removeEventListener('resize', setHeight);
      window.removeEventListener('orientationchange', setHeight);
    }
  }, []);

  return (
    // h-[100dvh] adalah kunci utama untuk Full Screen di Mobile
    <main 
      className="h-[100dvh] w-full relative overflow-hidden" 
      style={{ height: 'calc(var(--vh, 1vh) * 100)' }}
    >
      <MainPage onStart={() => setHasStarted(true)} />
    </main>
  )
}