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
import { motion } from 'framer-motion'

export default function MainPage() {
  const [activeModal, setActiveModal] = useState(null)
  const [isMusicPlaying, setIsMusicPlaying] = useState(true)
  const [showGreetings, setShowGreetings] = useState(true)
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const audioRef = useRef(null)
  const [playClick] = useSound('/audio/click.mp3', { volume: 0.5 });
  const [doneClick] = useSound('/audio/done.mp3', { volume: 1 });
  
  // Konfigurasi Animasi Cozy Pulse
  const cozyPulse = {
    scale: [1, 1.05, 1],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const [formData, setFormData] = useState({
    nama_tamu: '',
    pesan: '',
    attend_pemberkatan: false,
    attend_resepsi: false,
    tidak_hadir: false
  })

  useEffect(() => {
    loadMessages()

    const subscription = subscribeToMessages((newMessage) => {
      setMessages(prev => [newMessage, ...prev])
    })

    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play().catch((error) => {
          console.log('Autoplay prevented:', error)
        })
      }
    }, 500)

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const loadMessages = async () => {
    try {
      const data = await getMessages()
      setMessages(data)
    } catch (error) {
      console.error('Error loading messages:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.nama_tamu.trim() || !formData.pesan.trim()) {
      alert('Mohon isi nama dan pesan')
      return
    }

    setSending(true)

    try {
      await addMessage(
        formData.nama_tamu.trim(),
        formData.pesan.trim(),
        formData.attend_pemberkatan || false,
        formData.attend_resepsi || false
      )

      setFormData({
        nama_tamu: '',
        pesan: '',
        attend_pemberkatan: false,
        attend_resepsi: false,
        tidak_hadir: false
      })

      doneBtnSFX(null); 
      alert('Terima kasih atas ucapannya~')
      
    } catch (error) {
      console.error('Error sending message:', error)
      alert('Terjadi kesalahan saat mengirim pesan. Pastikan koneksi stabil.')
    } finally {
      setSending(false)
    }
  }

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsMusicPlaying(!isMusicPlaying)
    }
  }

  const toggleGreetings = () => {
    setShowGreetings(!showGreetings)
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    alert('Nomor rekening berhasil disalin!')
  }

  const clickBtnSFX = (modalName) => {
    playClick();
    setActiveModal(modalName);
  };

  const doneBtnSFX = (modalName) => {
    doneClick();
    setActiveModal(modalName);
  };

  return (
    <div className="container-9-16">
      <audio ref={audioRef} loop>
        <source src="/audio/Berak_Tak_Cebok.mp3" type="audio/mpeg" />
      </audio>

      <div className="absolute inset-0">
        <Image
          src="/Assets/bg.webp"
          alt="Background"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      </div>

      <div className="absolute inset-0">
        
        {/* Icon Info */}
        <motion.button
          onClick={() => clickBtnSFX('legend')}
          animate={cozyPulse}
          className="absolute icon-hover z-10"
          style={{ 
            top: '5%',
            left: '7%',
            width: '9%',
            aspectRatio: '1/1'
          }}
        >
          <Image 
            src="/Assets/info.svg" 
            alt="Info" 
            fill
            style={{ objectFit: 'contain' }}
          />
        </motion.button>

        {/* Music Icon */}
        <motion.button
          onClick={toggleMusic}
          animate={cozyPulse}
          className="absolute icon-hover z-10"
          style={{ 
            top: '11%',
            left: '7%',
            width: '9%',
            aspectRatio: '1/1'
          }}
        >
          <Image
            src={isMusicPlaying ? "/Assets/music_on.svg" : "/Assets/music_off.svg"}
            alt="Music"
            fill
            style={{ objectFit: 'contain' }}
          />
        </motion.button>

        {/* Lihat Ucapan */}
        <motion.button
          onClick={() => clickBtnSFX('messages')}
          animate={cozyPulse}
          className="absolute icon-hover"
          style={{ 
            top: '18%',
            left: '13%',
            width: '30%'
          }}
        >
          <Image 
            src="/Assets/ucapan.svg" 
            alt="Lihat Ucapan" 
            width={300} 
            height={100}
            style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
          />
        </motion.button>

        {/* Galeri */}
        <motion.button
          onClick={() => clickBtnSFX('gallery')}
          animate={cozyPulse}
          className="absolute icon-hover"
          style={{ 
            top: '38%',
            left: '24%',
            width: '30%'
          }}
        >
          <Image 
            src="/Assets/galeri.svg" 
            alt="Gallery" 
            width={250} 
            height={100}
            style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
          />
        </motion.button>

        {/* RSVP & Ucapan (Kucing) */}
        <motion.button
          onClick={() => clickBtnSFX('rsvp')}
          animate={cozyPulse}
          className="absolute icon-hover"
          style={{ 
            bottom: '12%',
            right: '7%',
            width: '30%',
            background: 'none',
            border: 'none',
            display: 'block'
          }}
        >
        <Image 
            src="/Assets/rsvp.svg" 
            alt="RSVP" 
            width={250} 
            height={100}
            style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
          />
        </motion.button>

        {/* Tanggal & Lokasi */}
        <motion.button
          onClick={() => clickBtnSFX('datetime')}
          animate={cozyPulse}
          className="absolute icon-hover"
          style={{ 
            top: '34%',
            right: '7%',
            width: '33%'
          }}
        >
          <Image 
            src="/Assets/date.svg" 
            alt="Tanggal & Lokasi" 
            width={350} 
            height={120}
            style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
          />
        </motion.button>

        {/* Kisah Kami */}
        <motion.button
          onClick={() => clickBtnSFX('lovestory')}
          animate={cozyPulse}
          className="absolute icon-hover"
          style={{ 
            bottom: '27%',
            right: '24%',
            width: '30%'
          }}
        >
          <Image 
            src="/Assets/kisah.svg" 
            alt="Kisah Kami" 
            width={300} 
            height={100}
            style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
          />
        </motion.button>

        {/* Hadiah */}
        <motion.button
          onClick={() => clickBtnSFX('gift')}
          animate={cozyPulse}
          className="absolute icon-hover"
          style={{ 
            bottom: '38%',
            left: '7%',
            width: '24%'
          }}
        >
          <Image 
            src="/Assets/hadiah.svg" 
            alt="Hadiah" 
            width={250} 
            height={100}
            style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
          />
        </motion.button>

        {/* Toggle Greetings (^) */}
        <motion.button
          onClick={toggleGreetings}
          animate={cozyPulse}
          className="absolute icon-hover z-10"
          style={{ 
            bottom: '5%',
            left: '7%',
            width: '8%',
            aspectRatio: '1/1'
          }}
        >
          <Image
            src="/Assets/up.svg"
            alt="Toggle Greetings"
            fill
            style={{ objectFit: 'contain' }}
          />
        </motion.button>

        {/* RSVP Quick Add (+) */}
        <motion.button
          onClick={() => clickBtnSFX('rsvp')}
          animate={cozyPulse}
          className="absolute icon-hover pulse-glow z-10"
          style={{ 
            bottom: '5%',
            left: '16%',
            width: '8%',
            aspectRatio: '1/1'
          }}
        >
          <Image
            src="/Assets/add.svg"
            alt="add-rsvp"
            fill
            style={{ objectFit: 'contain' }}
          />
        </motion.button>

        {/* Greetings Display */}
        {showGreetings && messages.length > 0 && (
          <div
            className="absolute bg-white/50 rounded-xl shadow-lg overflow-y-auto px-3 py-2"
            style={{
              bottom: '11%',
              left: '7%',
              width: '50%',
              maxHeight: '25%',
            }}
          >
            <div className="space-y-2">
              {messages.slice(0, 5).map((msg) => (
                <div key={msg.id} className="text-xs border-b border-grey pb-2 last:border-0">
                  <p className="font-britney text-gray-800">{msg.nama_tamu}</p>
                  <p className="font-chillax-bold text-gray-600 mt-1 line-clamp-2">{msg.pesan}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {activeModal && (
        <ModalContainer
          isOpen={!!activeModal}
          onClose={() => clickBtnSFX(null)}
          title={
            activeModal === 'legend' ? 'Informasi' :
            activeModal === 'rsvp' ? 'RSVP & Ucapan' :
            activeModal === 'datetime' ? 'Tanggal & Lokasi' :
            activeModal === 'lovestory' ? 'Kisah Kami' :
            activeModal === 'gift' ? 'Hadiah' :
            activeModal === 'messages' ? 'Daftar Ucapan' :
            activeModal === 'gallery' ? 'Galeri' :
            'Info'
          }
        >
          {activeModal === 'legend' && <LegendModal />}
          {activeModal === 'datetime' && <DateTimeModal />}
          {activeModal === 'lovestory' && <LoveStoryModal />}
          {activeModal === 'gift' && <GiftModal onCopy={copyToClipboard} />}
          {activeModal === 'gallery' && <GalleryModal />}
          {activeModal === 'rsvp' && (
            <RSVPForm
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleSubmit}
              sending={sending}
            />
          )}
          {activeModal === 'messages' && (
            <MessagesList
              messages={messages}
              loading={loading}
            />
          )}
        </ModalContainer>
      )}
    </div>
  )
}