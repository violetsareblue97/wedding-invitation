'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

export default function StartPage({ onStart }) {
  const [isStarting, setIsStarting] = useState(false)

  const handleStart = () => {
    setIsStarting(true)
    setTimeout(() => {
      onStart()
    }, 1600)
  }

  return (
    <AnimatePresence>
      {!isStarting ? (
        <motion.div
          key="start-page"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="container-9-16"
        >
          {/* Background */}
          <div className="absolute inset-0">
            <Image
              src="/assets/bg.svg"
              alt="Background"
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>

          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {/* Nama Mempelai */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-center mb-32"
            >
              <h1 
                className="font-script text-white"
                style={{ 
                  fontSize: 'clamp(3rem, 12vw, 5rem)',
                  textShadow: '2px 2px 8px rgba(0,0,0,0.3)',
                  lineHeight: '1.2',
                  letterSpacing: '0.05em'
                }}
              >
                Kukuh
                <br />
                <span style={{ fontSize: '0.8em' }}>&</span>
                <br />
                Sandya
              </h1>
            </motion.div>

            {/* Start Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: isStarting ? 0 : 1, 
                scale: isStarting ? 0.8 : 1 
              }}
              transition={{ duration: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStart}
              className="relative"
              style={{ width: 'clamp(250px, 60vw, 350px)' }}
            >
              <Image
                src="/icons/start.svg"
                alt="Start"
                width={350}
                height={120}
                style={{ width: '100%', height: 'auto' }}
              />
            </motion.button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}