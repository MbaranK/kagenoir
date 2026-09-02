'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { useLanguage } from '@/components/LanguageProvider'

interface ProductModalProps {
  ilan: {
    id: string
    baslik: string
    fiyat: number
    kategori: string
    konum: string | null
    resimler: string
    aciklama: string
    createdAt: string | Date
    olculer?: string | null
    malzeme?: string | null
  }
  onClose: () => void
}

export default function ProductModal({ ilan, onClose }: ProductModalProps) {
  const { language } = useLanguage()
  const isTurkish = language === 'tr'
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const resimler: string[] = JSON.parse(ilan.resimler)
  const dimensions = typeof (ilan as any).olculer === 'string' ? (ilan as any).olculer : 'Standard fit'
  const material = typeof (ilan as any).malzeme === 'string' ? (ilan as any).malzeme : 'Premium finish'

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + resimler.length) % resimler.length)
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % resimler.length)
  }

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleEscape)
    }
  }, [onClose])

  if (!resimler.length) {
    return null
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/75 p-0 backdrop-blur-sm sm:items-center sm:p-5"
      onClick={onClose}
    >
      <div
        className="relative w-full max-h-[82vh] max-w-5xl overflow-hidden rounded-t-[24px] border border-stone-700/60 bg-stone-900/95 shadow-2xl sm:max-h-[92vh] sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-stone-800/80 text-stone-200 transition-colors hover:bg-stone-700"
          aria-label={isTurkish ? 'Pencereyi kapat' : 'Close popup'}
        >
          <X className="h-4 w-4" />
        </button>

        <div className="grid max-h-[82vh] grid-cols-1 overflow-hidden md:max-h-[92vh] md:grid-cols-[1.1fr_0.9fr]">
          <div className="relative h-[40vh] min-h-[260px] bg-stone-950 sm:h-[42vh] md:aspect-[4/5] md:h-auto">
            <Image
              src={resimler[currentImageIndex]}
              alt={ilan.baslik}
              fill
              className="object-cover"
              unoptimized={resimler[currentImageIndex].startsWith('/uploads/')}
              sizes="(max-width: 768px) 100vw, 700px"
              priority
            />

            {resimler.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-stone-900/70 text-stone-100 transition-colors hover:bg-stone-800"
                  aria-label={isTurkish ? 'Önceki görsel' : 'Previous image'}
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                <button
                  onClick={handleNextImage}
                  className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-stone-900/70 text-stone-100 transition-colors hover:bg-stone-800"
                  aria-label={isTurkish ? 'Sonraki görsel' : 'Next image'}
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}

            {resimler.length > 1 && (
              <div className="absolute bottom-3 left-3 rounded-full bg-stone-900/70 px-2.5 py-1 text-[10px] text-stone-200">
                {currentImageIndex + 1}/{resimler.length}
              </div>
            )}
          </div>

          <div className="flex max-h-[42vh] flex-col justify-between overflow-y-auto bg-stone-900/90 p-4 sm:max-h-none sm:p-6">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-stone-400">{isTurkish ? ({ Male: 'Erkek', Woman: 'Kadın', 'Sakura Collection': 'Sakura Koleksiyonu', 'Shuriken Collection': 'Shuriken Koleksiyonu' }[ilan.kategori] ?? ilan.kategori) : ilan.kategori}</p>
              <h2 className="mt-2 text-2xl font-light text-stone-100 sm:text-3xl">{ilan.baslik}</h2>

              <div className="mt-4 text-2xl font-light text-stone-200 sm:text-3xl">
                {ilan.fiyat.toLocaleString('tr-TR')} ₺
              </div>

              <div className="mt-6 space-y-3 border-t border-stone-700/60 pt-5">
                <div className="rounded-xl border border-stone-700/50 bg-stone-800/30 p-3">
                  <p className="text-[9px] uppercase tracking-[0.18em] text-stone-500">{isTurkish ? 'Ölçüler' : 'Dimensions'}</p>
                  <p className="mt-1 text-sm text-stone-200">{dimensions}</p>
                </div>

                <div className="rounded-xl border border-stone-700/50 bg-stone-800/30 p-3">
                  <p className="text-[9px] uppercase tracking-[0.18em] text-stone-500">{isTurkish ? 'Malzeme' : 'Material'}</p>
                  <p className="mt-1 text-sm text-stone-200">{material}</p>
                </div>
              </div>

              {ilan.aciklama && (
                <div className="mt-6 border-t border-stone-700/60 pt-5">
                  <p className="text-[9px] uppercase tracking-[0.18em] text-stone-500">{isTurkish ? 'Açıklama' : 'Description'}</p>
                  <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-stone-300">{ilan.aciklama}</p>
                </div>
              )}
            </div>

            <div className="mt-6">
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {resimler.map((url, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImageIndex(i)}
                    className={`relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg border transition-all ${
                      i === currentImageIndex ? 'border-stone-200' : 'border-stone-700 hover:border-stone-500'
                    }`}
                    aria-label={isTurkish ? `${i + 1}. görseli görüntüle` : `View image ${i + 1}`}
                  >
                    <Image
                      src={url}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="56px"
                      unoptimized={url.startsWith('/uploads/')}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
