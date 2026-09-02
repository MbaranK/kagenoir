'use client'

import { useEffect, useState } from 'react'
import { Package } from 'lucide-react'
import ProductCard from '@/components/ProductCard'
import ProductModal from '@/components/ProductModal'
import { PRODUCT_CATEGORIES } from '@/lib/productCategories'
import { useLanguage } from '@/components/LanguageProvider'

export type ShopItem = {
  id: string
  baslik: string
  aciklama: string
  fiyat: number
  kategori: string
  konum: string | null
  resimler: string
  aktif: boolean
  createdAt: Date | string
  updatedAt?: Date | string
  olculer?: string | null
  malzeme?: string | null
}

export default function ShopContent({ initialIlanlar }: { initialIlanlar: ShopItem[] }) {
  const { language } = useLanguage()
  const isTurkish = language === 'tr'
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedIlan, setSelectedIlan] = useState<ShopItem | null>(null)

  useEffect(() => {
    const mode = selectedCategory === 'Woman' ? 'pink' : selectedCategory === 'Male' ? 'black' : 'mixed'
    window.dispatchEvent(new CustomEvent('kagenoir-sakura-theme', { detail: { mode } }))
  }, [selectedCategory])

  const filteredIlanlar =
    selectedCategory === 'All'
      ? initialIlanlar
      : initialIlanlar.filter((ilan) => ilan.kategori === selectedCategory)

  return (
    <div className="mx-auto max-w-7xl px-3 py-4 sm:px-4 sm:py-8">
      <div className="mb-6 border-b border-stone-800 pb-6 sm:mb-8 sm:pb-8">
        <p className="text-[10px] font-light uppercase tracking-[0.3em] text-stone-500 sm:text-xs">{isTurkish ? 'Koleksiyon' : 'Collection'}</p>
        <h1 className="mt-2 font-[var(--font-playfair)] text-3xl font-light tracking-[-0.04em] text-stone-100 sm:text-4xl">
          {isTurkish ? 'Seçkin parçalar' : 'Curated pieces'}
        </h1>
      </div>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[240px_1fr] lg:gap-8">
      <aside className="mb-5 lg:mb-0 lg:py-2">
        <div className="lg:sticky lg:top-4">
          <div className="rounded-2xl border border-stone-700/60 bg-stone-900/40 p-4 backdrop-blur-sm sm:p-6">
            <h2 className="mb-4 text-[10px] font-light uppercase tracking-[0.24em] text-stone-300 sm:mb-6 sm:text-xs">
              {isTurkish ? 'Kategoriye göre filtrele' : 'Filter by category'}
            </h2>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1">
              {['All', ...PRODUCT_CATEGORIES].map((k) => {
                const isActive = selectedCategory === k
                const label = isTurkish
                  ? ({ All: 'Tümü', Male: 'Erkek', Woman: 'Kadın', 'Sakura Collection': 'Sakura Koleksiyonu', 'Shuriken Collection': 'Shuriken Koleksiyonu' }[k] ?? k)
                  : k
                return (
                  <button
                    key={k}
                    onClick={() => setSelectedCategory(k)}
                    className={`w-full text-left rounded-xl px-3 py-2.5 text-sm font-light tracking-wide transition-all sm:px-4 ${
                      isActive
                        ? 'border border-stone-600 bg-stone-700/60 text-stone-100'
                        : 'border border-stone-700/30 bg-transparent text-stone-400 hover:border-stone-600 hover:text-stone-300'
                    }`}
                  >
                    {label}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </aside>

      <main className="min-w-0">
        {filteredIlanlar.length === 0 ? (
          <div className="py-20 text-center text-stone-500">
            <Package className="mx-auto mb-3 h-12 w-12 opacity-40" />
            <p className="text-base font-light text-stone-400">{isTurkish ? 'Henüz parça yok' : 'No pieces available yet'}</p>
            <p className="mt-1 text-sm text-stone-600">{isTurkish ? 'Yeni koleksiyonlar için yakında tekrar uğrayın.' : 'Check back soon for new collections.'}</p>
          </div>
        ) : (
          <>
            <p className="mb-4 text-[10px] uppercase tracking-[0.24em] text-stone-500 sm:mb-6 sm:text-xs">
              {filteredIlanlar.length} {isTurkish ? 'parça mevcut' : filteredIlanlar.length === 1 ? 'piece available' : 'pieces available'}
            </p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5">
              {filteredIlanlar.map((ilan) => (
                <ProductCard
                  key={ilan.id}
                  ilan={ilan}
                  onViewDetails={() => setSelectedIlan(ilan)}
                />
              ))}
            </div>
          </>
        )}
      </main>

      {selectedIlan && (
        <ProductModal
          ilan={selectedIlan}
          onClose={() => setSelectedIlan(null)}
        />
      )}
      </div>
    </div>
  )
}
