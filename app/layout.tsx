import type { Metadata, Viewport } from 'next'
import { Geist } from 'next/font/google'
import { Playfair_Display } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

export const metadata: Metadata = {
  title: 'Cansın Antik',
  description: 'Antika ve koleksiyon ürünleri',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${geist.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-white flex flex-col text-stone-900" style={{ fontFamily: 'var(--font-geist), system-ui, sans-serif' }}>
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <footer className="text-center text-xs text-stone-400 py-6 mt-8 border-t border-stone-100">
          © 2024 Cansın Antik
        </footer>
      </body>
    </html>
  )
}
