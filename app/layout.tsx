import type { Metadata, Viewport } from 'next'
import { Geist } from 'next/font/google'
import { Playfair_Display } from 'next/font/google'
import './globals.css'
import SakuraFalling from '@/components/SakuraFalling'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

export const metadata: Metadata = {
  title: 'Kagenoir Jewelery',
  description: 'Luxury bracelets and handmade jewelry pieces',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${geist.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-[#090d13] flex flex-col text-stone-100 relative" style={{ fontFamily: 'var(--font-geist), system-ui, sans-serif' }}>
        <SakuraFalling />
        <div className="relative z-0 flex flex-col min-h-screen bg-[#090d13]">
          <main className="flex-1 bg-[#090d13]">
            {children}
          </main>
          <footer className="text-center text-xs text-stone-600 py-6 mt-8 border-t border-stone-800 bg-[#090d13] backdrop-blur-sm">
            © 2026 Kagenoir Jewelry
          </footer>
        </div>
      </body>
    </html>
  )
}
