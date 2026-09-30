import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'yemo° | craft coffee',
  description: 'A new-gen cafe experience. Order by scanning your table.',
  icons: {
    icon: '/icons/yemo-logo-bg.png',
    shortcut: '/icons/yemo-logo-bg.png',
    apple: '/icons/yemo-logo-bg.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#FDFAF6',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icons/yemo-logo-bg.png" type="image/png" />
        <link rel="apple-touch-icon" href="/icons/yemo-logo-bg.png" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lily+Script+One&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" 
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}