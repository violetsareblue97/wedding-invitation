'use client'

import { motion } from 'framer-motion'

export function RSVPForm({ formData, setFormData, onSubmit, sending }) {
  const isAttendingAny = formData.attend_pemberkatan || formData.attend_resepsi;
  const isDeclining = formData.tidak_hadir;

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="font-britney text-[#525710] text-3xl mb-2">RSVP & Ucapan</h3>
        <p className="font-quicksand text-[#876F4C] text-sm">Berikan ucapan dan konfirmasi kehadiran Anda</p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-quicksand font-bold text-[#525710] mb-2">Nama Anda *</label>
          <input
            type="text"
            value={formData.nama_tamu}
            onChange={(e) => setFormData({ ...formData, nama_tamu: e.target.value })}
            placeholder="Masukkan nama Anda"
            className="w-full px-4 py-3 rounded-2xl border-2 border-[#D4B69B]/40 focus:border-[#88A516] focus:outline-none transition-colors bg-white/50"
            required
          />
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-quicksand font-bold text-[#525710] mb-2">Ucapan & Doa *</label>
          <textarea
            value={formData.pesan}
            onChange={(e) => setFormData({ ...formData, pesan: e.target.value })}
            placeholder="Tuliskan ucapan dan doa terbaik Anda..."
            rows={4}
            className="w-full px-4 py-3 rounded-2xl border-2 border-[#D4B69B]/40 focus:border-[#88A516] focus:outline-none transition-colors resize-none bg-white/50"
            required
          />
        </div>

        {/* Attendance Selection */}
        <div>
          <label className="block text-sm font-quicksand font-bold text-[#525710] mb-2">
            Konfirmasi Kehadiran *
          </label>
          
          <div className="space-y-3">
            {[
              { id: 'attend_pemberkatan', label: 'Pemberkatan', time: '10 Juni 2026 • 10:00 WIB', disabled: isDeclining },
              { id: 'attend_resepsi', label: 'Resepsi', time: '12 Juni 2026 • 13:00 WIB', disabled: isDeclining },
              { id: 'tidak_hadir', label: 'Tidak Hadir', time: 'Anda tidak bisa menghadiri acara', disabled: isAttendingAny }
            ].map((opt) => (
              <button
                key={opt.id}
                type="button"
                disabled={opt.disabled}
                onClick={() => setFormData({ ...formData, [opt.id]: !formData[opt.id] })}
                className={`w-full p-4 rounded-2xl border-2 transition-all text-left ${
                  formData[opt.id]
                    ? 'border-[#88A516] bg-[#EDE6E7] shadow-md'
                    : 'border-[#D4B69B]/30 bg-white/40 hover:border-[#88A516]'
                } ${opt.disabled ? 'opacity-40 cursor-not-allowed' : ''}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-quicksand font-bold text-[#525710]">{opt.label}</p>
                    <p className="text-xs font-quicksand text-[#876F4C] mt-1">{opt.time}</p>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    formData[opt.id] ? 'border-[#88A516] bg-[#88A516]' : 'border-[#D4B69B]'
                  }`}>
                    {formData[opt.id] && (
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={sending || (!isAttendingAny && !isDeclining)}
          className="w-full py-4 bg-gradient-to-r from-[#876F4C] to-[#525710] hover:brightness-110 text-white font-fredoka font-bold rounded-2xl transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
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
        <h3 className="font-britney text-[#525710] text-3xl mb-2">Daftar Ucapan</h3>
        <p className="font-quicksand text-[#876F4C] text-sm">Telah terkumpul {messages.length} doa restu</p>
      </div>

      {loading ? (
        <div className="text-center py-12 text-[#88A516] font-quicksand">Memuat ucapan...</div>
      ) : (
        <div className="space-y-4 pr-2">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/60 backdrop-blur-sm rounded-3xl p-5 border-2 border-[#D4B69B]/30 shadow-sm relative overflow-hidden"
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-britney text-[#B55B37] text-xl">{message.nama_tamu}</h4>
                <span className="text-[10px] font-bold text-[#876F4C]/60 uppercase tracking-widest">
                  {new Date(message.created_at).toLocaleDateString('id-ID')}
                </span>
              </div>
              <p className="font-quicksand text-[#525710] text-sm leading-relaxed mb-4 italic">
                "{message.pesan}"
              </p>
              
              <div className="flex flex-wrap gap-2">
                {message.attend_pemberkatan && (
                  <span className="px-3 py-1 rounded-full text-[9px] font-bold bg-[#88A516]/10 text-[#525710] border border-[#88A516]/20">
                    PEMBERKATAN
                  </span>
                )}
                {message.attend_resepsi && (
                  <span className="px-3 py-1 rounded-full text-[9px] font-bold bg-[#B55B37]/10 text-[#B55B37] border border-[#B55B37]/20">
                    RESEPSI
                  </span>
                )}
                {!message.attend_pemberkatan && !message.attend_resepsi && (
                  <span className="px-3 py-1 rounded-full text-[9px] font-bold bg-[#876F4C]/10 text-[#876F4C] border border-[#876F4C]/20">
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