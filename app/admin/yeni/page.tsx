'use client'

import { useActionState, useState } from 'react'
import { ilanEkle } from '@/app/actions/ilanlar'
import ImageUpload from '@/components/ImageUpload'
import KategoriSecici from '@/components/KategoriSecici'
import Link from 'next/link'
import { ArrowLeft, Loader2 } from 'lucide-react'

export default function YeniIlanPage() {
  const [resimler, setResimler] = useState<string[]>([])
  const [error, action, pending] = useActionState(ilanEkle, null)

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <Link href="/admin" className="inline-flex items-center gap-1.5 text-sm text-stone-400 hover:text-stone-700 mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Geri dön
      </Link>

      <h1 className="text-2xl font-bold text-stone-900 mb-6">Yeni İlan Ekle</h1>

      <form action={action} className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6 space-y-5">
        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-2">Fotoğraflar</label>
          <ImageUpload value={resimler} onChange={setResimler} />
          <input type="hidden" name="resimler" value={JSON.stringify(resimler)} />
        </div>

        <div>
          <label htmlFor="baslik" className="block text-sm font-medium text-stone-700 mb-1.5">
            Başlık <span className="text-red-400">*</span>
          </label>
          <input
            id="baslik"
            name="baslik"
            type="text"
            required
            maxLength={100}
            className="w-full px-4 py-2.5 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
            placeholder="Ürün başlığı"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="fiyat" className="block text-sm font-medium text-stone-700 mb-1.5">
              Fiyat (₺) <span className="text-red-400">*</span>
            </label>
            <input
              id="fiyat"
              name="fiyat"
              type="number"
              required
              min="0"
              step="0.01"
              className="w-full px-4 py-2.5 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1.5">
              Kategori <span className="text-red-400">*</span>
            </label>
            <KategoriSecici />
          </div>
        </div>

        <div>
          <label htmlFor="konum" className="block text-sm font-medium text-stone-700 mb-1.5">
            Konum <span className="text-stone-400 font-normal">(isteğe bağlı)</span>
          </label>
          <input
            id="konum"
            name="konum"
            type="text"
            className="w-full px-4 py-2.5 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
            placeholder="İstanbul, Kadıköy..."
          />
        </div>

        <div>
          <label htmlFor="aciklama" className="block text-sm font-medium text-stone-700 mb-1.5">
            Açıklama <span className="text-red-400">*</span>
          </label>
          <textarea
            id="aciklama"
            name="aciklama"
            required
            rows={5}
            className="w-full px-4 py-2.5 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 resize-none"
            placeholder="Ürün hakkında detaylı bilgi..."
          />
        </div>

        <div className="flex gap-3 pt-2">
          <Link
            href="/admin"
            className="flex-1 text-center px-4 py-2.5 border border-stone-200 rounded-xl text-sm text-stone-600 hover:bg-stone-50 transition-colors"
          >
            İptal
          </Link>
          <button
            type="submit"
            disabled={pending}
            className="flex-1 bg-amber-600 hover:bg-amber-700 disabled:opacity-60 text-white font-medium py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            {pending && <Loader2 className="w-4 h-4 animate-spin" />}
            {pending ? 'Kaydediliyor...' : 'İlanı Yayınla'}
          </button>
        </div>
      </form>
    </div>
  )
}
