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
      <body>
        {children}
      </body>
    </html>
  )
}


