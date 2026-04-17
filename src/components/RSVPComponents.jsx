'use client'

import { motion } from 'framer-motion'

export function RSVPForm({ formData, setFormData, onSubmit, sending }) {
  // Logika pembantu untuk mengecek status
  const isAttendingAny = formData.attend_pemberkatan || formData.attend_resepsi;
  const isDeclining = formData.tidak_hadir;

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="font-britney text-[#8D6B75] text-3xl mb-2">RSVP & Ucapan</h3>
        <p className="font-quicksand text-[#8D6B75]/70 text-sm">Berikan ucapan dan konfirmasi kehadiran Anda</p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-quicksand font-bold text-[#8D6B75] mb-2">Nama Anda *</label>
          <input
            type="text"
            value={formData.nama_tamu}
            onChange={(e) => setFormData({ ...formData, nama_tamu: e.target.value })}
            placeholder="Masukkan nama Anda"
            className="w-full px-4 py-3 rounded-2xl border-2 border-[#EBCAD5] focus:border-[#DBA5B7] focus:outline-none transition-colors"
            required
          />
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-quicksand font-bold text-[#8D6B75] mb-2">Ucapan & Doa *</label>
          <textarea
            value={formData.pesan}
            onChange={(e) => setFormData({ ...formData, pesan: e.target.value })}
            placeholder="Tuliskan ucapan dan doa terbaik Anda..."
            rows={4}
            className="w-full px-4 py-3 rounded-2xl border-2 border-[#EBCAD5] focus:border-[#DBA5B7] focus:outline-none transition-colors resize-none"
            required
          />
        </div>

        {/* Attendance Selection */}
        <div>
          <label className="block text-sm font-quicksand font-bold text-[#8D6B75] mb-2">
            Konfirmasi Kehadiran *
          </label>
          <p className="text-xs font-quicksand text-[#8D6B75]/60 mb-3">
            Pilih acara yang akan Anda hadiri
          </p>
          
          <div className="space-y-3">
            {/* Pemberkatan Card */}
            <button
              type="button"
              disabled={isDeclining}
              onClick={() => setFormData({ 
                ...formData, 
                attend_pemberkatan: !formData.attend_pemberkatan 
              })}
              className={`w-full p-4 rounded-2xl border-2 transition-all text-left ${
                formData.attend_pemberkatan
                  ? 'border-[#DBA5B7] bg-[#FFF5F7] shadow-md'
                  : 'border-[#EBCAD5] bg-white hover:border-[#DBA5B7]'
              } ${isDeclining ? 'opacity-40 cursor-not-allowed' : ''}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-quicksand font-bold text-[#8D6B75]">
                    Pemberkatan
                  </p>
                  <p className="text-xs font-quicksand text-[#8D6B75]/70 mt-1">
                    10 Juni 2026 • 10:00 WIB
                  </p>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  formData.attend_pemberkatan
                    ? 'border-[#DBA5B7] bg-[#DBA5B7]'
                    : 'border-[#EBCAD5]'
                }`}>
                  {formData.attend_pemberkatan && (
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </div>
            </button>

            {/* Resepsi Card */}
            <button
              type="button"
              disabled={isDeclining}
              onClick={() => setFormData({ 
                ...formData, 
                attend_resepsi: !formData.attend_resepsi 
              })}
              className={`w-full p-4 rounded-2xl border-2 transition-all text-left ${
                formData.attend_resepsi
                  ? 'border-[#DBA5B7] bg-[#FFF5F7] shadow-md'
                  : 'border-[#EBCAD5] bg-white hover:border-[#DBA5B7]'
              } ${isDeclining ? 'opacity-40 cursor-not-allowed' : ''}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-quicksand font-bold text-[#8D6B75]">
                    Resepsi
                  </p>
                  <p className="text-xs font-quicksand text-[#8D6B75]/70 mt-1">
                    12 Juni 2026 • 13:00 WIB
                  </p>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  formData.attend_resepsi
                    ? 'border-[#DBA5B7] bg-[#DBA5B7]'
                    : 'border-[#EBCAD5]'
                }`}>
                  {formData.attend_resepsi && (
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </div>
            </button>

            {/* Tidak Hadir Card */}
            <button
              type="button"
              disabled={isAttendingAny}
              onClick={() => setFormData({ 
                ...formData, 
                tidak_hadir: !formData.tidak_hadir 
              })}
              className={`w-full p-4 rounded-2xl border-2 transition-all text-left ${
                formData.tidak_hadir
                  ? 'border-[#DBA5B7] bg-[#FFF5F7] shadow-md'
                  : 'border-[#EBCAD5] bg-white hover:border-[#DBA5B7]'
              } ${isAttendingAny ? 'opacity-40 cursor-not-allowed' : ''}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-quicksand font-bold text-[#8D6B75]">
                    Tidak Hadir
                  </p>
                  <p className="text-xs font-quicksand text-[#8D6B75]/70 mt-1">
                    Anda tidak bisa menghadiri acara
                  </p>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  formData.tidak_hadir
                    ? 'border-[#DBA5B7] bg-[#DBA5B7]'
                    : 'border-[#EBCAD5]'
                }`}>
                  {formData.tidak_hadir && (
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </div>
            </button>
          </div>

          {/* Helper text */}
          {!isAttendingAny && !isDeclining && (
            <p className="text-xs font-quicksand text-[#8D6B75]/50 mt-2 text-center">
              Pilih minimal satu opsi di atas untuk mengonfirmasi kehadiran Anda
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={sending || (!isAttendingAny && !isDeclining)}
          className="w-full py-4 bg-[#DBA5B7] hover:bg-[#C88A9F] text-white font-quicksand font-bold rounded-2xl transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {sending ? "Mengirim..." : "KIRIM UCAPAN"}
        </button>
      </form>
    </div>
  )
}

export function MessagesList({ messages, loading }) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="font-britney text-[#8D6B75] text-3xl mb-2">Daftar Ucapan</h3>
        <p className="font-quicksand text-[#8D6B75]/70 text-sm">Telah terkumpul {messages.length} doa restu</p>
      </div>

      {loading ? (
        <div className="text-center py-12 text-[#DBA5B7]">Memuat...</div>
      ) : (
        <div className="space-y-4 pr-2">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl p-5 border-2 border-[#EBCAD5] shadow-sm"
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-britney text-[#8D6B75] text-lg">{message.nama_tamu}</h4>
                <span className="text-[10px] text-[#8D6B75]/50">
                  {new Date(message.created_at).toLocaleDateString('id-ID')}
                </span>
              </div>
              <p className="font-quicksand text-[#8D6B75] text-sm leading-relaxed mb-3">
                {message.pesan}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {message.attend_pemberkatan && (
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-[#FFF5F7] text-[#DBA5B7] border border-[#EBCAD5]">
                    ✓ PEMBERKATAN
                  </span>
                )}
                {message.attend_resepsi && (
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-[#FFF5F7] text-[#DBA5B7] border border-[#EBCAD5]">
                    ✓ RESEPSI
                  </span>
                )}
                {!message.attend_pemberkatan && !message.attend_resepsi && (
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-gray-100 text-gray-500">
                    TIDAK HADIR
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}