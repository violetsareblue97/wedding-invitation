'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import useSound from 'use-sound';
import { getMessages, addMessage, subscribeToMessages } from '@/lib/supabase'
import {
  ModalContainer,
  LegendModal,
  DateTimeModal,
  LoveStoryModal,
  GiftModal,
  GalleryModal,
} from './Modals'
import { RSVPForm, MessagesList } from './RSVPComponents'
import { motion, AnimatePresence } from 'framer-motion'

// --- KOMPONEN DENGAN INVISIBLE HITBOX (WARNA MERAH UNTUK DEBUGGING) ---
const RotatingButton = ({ 
  children, 
  onClick, 
  gapDegree = 0, 
  gapOffset = 0, 
  className = "", 
  style = {}, 
  circleStyle = {}, 
  iconStyle = {}, 
  hitboxStyle = {}, 
  animateProps
}) => {
  const maskStyle = {
    WebkitMaskImage: `conic-gradient(from ${gapOffset - (gapDegree / 2)}deg, transparent ${gapDegree}deg, white ${gapDegree}deg)`,
    maskImage: `conic-gradient(from ${gapOffset - (gapDegree / 2)}deg, transparent ${gapDegree}deg, white ${gapDegree}deg)`,
  };

  return (
    <div className="absolute z-10" style={{ ...style }}>
      
      {/* 1. LAYER IKON (Ditulis pertama agar berada di bawah) */}
      <div 
        className="absolute flex items-center justify-center pointer-events-none" 
        style={{ inset: '0', ...iconStyle }}
      >
        {children}
      </div>

      {/* 2. LAYER LINGKARAN (Ditulis setelah ikon agar MENIMPA ikon) */}
      <div 
        className="absolute pointer-events-none" 
        style={{ ...maskStyle, inset: '0', ...circleStyle }}
      >
        <motion.svg 
          viewBox="0 0 100 100" 
          className="w-full h-full" 
          animate={{ rotate: 360 }} 
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        >
          <circle 
            cx="50" cy="50" r="46" 
            fill="none" stroke="white" strokeWidth="2" strokeDasharray="5 5" 
          />
        </motion.svg>
      </div>

      {/* 3. LAYER HITBOX */}
      <motion.button
        onClick={onClick}
        animate={animateProps}
        whileTap={{ scale: 0.9 }}
        className="absolute z-20 rounded-full"
        style={{ 
          width: '50px', 
          height: '50px', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)',
          ...hitboxStyle 
        }}
      />
    </div>
  );
};

export default function MainPage() {
  const [activeModal, setActiveModal] = useState(null)
  const [isMusicPlaying, setIsMusicPlaying] = useState(true)
  const [showGreetings, setShowGreetings] = useState(true)
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleCount, setVisibleCount] = useState(3)
  const containerRef = useRef(null)
  const audioRef = useRef(null)
  const [playClick] = useSound('/audio/click.mp3', { volume: 1 });
  const [doneClick] = useSound('/audio/done.mp3', { volume: 1 });
  
  const cozyPulse = {
    scale: [1, 1.10, 1],
    transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
  };

  const [formData, setFormData] = useState({
    nama_tamu: '', pesan: '', attend_pemberkatan: false, attend_resepsi: false, tidak_hadir: false
  })

  // --- LOGIC FETCHING ---
  useEffect(() => {
    loadMessages()
    const subscription = subscribeToMessages((newMessage) => {
      setMessages(prev => [newMessage, ...prev])
    })
    setTimeout(() => {
      if (audioRef.current) audioRef.current.play().catch(() => {})
    }, 500)
    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (showGreetings && messages.length > 0) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % Math.min(messages.length, 10));
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [showGreetings, messages.length]);

  const loadMessages = async () => {
    try {
      const data = await getMessages()
      setMessages(data)
    } catch (error) { console.error(error) } finally { setLoading(false) }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.nama_tamu.trim() || !formData.pesan.trim()) return alert('Mohon isi nama dan pesan')
    setSending(true)
    try {
      await addMessage(formData.nama_tamu.trim(), formData.pesan.trim(), formData.attend_pemberkatan, formData.attend_resepsi)
      setFormData({ nama_tamu: '', pesan: '', attend_pemberkatan: false, attend_resepsi: false, tidak_hadir: false })
      doneClick(); alert('Terima kasih!')
    } catch (error) { alert('Terjadi kesalahan.') } finally { setSending(false) }
  }

  const toggleMusic = () => {
    if (audioRef.current) {
      isMusicPlaying ? audioRef.current.pause() : audioRef.current.play();
      setIsMusicPlaying(!isMusicPlaying)
    }
  }

  const clickBtnSFX = (modalName) => { playClick(); setActiveModal(modalName); };
  const copyToClipboard = (text) => { navigator.clipboard.writeText(text); alert('Disalin!'); }

  return (
    <div className="container-9-16">
      <audio ref={audioRef} loop><source src="/audio/lagu.mp3" type="audio/mpeg" /></audio>

      <div className="absolute inset-0">
        <Image src="/Assets/bg.svg" alt="Background" fill style={{ objectFit: 'cover' }} priority />
      </div>

      <div className="absolute inset-0">
        {/* BUTTON STANDAR */}
        <motion.button onClick={() => clickBtnSFX('legend')} animate={cozyPulse} className="absolute z-10" style={{ top: '5%', left: '7%', width: '15%', aspectRatio: '1/1' }}>
          <Image src="/Assets/info.svg" alt="Info" fill style={{ objectFit: 'contain' }} />
        </motion.button>

        <motion.button onClick={toggleMusic} animate={cozyPulse} className="absolute z-10" style={{ top: '11%', left: '7%', width: '15%', aspectRatio: '1/1' }}>
          <Image src={isMusicPlaying ? "/Assets/music_on.svg" : "/Assets/music_off.svg"} alt="Music" fill style={{ objectFit: 'contain' }} />
        </motion.button>

        <motion.button onClick={() => setShowGreetings(!showGreetings)} animate={cozyPulse} className="absolute z-10" style={{ bottom: '5%', left: '7%', width: '15%', aspectRatio: '1/1' }}>
          <Image src="/Assets/up.svg" alt="Up" fill style={{ objectFit: 'contain' }} />
        </motion.button>

        <motion.button onClick={() => clickBtnSFX('rsvp')} animate={cozyPulse} className="absolute z-10" style={{ bottom: '5%', left: '17%', width: '15%', aspectRatio: '1/1' }}>
          <Image src="/Assets/add.svg" alt="Add" fill style={{ objectFit: 'contain' }} />
        </motion.button>

        {/* PESAN-PESAN / UCAPAN */}
        <RotatingButton 
          onClick={() => clickBtnSFX('messages')} 
          animateProps={cozyPulse}
          gapDegree={145} gapOffset={146}
          style={{ top: '6%', left: '23.5%', width: '36%', height: '36%' }}
          circleStyle={{ top: '-14%', left: '8%', width: '60%'}}
          hitboxStyle={{ width: '80px', height: '80px', top: '25.5%', left: '6%' }} 
        >
          <Image src="/Assets/ucapan.svg" alt="Lihat Ucapan" width={300} height={100} style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
        </RotatingButton>

        {/* GALERI */}
        <RotatingButton 
          onClick={() => clickBtnSFX('gallery')} 
          animateProps={cozyPulse}
          gapDegree={73} gapOffset={218}
          style={{ bottom: '4%', right: '20%', width: '25%', height: '16%' }}
          circleStyle={{ top: '-40%', left: '29%', width: '88%'}}
          hitboxStyle={{ width: '80px', height: '80px', top: '-11%', left: '30%' }}
        >
          <Image src="/Assets/galeri.svg" alt="Gallery" width={250} height={100} style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
        </RotatingButton>

        {/* RSVP */}
        <RotatingButton 
          onClick={() => clickBtnSFX('rsvp')} 
          animateProps={cozyPulse}
          gapDegree={145} gapOffset={186}
          style={{ top: '27.6%', left: '19%', width: '36%', height: '29%' }}
          circleStyle={{ bottom: '32%', left: '20%', width: '65%'}}
          hitboxStyle={{ width: '80px', height: '80px', top: '12%', left: '20%' }}
        >
          <Image src="/Assets/rsvp.svg" alt="RSVP" width={250} height={100} style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
        </RotatingButton>

        {/* DATE / TANGGAL & LOKASI */}
        <RotatingButton 
          onClick={() => clickBtnSFX('datetime')} 
          animateProps={cozyPulse}
          gapDegree={155} gapOffset={195}
          style={{ top: '15%', right: '11%', width: '36%', height: '32%' }}
          circleStyle={{ bottom: '28%', left: '25.5%', width: '63%'}}
          hitboxStyle={{ width: '80px', height: '80px', top: '16%', left: '25.5%' }}
        >
          <Image src="/Assets/date.svg" alt="Tanggal" width={350} height={120} style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
        </RotatingButton>

        {/* KISAH KAMI */}
        <RotatingButton 
          onClick={() => clickBtnSFX('lovestory')} 
          animateProps={cozyPulse}
          gapDegree={130} gapOffset={14}
          style={{ bottom: '29%', right: '17%', width: '33%', height: '29%' }}
          circleStyle={{ bottom: '18%', left: '12%', width: '70%'}}
          hitboxStyle={{ width: '70px', height: '110px', top: '18%', left: '12%' }}
        >
          <Image src="/Assets/kisah.svg" alt="Kisah" width={300} height={100} style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
        </RotatingButton>

        {/* HADIAH */}
        <RotatingButton 
          onClick={() => clickBtnSFX('gift')} 
          animateProps={cozyPulse}
          gapDegree={86} gapOffset={170}
          style={{ bottom: '18%', right: '5%', width: '24%', height: '21%' }}
          circleStyle={{ bottom: '19%', left: '0%', width: '88%'}}
          hitboxStyle={{ width: '80px', height: '80px', top: '10%', left: '-1%' }}
        >
          <Image src="/Assets/hadiah.svg" alt="Hadiah" width={250} height={100} style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
        </RotatingButton>

        {/* Greetings Animation... */}
        {showGreetings && messages.length > 0 && (
          <div className="absolute z-20 pointer-events-none overflow-hidden" style={{ bottom: '12%', left: '6%', width: '47%', height: '250px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
            <div ref={containerRef} className="space-y-3">
              <AnimatePresence mode="popLayout" initial={false}>
                {messages.slice(currentIndex, currentIndex + visibleCount).map((msg) => (
                  <motion.div key={msg.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="bg-white/50 backdrop-blur-m p-3.5 rounded-2xl rounded-bl-none shadow-md border border-white/40 w-full">
                    <p className="font-britney text-[#B55B37] text-[11px] font-bold truncate">{msg.nama_tamu}</p>
                    <p className="font-chillax text-[#525710] text-[10px] line-clamp-3">{msg.pesan}</p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>

      {/* --- MODAL LOGIC FIXED --- */}
      {activeModal && (
        <ModalContainer
          isOpen={!!activeModal}
          onClose={() => setActiveModal(null)}
          title={
            activeModal === 'legend' ? 'Informasi' :
            activeModal === 'rsvp' ? 'RSVP & Ucapan' :
            activeModal === 'datetime' ? 'Tanggal & Lokasi' :
            activeModal === 'lovestory' ? 'Kisah Kami' :
            activeModal === 'gift' ? 'Hadiah' :
            activeModal === 'messages' ? 'Daftar Ucapan' :
            activeModal === 'gallery' ? 'Galeri' : 'Info'
          }
        >
          {activeModal === 'legend' && <LegendModal />}
          {activeModal === 'datetime' && <DateTimeModal />}
          {activeModal === 'lovestory' && <LoveStoryModal />}
          {activeModal === 'gift' && <GiftModal onCopy={copyToClipboard} />}
          {activeModal === 'gallery' && <GalleryModal />}
          {activeModal === 'rsvp' && <RSVPForm formData={formData} setFormData={setFormData} onSubmit={handleSubmit} sending={sending} />}
          {activeModal === 'messages' && <MessagesList messages={messages} loading={loading} />}
        </ModalContainer>
      )}
    </div>
  )
}