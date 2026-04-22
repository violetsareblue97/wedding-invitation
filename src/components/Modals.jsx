'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Clock, CreditCard, Copy, X, Heart } from 'lucide-react'

// --- SHARED DESIGN SYSTEM ---
const paperStyle = {
  background: `
    radial-gradient(circle at top right, rgba(237, 230, 231, 0.4) 0%, transparent 50%),
    radial-gradient(circle at bottom left, rgba(245, 245, 240, 0.3) 0%, transparent 50%),
    linear-gradient(135deg, #FFFBF5 0%, #FFF9F0 25%, #F8F6F2 50%, #FFF9F0 75%, #FFFBF5 100%)
  `,
  boxShadow: `
    0 4px 6px rgba(135, 111, 76, 0.1),
    0 1px 3px rgba(135, 111, 76, 0.08),
    inset 0 0 0 1px rgba(255, 255, 255, 0.5)
  `
};

const PaperTexture = () => (
  <div 
    className="absolute inset-0 opacity-[0.03] pointer-events-none"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
    }}
  />
);

const DoodleLine = () => (
  <div className="mt-4 flex items-center gap-2 opacity-20">
    <div className="flex-1 h-[1px]" style={{ background: 'repeating-linear-gradient(90deg, #876F4C 0px, #876F4C 5px, transparent 5px, transparent 10px)' }}></div>
    <Heart size={10} className="text-[#B55B37]" fill="currentColor" />
    <div className="flex-1 h-[1px]" style={{ background: 'repeating-linear-gradient(90deg, #876F4C 0px, #876F4C 5px, transparent 5px, transparent 10px)' }}></div>
  </div>
);

// --- MODAL CONTAINER ---
export function ModalContainer({ isOpen, onClose, title, children }) {
  if (!isOpen) return null
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }} 
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        className="relative w-full max-w-[380px] max-h-[85vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'linear-gradient(135deg, #EDE6E7 0%, #FFF9F0 50%, #F5F5F0 100%)',
          borderRadius: '2rem',
          boxShadow: '0 20px 60px rgba(135, 111, 76, 0.3), 0 0 0 3px rgba(255, 255, 255, 0.6)',
        }}
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ borderRadius: '2rem' }}>
          <div className="absolute -top-2 -right-2 w-16 h-16 opacity-40">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle cx="50" cy="50" r="15" fill="#B55B37" opacity="0.6"/>
              <circle cx="35" cy="40" r="12" fill="#D4B69B" opacity="0.5"/>
              <circle cx="65" cy="40" r="12" fill="#876F4C" opacity="0.5"/>
            </svg>
          </div>
          <div className="absolute top-0 left-0 w-full h-1" 
               style={{ background: 'linear-gradient(90deg, #88A516, #876F4C, #B55B37)' }}></div>
        </div>

        <div className="flex-none relative px-6 py-5 flex justify-between items-center z-10"
             style={{
               background: 'linear-gradient(135deg, rgba(212, 182, 155, 0.2), rgba(136, 165, 22, 0.1))',
               borderBottom: '2px dashed rgba(135, 111, 76, 0.2)',
             }}>
          <h2 className="text-xl font-fredoka font-bold text-[#525710] tracking-wide drop-shadow-sm">
            {title}
          </h2>
          <button 
            onClick={onClose} 
            className="w-9 h-9 flex items-center justify-center bg-gradient-to-br from-[#876F4C] to-[#525710] text-white rounded-full font-quicksand text-lg hover:scale-110 transition-transform shadow-lg"
          >
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6 scrollbar-whimsy">
          {children}
        </div>

        <div className="absolute bottom-0 left-0 w-full h-1 pointer-events-none"
             style={{ background: 'linear-gradient(90deg, #B55B37, #876F4C, #88A516)' }}></div>
      </motion.div>
    </motion.div>
  )
}

// --- LEGEND MODAL ---
export function LegendModal() {
  const menus = [
    { label: "Music", desc: "Play/Pause musik", icon: "music_on.svg" },
    { label: "RSVP", desc: "Konfirmasi kehadiran", icon: "rsvp.svg" },
    { label: "Jadwal", desc: "Tanggal & Lokasi", icon: "date.svg" },
    { label: "Kisah", desc: "Love story", icon: "kisah.svg" },
    { label: "Hadiah", desc: "Amplop digital", icon: "hadiah.svg" },
    { label: "Gallery", desc: "Foto pernikahan", icon: "galeri.svg" },
  ]

  return (
    <div className="space-y-4">
      {menus.map((item, i) => (
        <motion.div 
          key={i} 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          className="relative p-4 rounded-sm border-2 border-white flex items-center gap-3 shadow-md"
          style={paperStyle}
        >
          <PaperTexture />
          <div className="w-12 h-12 flex items-center justify-center relative bg-white/70 rounded-xl p-2 z-10 shadow-sm">
            <Image src={`/Assets/${item.icon}`} alt={item.label} fill className="object-contain" />
          </div>
          <div className="flex-1 z-10">
            <p className="font-fredoka font-bold text-[#525710] text-base">{item.label}</p>
            <p className="font-quicksand text-xs text-[#876F4C]">{item.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

// --- TIMER HELPER ---
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

  return <p className="font-fredoka font-bold text-[#B55B37] text-lg drop-shadow-sm">{timeLeft}</p>
}

// --- DATE TIME MODAL (JADWAL) ---
export function DateTimeModal() {
  return (
    <div className="space-y-6">
      {[
        { title: "Pemberkatan", date: "2026-07-10T10:00:00", info: "10 Juli 2026 | 10:00 WIB", loc: "GMII 'Anugerah' Bekasi", mapUrl: "#" },
        { title: "Resepsi", date: "2026-07-19T13:00:00", info: "19 Juli 2026 | 13:00 WIB", loc: "Kantor Pelayanan Perbendaharaan Negara Purworejo", delay: 0.2, mapUrl: "#" }
      ].map((evt, idx) => (
        <motion.div 
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: evt.delay || 0 }}
          className="p-6 rounded-sm text-center border-2 border-white relative overflow-hidden"
          style={paperStyle}
        >
          <PaperTexture />
          <div className="relative z-10">
            <h4 className="font-fredoka text-[#525710] mb-4 text-2xl font-bold">{evt.title}</h4>
            <div className="flex items-center justify-center gap-2 mb-4 bg-white/60 backdrop-blur-sm py-3 px-4 rounded-2xl border border-[#D4B69B]/30">
              <Clock size={20} className="text-[#88A516]" />
              <CountdownTimer targetDate={evt.date} />
            </div>
            <div className="text-sm space-y-1 font-quicksand font-semibold text-[#876F4C] mb-6">
              <p>{evt.info}</p>
              <p>{evt.loc}</p>
            </div>
            <a href={evt.mapUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-full py-3 bg-gradient-to-r from-[#876F4C] to-[#525710] text-white rounded-2xl font-fredoka font-bold text-sm shadow-md">
              LIHAT MAPS
            </a>
            <DoodleLine />
          </div>
        </motion.div>
      ))}
    </div>
  )
}

// --- LOVE STORY ---
export function LoveStoryModal() {
  const stories = [
    { title: "Pertemuan Pertama", desc: "ada" },
    { title: "kisahnya", desc: "afaf" },
    { title: "iej", desc: "afawfwcjanianci cionconvanv nwinxanx0a dweewcweinc" },
    { title: "Pernikahan", desc: "sdvvdsv" }
  ];

  return (
    <div className="space-y-8 py-2">
      {stories.map((story, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="relative p-5 rounded-sm shadow-lg border-2 border-white overflow-hidden" style={paperStyle}>
            <PaperTexture />
            <div className="mt-8 relative z-10">
              <h4 className="font-fredoka text-[#525710] text-base font-bold flex items-center gap-2">
                <span className="inline-block w-8 h-[2px] bg-gradient-to-r from-[#876F4C] to-transparent opacity-40"></span>
                {story.title}
              </h4>
              <p className="font-quicksand text-[#876F4C] text-xs leading-relaxed pl-10 relative">
                <span className="absolute left-0 top-1 text-[#D4B69B] text-2xl leading-none opacity-30">"</span>
                {story.desc}
                <span className="text-[#D4B69B] text-2xl leading-none opacity-30">"</span>
              </p>
            </div>
            <DoodleLine />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// --- GALLERY MODAL (DESAIN TETAP) ---
export function GalleryModal() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
 const photos = [

    // --- Data foto tetap sama ---

    { id: 1, url: "./images/gallery/MLJ02865.jpg", rotation: -1, width: "col-span-1", aspect: "aspect-[3/4]", frame: "bg-[#876F4C] p-2 pb-6 text-white" },

    { id: 2, url: "./images/gallery/MLJ02930.jpg", rotation: 1.5, width: "col-span-1", aspect: "aspect-square", frame: "bg-white p-2 pb-7 text-[#525710]" },

    { id: 3, url: "./images/gallery/MLJ03038.jpg", rotation: -2, width: "col-span-2", aspect: "aspect-[video]", frame: "bg-[#B55B37] p-2 pb-6 text-white" },

    { id: 4, url: "./images/gallery/MLJ02970.jpg", rotation: 1, width: "col-span-1", aspect: "aspect-square", frame: "bg-white p-2 pb-7 text-[#525710]" },

    { id: 5, url: "./images/gallery/MLJ02995.jpg", rotation: -1.5, width: "col-span-1", aspect: "aspect-[3/4]", frame: "bg-[#876F4C] p-2 pb-6 text-white" },

    { id: 6, url: "./images/gallery/MLJ02869.jpg", rotation: 2, width: "col-span-1", aspect: "aspect-square", frame: "bg-white p-2 pb-7 text-[#525710]" },

    { id: 7, url: "./images/gallery/MLJ02914.jpg", rotation: -1, width: "col-span-1", aspect: "aspect-[3/4]", frame: "bg-[#B55B37] p-2 pb-6 text-white" },

    { id: 8, url: "./images/gallery/MLJ02983.jpg", rotation: 1.2, width: "col-span-2", aspect: "aspect-[video]", frame: "bg-white p-2 pb-7 text-[#525710]" },

    { id: 9, url: "./images/gallery/MLJ03003.jpg", rotation: -1.8, width: "col-span-1", aspect: "aspect-[4/5]", frame: "bg-[#876F4C] p-2 pb-6 text-white" },

    { id: 10, url: "./images/gallery/MLJ02964.jpg", rotation: 1, width: "col-span-1", aspect: "aspect-square", frame: "bg-white p-2 pb-7 text-[#525710]" },

    { id: 11, url: "./images/gallery/MLJ03058.jpg", rotation: 3, width: "col-span-2", aspect: "aspect-[video]", frame: "bg-[#EDE6E7] p-3 pb-8 text-[#876F4C]" },

    { id: 12, url: "./images/gallery/MLJ03120.jpg", rotation: -3.5, width: "col-span-1", aspect: "aspect-[3/4]", frame: "bg-white p-2 pb-7 text-[#525710]" },

    { id: 13, url: "./images/gallery/MLJ03161.jpg", rotation: 2.5, width: "col-span-1", aspect: "aspect-square", frame: "bg-[#EDE6E7] p-3 pb-8 text-[#876F4C]" },

    { id: 14, url: "./images/gallery/MLJ03141.jpg", rotation: -2.8, width: "col-span-1", aspect: "aspect-[3/4]", frame: "bg-white p-2 pb-7 text-[#525710]" },

    { id: 15, url: "./images/gallery/MLJ03113.jpg", rotation: 4, width: "col-span-1", aspect: "aspect-square", frame: "bg-[#EDE6E7] p-3 pb-8 text-[#876F4C]" },

    { id: 16, url: "./images/gallery/MLJ03191.jpg", rotation: -3.2, width: "col-span-2", aspect: "aspect", frame: "bg-white p-2 pb-7 text-[#525710]" },

    { id: 17, url: "./images/gallery/MLJ03118.jpg", rotation: 3.5, width: "col-span-1", aspect: "aspect-square", frame: "bg-[#EDE6E7] p-3 pb-8 text-[#876F4C]" },

    { id: 18, url: "./images/gallery/MLJ03092.jpg", rotation: -4, width: "col-span-1", aspect: "aspect-[3/4]", frame: "bg-white p-2 pb-7 text-[#525710]" },

    { id: 19, url: "./images/gallery/MLJ03170.jpg", rotation: 3, width: "col-span-1", aspect: "aspect-square", frame: "bg-[#EDE6E7] p-3 pb-8 text-[#876F4C]" },

    { id: 20, url: "./images/gallery/MLJ03266.jpg", rotation: -3.5, width: "col-span-1", aspect: "aspect-[4/5]", frame: "bg-white p-2 pb-7 text-[#525710]" },

    { id: 21, url: "./images/gallery/MLJ03094.jpg", rotation: -3.2, width: "col-span-2", aspect: "aspect", frame: "bg-white p-2 pb-7 text-[#525710]" },

  ];
  return (
    <div className="space-y-6 py-4">
      <div className="grid grid-cols-2 gap-y-8 gap-x-4 items-start px-2">
        {photos.map((photo, i) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, rotate: photo.rotation }}
            onClick={() => setSelectedPhoto(photo)}
            className={`cursor-pointer group relative ${photo.width}`}
          >
            <div className={`${photo.frame} shadow-md relative rounded-sm`}>
              <div className={`relative ${photo.aspect} bg-[#F5F5F0] overflow-hidden`}>
                <img src={photo.url} alt="Gallery" className="w-full h-full object-cover" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-6 bg-black/80 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-sm flex flex-col items-center gap-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-white p-3 pb-12 shadow-2xl relative rounded-sm w-full">
                <div className="aspect-[3/4] overflow-hidden bg-[#F5F5F0]">
                  <img src={selectedPhoto.url} alt="Detail" className="w-full h-full object-cover" />
                </div>
                <div className="absolute bottom-4 left-0 right-0 text-center">
                  <span className="font-quicksand text-[10px] text-[#876F4C] uppercase tracking-widest font-bold">Sandya & Kukuh</span>
                </div>
              </div>
              <button onClick={() => setSelectedPhoto(null)} className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-[#876F4C] to-[#525710] text-white rounded-full shadow-2xl"><X size={28} /></button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- GIFT MODAL (HADIAH) ---
export function GiftModal({ onCopy }) {
  const accounts = [
    { 
      name: "Yesyurun Hasiholan Kukuh Priyambudi", 
      wallets: [{ bank: "Bank Mandiri", no: "1860003454382" }, { bank: "Blu BCA", no: "002873605342" }]
    }, 
    { 
      name: "Ivkrama Sandya Yudha", 
      wallets: [{ bank: "BNI", no: "0908615539" }, { bank: "BRI", no: "050701021049502" }]
    }
  ]

  return (
    <div className="space-y-6">
      <div className="relative p-5 rounded-sm border-2 border-white shadow-md text-center" style={paperStyle}>
        <PaperTexture />
        <p className="relative z-10 font-quicksand text-[#525710] text-sm">Kehadiran serta doa restu Anda adalah anugerah terindah bagi kami.</p>
      </div>
      
      {accounts.map((acc, i) => (
        <motion.div 
          key={i}
          className="p-6 rounded-sm border-2 border-white relative shadow-lg text-center"
          style={paperStyle}
        >
          <PaperTexture />
          <div className="relative z-10">
            <div className="flex justify-center mb-3 text-[#B55B37]"><CreditCard size={24} /></div>
            <p className="font-fredoka font-bold text-[#525710] text-lg mb-4">{acc.name}</p>
            <div className="space-y-4">
              {acc.wallets.map((wallet, idx) => (
                <div key={idx} className="space-y-2">
                  <p className="text-[10px] font-bold font-quicksand text-[#876F4C] uppercase tracking-widest">{wallet.bank}</p>
                  <div className="bg-white/60 py-3 rounded-xl border border-[#D4B69B]/30 shadow-inner">
                    <p className="font-quicksand font-bold text-[#876F4C] text-sm">{wallet.no}</p>
                  </div>
                  <button onClick={() => onCopy(wallet.no)} className="w-full py-2 bg-gradient-to-r from-[#B55B37] to-[#876F4C] text-white rounded-xl font-fredoka font-bold text-xs shadow-md flex items-center justify-center gap-2">
                    <Copy size={14} /> SALIN NOMOR
                  </button>
                </div>
              ))}
            </div>
            <DoodleLine />
          </div>
        </motion.div>
      ))}
    </div>
  )
}