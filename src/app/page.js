'use client'

import { useState } from 'react'
import MainPage from '@/components/MainPage'

export default function Home() {
  const [hasStarted, setHasStarted] = useState(false)

  return (
    <main className="relative w-full h-screen overflow-hidden">
      {!hasStarted && <MainPage onStart={() => setHasStarted(true)} />}
    </main>
  )
}
