'use client'

import Image from 'next/image'
import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useLanguage } from '@/components/LanguageProvider'

interface ProductCardProps {
  ilan: {
    id: string
    baslik: string
    fiyat: number
    kategori: string
    konum: string | null
    resimler: string
  }
  onViewDetails: () => void
}

export default function ProductCard({ ilan, onViewDetails }: ProductCardProps) {
  const { language } = useLanguage()
  const resimler: string[] = JSON.parse(ilan.resimler)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const handlePrevImage = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev - 1 + resimler.length) % resimler.length)
  }

  const handleNextImage = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev + 1) % resimler.length)
  }

  const currentImage = resimler[currentImageIndex] || null
  const categoryLabel = language === 'tr'
    ? ({ Male: 'Erkek', Woman: 'Kadın', 'Sakura Collection': 'Sakura Koleksiyonu', 'Shuriken Collection': 'Shuriken Koleksiyonu' }[ilan.kategori] ?? ilan.kategori)
    : ilan.kategori

  return (
    <button
      onClick={onViewDetails}
      className="group w-full text-left transition-transform active:scale-[0.98]"
      aria-label={`View details for ${ilan.baslik}`}
    >
      <div className="overflow-hidden rounded-[18px] border border-stone-700/60 bg-stone-800/50 backdrop-blur-sm transition-all duration-200 hover:border-stone-600 hover:shadow-xl">
        <div className="relative aspect-[4/3.6] overflow-hidden bg-stone-900 sm:aspect-[4/4.6]">
          {currentImage ? (
            <Image
              src={currentImage}
              alt={ilan.baslik}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              unoptimized={currentImage.startsWith('/uploads/')}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-stone-600">
              <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}

          {resimler.length > 1 && (
            <>
              <div
                onClickCapture={(e) => {
                  e.stopPropagation()
                  e.preventDefault()
                  handlePrevImage(e)
                }}
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-stone-900/60 p-1.5 text-stone-200 opacity-0 transition hover:bg-stone-900 hover:text-stone-100 group-hover:opacity-100"
              >
                <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>

              <div
                onClickCapture={(e) => {
                  e.stopPropagation()
                  e.preventDefault()
                  handleNextImage(e)
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-stone-900/60 p-1.5 text-stone-200 opacity-0 transition hover:bg-stone-900 hover:text-stone-100 group-hover:opacity-100"
              >
                <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>

              <div className="absolute bottom-2 right-2 rounded-full bg-stone-900/60 px-2 py-1 text-[10px] text-stone-300 backdrop-blur-sm">
                {currentImageIndex + 1}/{resimler.length}
              </div>
            </>
          )}
        </div>

        <div className="p-2 sm:p-3">
          <p className="mb-1 text-[8px] font-light uppercase tracking-[0.16em] text-stone-400 sm:text-[10px]">
            {categoryLabel}
          </p>
          <h3 className="mb-1.5 min-h-[2.1em] text-[10px] font-light leading-snug text-stone-100 sm:text-xs">
            {ilan.baslik}
          </h3>
          <span className="text-sm font-light text-stone-300 sm:text-base">
            {ilan.fiyat.toLocaleString('tr-TR')} ₺
          </span>
        </div>
      </div>
    </button>
  )
}
