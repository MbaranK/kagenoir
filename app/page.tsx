import Link from 'next/link'
import { Camera, Music2 } from 'lucide-react'

function KaghenoirLogo() {
  return (
    <div className="logo-glow-wrapper">
      <svg viewBox="0 0 300 400" className="h-52 w-52 drop-shadow-2xl sm:h-64 sm:w-64 lg:h-72 lg:w-72">
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
      <div className="grid min-h-screen grid-cols-1 gap-5 px-4 py-5 sm:px-6 lg:grid-cols-3 lg:gap-0 lg:px-6 lg:py-8">
        <aside className="flex items-center justify-center lg:px-6 lg:py-8">
          <div className="w-full max-w-sm rounded-[28px] border border-stone-700/60 bg-stone-900/40 p-5 shadow-2xl backdrop-blur-md sm:max-w-md lg:max-w-full lg:p-8">
            <p className="text-[10px] font-light uppercase tracking-[0.4em] text-stone-400 sm:text-[11px]">Follow us</p>
            <div className="mt-5 space-y-3 sm:mt-8 sm:space-y-4">
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

        <main className="order-[-1] flex items-center justify-center px-2 py-4 text-center sm:px-4 lg:order-none lg:px-6 lg:py-8">
          <div className="flex flex-col items-center gap-4 sm:gap-6 lg:gap-8">
            <p className="text-[9px] font-light uppercase tracking-[0.45em] text-stone-500 sm:text-[10px] lg:text-[10px]">
              Silver jewelry atelier
            </p>

            <KaghenoirLogo />

            <p className="mx-auto max-w-xs text-xs font-light leading-relaxed text-stone-400 sm:max-w-sm sm:text-sm">
              Hand-finished silver bracelets, sculpted for those who walk between two worlds—where the light does not reach.
            </p>

            <p className="text-[8px] uppercase tracking-[0.3em] text-stone-600 sm:text-[9px]">
              Est. Istanbul
            </p>
          </div>
        </main>

        <aside className="flex items-center justify-center lg:px-6 lg:py-8">
          <div className="flex w-full max-w-sm flex-col items-center gap-5 rounded-[28px] border border-stone-700/60 bg-stone-900/40 px-6 py-6 text-center shadow-2xl backdrop-blur-md sm:max-w-md lg:max-w-full lg:gap-8 lg:px-8 lg:py-8">
            <div>
              <p className="text-[10px] font-light uppercase tracking-[0.4em] text-stone-400 sm:text-[11px]">Curated</p>
              <p className="mt-1 text-[10px] font-light uppercase tracking-[0.4em] text-stone-400 sm:text-[11px]">pieces</p>
            </div>
            <Link
              href="/shop"
              className="inline-flex items-center justify-center rounded-full border border-stone-700 bg-stone-800/30 px-7 py-3 text-[11px] font-light uppercase tracking-[0.28em] text-stone-300 transition hover:border-rose-600/50 hover:bg-rose-900/20 hover:text-rose-300 sm:px-8 sm:text-[12px]"
            >
              Shop
            </Link>
          </div>
        </aside>
      </div>
    </div>
  )
}
