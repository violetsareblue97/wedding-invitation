'use client'

import { motion } from 'framer-motion'

export function RSVPForm({ formData, setFormData, onSubmit, sending }) {
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

        {/* Attendance */}
        <div>
          <label className="block text-sm font-quicksand font-bold text-[#8D6B75] mb-3">Konfirmasi Kehadiran</label>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, will_attend: true })}
              className={`flex-1 py-3 rounded-2xl border-2 font-quicksand font-bold transition-all ${
                formData.will_attend === true
                  ? 'border-[#9de09a] bg-[#d7ffd5] text-[#689666]'
                  : 'border-[#c2ffbf] bg-[#ffffff] text-[#85c283] hover:border-[#9de09a]'
              }`}
            >
              Hadir
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, will_attend: false })}
              className={`flex-1 py-3 rounded-2xl border-2 font-quicksand font-bold transition-all ${
                formData.will_attend === false
                  ? 'border-[#e09a9a] bg-[#ffd5d5] text-[#966666]'
                  : 'border-[#ffdbe7] bg-white text-[#d69393] hover:border-[#e09a9a]'
              }`}
            >
              Tidak Hadir
            </button>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={sending}
          className="w-full py-4 bg-[#DBA5B7] hover:bg-[#C88A9F] text-white font-quicksand font-bold rounded-2xl transition-all shadow-md flex items-center justify-center gap-2"
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
        <div className="space-y-4 max-h-[500px] pr-2">
          {messages.map((message, index) => (
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
              {message.will_attend !== null && (
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                  message.will_attend ? 'bg-[#FFF5F7] text-[#DBA5B7]' : 'bg-gray-100 text-gray-500'
                }`}>
                  {message.will_attend ? 'HADIR' : 'TIDAK HADIR'}
                </span>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}