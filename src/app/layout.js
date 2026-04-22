import './globals.css'

export const metadata = {
  title: 'Sandya & Kukuh - Undangan Pernikahan',
  description: 'Undangan pernikahan Sandya & Kukuh',
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover" />
      </head>
      {/* Warna bg-[#191b00] sekarang mencakup seluruh layar luar */}
      <body className="bg-[#191b00] flex items-center justify-center min-h-[100dvh] overflow-hidden">
        
        {/* Container Utama: 
            - Menggunakan min-h-[100dvh] agar selalu penuh ke bawah.
            - aspect-[9/16] tetap dijaga untuk proporsi desain.
        */}
        <div className="relative h-[100dvh] aspect-[9/16] w-auto max-w-full bg-[#191b00] shadow-2xl overflow-y-auto scrollbar-hide">
          <main className="w-full h-full">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}