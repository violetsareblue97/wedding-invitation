'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import {Clock, CreditCard, Copy} from 'lucide-react'

export function ModalContainer({ isOpen, onClose, title, children }) {
  if (!isOpen) return null
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
        className="relative bg-[#FFF5F7] rounded-[2rem] shadow-[6px_6px_0px_0px_#DBA5B7] border-4 border-[#DBA5B7] w-full max-w-[340px] max-h-[85vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex-none bg-[#FFF5F7] border-b-4 border-[#DBA5B7] px-6 py-4 flex justify-between items-center z-10">
          <h2 className="text-xl font-britney font-bold text-[#8D6B75] tracking-wider uppercase">{title}</h2>
          <button onClick={onClose} className="w-10 h-10 flex items-center justify-center bg-[#DBA5B7] text-white rounded-full font-quicksand text-xl hover:bg-[#C88A9F] transition-colors">X</button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-6 scrollbar-custom">
          {children}
        </div>
      </motion.div>
    </motion.div>
  )
}

export function LegendModal() {
  const menus = [
    { label: "Music", desc: "Play/Pause musik", icon: "music_on.svg" },
    { label: "RSVP", desc: "Konfirmasi kehadiran & ucapan", icon: "rsvp.svg" },
    { label: "Jadwal", desc: "Tanggal & Lokasi acara", icon: "date.svg" },
    { label: "Kisah", desc: "Kisah cinta kami", icon: "kisah.svg" },
    { label: "Hadiah", desc: "Amplop digital", icon: "hadiah.svg" },
    { label: "Gallery", desc: "Foto pernikahan", icon: "galeri.svg" },
  ]

return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        {menus.map((item, i) => (
          <div key={i} className="p-4 bg-white border-2 border-[#EBCAD5] rounded-3xl flex items-center gap-4 hover:border-[#DBA5B7] transition-colors shadow-sm">
            <div className="w-12 h-12 flex items-center justify-center p-2 relative">
              <Image 
                src={`/Assets/${item.icon}`} 
                alt={item.label}
                fill
                className="object-contain"
              />
            </div>
            <div>
              <p className="font-britney text-[#8D6B75] text-lg">{item.label}</p>
              <p className="font-quicksand text-xs text-[#8D6B75]/70">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/**DATE & OCATION */

function CountdownTimer({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState('')

  useEffect(() => {
    const target = new Date(targetDate).getTime()
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const diff = target - now

      if (diff <= 0) {
        clearInterval(timer)
        setTimeLeft("Sudah Berlangsung")
      } else {
        const d = Math.floor(diff / (1000 * 60 * 60 * 24))
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
        setTimeLeft(`${d}d ${h}h ${m}m`)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  return <p className="font-quicksand font-bold text-[#DBA5B7] text-lg">{timeLeft}</p>
}

export function DateTimeModal() {
  return (
    <div className="space-y-4 text-center">
      {/* Pemberkatan */}
      <div className="p-6 bg-white border-2 border-[#EBCAD5] rounded-3xl shadow-sm text-center">
      <h4 className="font-britney text-[#8D6B75] mb-4 text-3xl tracking-widest">
        Pemberkatan</h4>
      <div className="flex items-center justify-center gap-2 mb-4 bg-[#FFF5F7] py-2 px-4 rounded-xl">
        <Clock size={20} className="text-[#DBA5B7]" />
        <CountdownTimer targetDate="2026-06-10T10:00:00" />
      </div>
      <div className="text-sm space-y-1 font-quicksand font-semibold text-[#8D6B75]/80 mb-6">
        <p>10 Juni 2026 | 10:00 WIB</p>
        <p>GMII 'Anugerah' Bekasi</p>
      </div>
      <a
        href="https://maps.app.goo.gl/X71H2uhJoFeNnRW9A" 
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center w-full py-3 bg-[#DBA5B7] text-white rounded-2xl font-quicksand font-bold text-sm hover:bg-[#C88A9F] transition-all transform hover:scale-[1.02] shadow-md"
      >
        LIHAT MAPS
      </a>
      </div>

      {/* Resepsi */}
      <div className="p-6 bg-white border-2 border-[#EBCAD5] rounded-3xl shadow-sm text-center">
      <h4 className="font-britney text-[#8D6B75] mb-4 text-3xl tracking-widest">
        Resepsi</h4>
      <div className="flex items-center justify-center gap-2 mb-4 bg-[#FFF5F7] py-2 px-4 rounded-xl">
        <Clock size={20} className="text-[#DBA5B7]" />
        <CountdownTimer targetDate="2026-06-12T13:00:00" />
      </div>
      <div className="text-sm space-y-1 font-quicksand font-semibold text-[#8D6B75]/80 mb-6">
        <p>12 Juni 2026 | 13:00 WIB</p>
        <p>Gedung ......</p>
      </div>
      <a
        href="https://maps.google.com" 
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center w-full py-3 bg-[#DBA5B7] text-white rounded-2xl font-quicksand font-bold text-sm hover:bg-[#C88A9F] transition-all transform hover:scale-[1.02] shadow-md"
      >
        LIHAT MAPS
      </a>
      </div>
    </div>
  )
}

export function LoveStoryModal() {
  return (
    <div className="space-y-4">
      <div className="text-center p-4 bg-white border-2 border-[#EBCAD5] rounded-3xl shadow-sm">
        <p className="font-quicksand text-[#8D6B75] text-sm">Cerita perjalanan cinta kami...</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="aspect-square bg-white border-2 border-[#EBCAD5] rounded-3xl flex items-center justify-center shadow-sm hover:border-[#DBA5B7] transition-all cursor-pointer">
            <span className="text-[#DBA5B7] font-britney">Foto {i}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
export function GiftModal({ onCopy }) {
  const accounts = [
    { name: "Yesyurun", no: "08653525141" }, 
    { name: "Sandya", no: "1234567890" }
  ]

  return (
    <div className="space-y-6">
      {/* Pesan Pembuka */}
      <div className="text-center px-2">
        <p className="font-quicksand text-[#8D6B75] leading-relaxed">
          Terima kasih banyak atas perhatian dan kasih sayang Anda. 
          Kehadiran serta doa restu Anda adalah anugerah terindah bagi kami.
        </p>
        <p className="font-quicksand text-sm text-[#8D6B75]/70 mt-2 italic">
          Jika Anda ingin memberikan tanda kasih, dapat disalurkan melalui:
        </p>
      </div>

      {/* List Rekening */}
      <div className="space-y-4">
        {accounts.map((acc, i) => (
          <div key={i} className="p-6 bg-white border-2 border-[#EBCAD5] rounded-3xl shadow-sm text-center">
            <div className="flex justify-center mb-3 text-[#DBA5B7]">
              <CreditCard size={28} />
            </div>
            <p className="font-britney text-[#8D6B75] text-xl mb-1">{acc.name}</p>
            
            <div className="bg-[#FFF5F7] py-3 px-4 rounded-2xl mb-4 border border-[#EBCAD5]">
              <p className="font-quicksand font-bold text-[#8D6B75] tracking-widest">{acc.no}</p>
            </div>

            <button 
              onClick={() => onCopy(acc.no)} 
              className="inline-flex items-center justify-center gap-2 w-full py-3 bg-[#DBA5B7] text-white rounded-2xl font-quicksand font-bold text-sm hover:bg-[#C88A9F] transition-all transform hover:scale-[1.02] shadow-md"
            >
              <Copy size={16} />
              SALIN REKENING
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}


export function GalleryModal() {
  return (
    <div className="grid grid-cols-2 gap-2">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <div key={i} className="aspect-square bg-white border-2 border-[#EBCAD5] rounded-xl flex cursor-pointer hover:bg-[#FFF5F7]">
        </div>
      ))}
    </div>
  )
}