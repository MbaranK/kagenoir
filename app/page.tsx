import Link from 'next/link'
import { Camera, Music2 } from 'lucide-react'

function KaghenoirLogo() {
  return (
    <div className="logo-glow-wrapper">
      <svg viewBox="0 0 300 400" className="h-72 w-72 drop-shadow-2xl">
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.6" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <circle cx="150" cy="150" r="135" fill="none" stroke="#e8e0d5" strokeWidth="2" opacity="0.8" />
        <circle cx="150" cy="150" r="128" fill="none" stroke="#e8e0d5" strokeWidth="1" opacity="0.4" />
        <circle cx="150" cy="25" r="4" fill="#e8e0d5" opacity="0.7" />
        <circle cx="275" cy="150" r="4" fill="#e8e0d5" opacity="0.7" />
        <circle cx="25" cy="150" r="4" fill="#e8e0d5" opacity="0.7" />
        <circle cx="150" cy="275" r="4" fill="#e8e0d5" opacity="0.7" />

        <text
          x="150"
          y="165"
          fontSize="72"
          fontWeight="300"
          letterSpacing="8"
          textAnchor="middle"
          fill="#e8e0d5"
          fontFamily="'Playfair Display', serif"
          filter="url(#glow)"
        >
          KN
        </text>

      {/* Main text KAGENOIR */}
      <text
        x="150"
        y="340"
        fontSize="24"
        fontWeight="300"
        letterSpacing="8"
        textAnchor="middle"
        fill="#e8e0d5"
        fontFamily="'Playfair Display', serif"
        filter="url(#glow)"
      >
        KAGENOIR
      </text>

      {/* Diamond accent */}
        <g fill="#e8e0d5" opacity="0.6" filter="url(#glow)">
          <polygon points="150,305 153,310 150,315 147,310" />
        </g>
      </svg>
    </div>
  )
}

export default function AnaSayfa() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950">
      <div className="grid h-screen grid-cols-3 gap-0">
        {/* Left Column: Follow Us */}
        <aside className="flex items-center justify-center px-6 py-8">
          <div className="w-full rounded-[36px] border border-stone-700/60 bg-stone-900/40 p-8 shadow-2xl backdrop-blur-md">
            <p className="text-[11px] font-light uppercase tracking-[0.4em] text-stone-400">Follow us</p>
            <div className="mt-8 space-y-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between rounded-full border border-stone-700 bg-stone-800/30 px-4 py-3 text-sm font-light text-stone-300 transition hover:border-rose-600/50 hover:bg-rose-900/20 hover:text-rose-300"
              >
                <span className="flex items-center gap-3">
                  <Camera className="h-5 w-5" />
                  Instagram
                </span>
                <span className="text-xs text-stone-500 transition group-hover:text-rose-400">↗</span>
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between rounded-full border border-stone-700 bg-stone-800/30 px-4 py-3 text-sm font-light text-stone-300 transition hover:border-rose-600/50 hover:bg-rose-900/20 hover:text-rose-300"
              >
                <span className="flex items-center gap-3">
                  <Music2 className="h-5 w-5" />
                  TikTok
                </span>
                <span className="text-xs text-stone-500 transition group-hover:text-rose-400">↗</span>
              </a>
            </div>
          </div>
        </aside>

        {/* Middle Column: Kagenoir Logo */}
        <main className="flex items-center justify-center px-6 py-8 text-center">
          <div className="flex flex-col items-center gap-8">
            <p className="text-[10px] font-light uppercase tracking-[0.5em] text-stone-500">
              Silver jewelry atelier
            </p>

            <KaghenoirLogo />

            <p className="mx-auto max-w-sm text-sm font-light leading-relaxed text-stone-400">
              Hand-finished silver bracelets, sculpted for those who walk between two worlds—where the light does not reach.
            </p>
            
            <p className="text-[9px] uppercase tracking-[0.3em] text-stone-600">
              Est. Istanbul
            </p>
          </div>
        </main>

        {/* Right Column: Shop */}
        <aside className="flex items-center justify-center px-6 py-8">
          <div className="flex w-full flex-col items-center gap-8 rounded-[36px] border border-stone-700/60 bg-stone-900/40 px-8 py-8 text-center shadow-2xl backdrop-blur-md">
            <div>
              <p className="text-[11px] uppercase tracking-[0.4em] text-stone-400 font-light">Curated</p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.4em] text-stone-400 font-light">pieces</p>
            </div>
            <Link
              href="/shop"
              className="inline-flex items-center justify-center rounded-full border border-stone-700 bg-stone-800/30 px-8 py-3 text-[12px] font-light uppercase tracking-[0.28em] text-stone-300 transition hover:border-rose-600/50 hover:bg-rose-900/20 hover:text-rose-300"
            >
              Shop
            </Link>
          </div>
        </aside>
      </div>
    </div>
  )
}
