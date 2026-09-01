'use client'

import { useEffect, useState } from 'react'
import { Package } from 'lucide-react'
import ProductCard from '@/components/ProductCard'
import ProductModal from '@/components/ProductModal'
import { PRODUCT_CATEGORIES } from '@/lib/productCategories'

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
    <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8">
      <aside className="lg:py-2">
        <div className="sticky top-4">
          <div className="rounded-xl border border-stone-700/60 bg-stone-900/40 p-6 backdrop-blur-sm">
            <h2 className="text-sm font-light uppercase tracking-[0.3em] text-stone-300 mb-6">Filter by category</h2>

            <div className="space-y-2">
              {['All', ...PRODUCT_CATEGORIES].map((k) => {
                const isActive = selectedCategory === k
                return (
                  <button
                    key={k}
                    onClick={() => setSelectedCategory(k)}
                    className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-light tracking-wide transition-all ${
                      isActive
                        ? 'bg-stone-700/60 text-stone-100 border border-stone-600'
                        : 'bg-transparent text-stone-400 border border-stone-700/30 hover:border-stone-600 hover:text-stone-300'
                    }`}
                  >
                    {k}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </aside>

      <main>
        {filteredIlanlar.length === 0 ? (
          <div className="text-center py-20 text-stone-500">
            <Package className="w-12 h-12 mx-auto mb-3 opacity-40" />
            <p className="text-base font-light text-stone-400">No pieces available yet</p>
            <p className="text-sm mt-1 text-stone-600">Check back soon for new collections.</p>
          </div>
        ) : (
          <>
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.24em] text-stone-500 mb-6">
              {filteredIlanlar.length} {filteredIlanlar.length === 1 ? 'piece' : 'pieces'} available
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-5">
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
  )
}
