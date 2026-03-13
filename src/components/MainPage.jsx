'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { getMessages, addMessage, subscribeToMessages } from '@/lib/supabase'
import {
  ModalContainer,
  LegendModal,
  DateTimeModal,
  LoveStoryModal,
  GiftModal,
  AboutUsModal,
  GalleryModal,
} from './Modals'
import { RSVPForm, MessagesList } from './RSVPComponents'

export default function MainPage() {
  const [activeModal, setActiveModal] = useState(null)
  const [isMusicPlaying, setIsMusicPlaying] = useState(true)
  const [showGreetings, setShowGreetings] = useState(true)
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const audioRef = useRef(null)
  
  const [formData, setFormData] = useState({
    nama_tamu: '',
    pesan: '',
    pilihan_bunga: 'rose',
    will_attend: null
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
        formData.will_attend
      )

      setFormData({
        nama_tamu: '',
        pesan: '',
        pilihan_bunga: 'rose',
        will_attend: null
      })

      alert('Terima kasih atas ucapannya~')
      setActiveModal(null)
    } catch (error) {
      console.error('Error sending message:', error)
      alert('Maaf, terjadi kesalahan. Silakan coba lagi.')
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

  return (
    <div className="container-9-16">
      {/* Background music */}
      <audio ref={audioRef} loop>
        <source src="/audio/Berak_Tak_Cebok.mp3" type="audio/mpeg" />
      </audio>

      {/* Main background */}
      <div className="absolute inset-0">
        <Image
          src="/Assets/bg.webp"
          alt="Background"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      </div>

      {/* Interactive Icons Layer */}
      <div className="absolute inset-0">
        
        {/* Icon Info - Kiri Atas (Bulat) */}
        <button
          onClick={() => setActiveModal('legend')}
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
        </button>

        {/* Icon Music - Di bawah Info (Bulat) */}
        <button
          onClick={toggleMusic}
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
        </button>

        {/* Lihat Ucapan*/}
        <button
          onClick={() => setActiveModal('messages')}
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
        </button>

        {/* Galeri - Kiri Bawah (di frame foto) */}
        <button
          onClick={() => setActiveModal('gallery')}
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
        </button>

        {/* RSVP & Ucapan*/}
        <button
          onClick={() => setActiveModal('rsvp')}
          className="absolute icon-hover"
          style={{ 
            bottom: '12%',
            right: '7%',
            width: '30%'
          }}
        >
          <Image 
            src="/Assets/rsvp.svg" 
            alt="RSVP & Ucapan" 
            width={350} 
            height={120}
            style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
          />
        </button>

        {/* Tanggal & Lokasi - Kanan Tengah (di kalender) */}
        <button
          onClick={() => setActiveModal('datetime')}
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
        </button>

        {/* Kisah Kami - Kanan Tengah Bawah (di meja) */}
        <button
          onClick={() => setActiveModal('lovestory')}
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
        </button>

        {/* Hadiah */}
        <button
          onClick={() => setActiveModal('gift')}
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
        </button>

        {/* Icon Toggle Greetings (^) - Bawah Kiri */}
        <button
          onClick={toggleGreetings}
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
        </button>

        {/* RSVP ADD */}
        <button
          onClick={() => setActiveModal('rsvp')}
          className="absolute icon-hover z-10"
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
        </button>

        {/* Toggle Greetings Display */}
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

      {/* Modals */}
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
            activeModal === 'aboutus' ? 'About Us' :
            activeModal === 'messages' ? 'Daftar Ucapan' :
            activeModal === 'gallery' ? 'Galeri' :
            'Info'
          }
        >
          {activeModal === 'legend' && <LegendModal />}
          {activeModal === 'datetime' && <DateTimeModal />}
          {activeModal === 'lovestory' && <LoveStoryModal />}
          {activeModal === 'gift' && <GiftModal onCopy={copyToClipboard} />}
          {activeModal === 'aboutus' && <AboutUsModal />}
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