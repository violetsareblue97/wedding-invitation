import './globals.css'

export const metadata = {
  title: 'Sandya & Kukuh - Undangan Pernikahan',
  description: 'Undangan pernikahan Sandya & Kukuh',
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </head>
      <body className="bg-[#191b00] flex items-center justify-center min-h-screen overflow-hidden">
        
        {/* Container Utama:
            - aspect-[9/16]: Menjaga proporsi HP.
            - h-screen: Mengikuti tinggi layar.
            - w-auto: Lebar menyesuaikan tinggi agar tetap 9:16.
            - max-w-full: Agar tidak meluber ke kanan jika di layar sangat lebar.
            - relative & overflow-y-auto: Agar konten di dalam bisa di-scroll.
        */}
        <div className="relative h-screen aspect-[9/16] w-auto max-w-full bg-white shadow-2xl overflow-y-auto scrollbar-hide">
          
          {/* Konten Website */}
          <main className="w-full min-h-full">
            {children}
          </main>

        </div>
      </body>
    </html>
  )
}