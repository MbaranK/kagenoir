'use client'

import Image from 'next/image'
import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

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

  return (
    <button
      onClick={onViewDetails}
      className="w-full group text-left active:scale-[0.98] transition-transform"
    >
      <div className="bg-stone-800/50 rounded-xl overflow-hidden border border-stone-700/60 hover:border-stone-600 hover:shadow-xl transition-all duration-200 backdrop-blur-sm cursor-pointer pointer-events-none">
        {/* Image Container */}
        <div className="aspect-square bg-stone-900 relative overflow-hidden">
          {currentImage ? (
            <Image
              src={currentImage}
              alt={ilan.baslik}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              unoptimized={currentImage.startsWith('/uploads/')}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-stone-600">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}

          {/* Arrow Navigation */}
          {resimler.length > 1 && (
            <>
              <div
                onClickCapture={(e) => {
                  e.stopPropagation()
                  e.preventDefault()
                  handlePrevImage(e)
                }}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-stone-900/60 hover:bg-stone-900 text-stone-200 hover:text-stone-100 p-1.5 rounded-full transition opacity-0 group-hover:opacity-100 backdrop-blur-sm cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5 pointer-events-none" />
              </div>

              <div
                onClickCapture={(e) => {
                  e.stopPropagation()
                  e.preventDefault()
                  handleNextImage(e)
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-stone-900/60 hover:bg-stone-900 text-stone-200 hover:text-stone-100 p-1.5 rounded-full transition opacity-0 group-hover:opacity-100 backdrop-blur-sm cursor-pointer"
              >
                <ChevronRight className="w-5 h-5 pointer-events-none" />
              </div>

              {/* Image Counter */}
              <div className="absolute bottom-2 right-2 bg-stone-900/60 backdrop-blur-sm px-2 py-1 rounded-full text-[10px] text-stone-300 pointer-events-none">
                {currentImageIndex + 1}/{resimler.length}
              </div>
            </>
          )}
        </div>

        {/* Info Section */}
        <div className="p-3 sm:p-3.5">
          <p className="text-[9px] sm:text-[10px] font-light text-stone-400 uppercase tracking-[0.2em] mb-1">
            {ilan.kategori}
          </p>
          <h3 className="font-light text-stone-100 text-[11px] sm:text-xs leading-snug line-clamp-2 mb-2 min-h-[2.5em]">
            {ilan.baslik}
          </h3>
          <span className="text-sm sm:text-base font-light text-stone-300">
            {ilan.fiyat.toLocaleString('tr-TR')} ₺
          </span>
        </div>
      </div>
    </button>
  )
}
