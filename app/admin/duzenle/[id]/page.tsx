'use client'

import { useActionState, useState, useEffect } from 'react'
import { ilanGuncelle } from '@/app/actions/ilanlar'
import ImageUpload from '@/components/ImageUpload'
import KategoriSecici from '@/components/KategoriSecici'
import Link from 'next/link'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { use } from 'react'

interface IlanData {
  id: string
  baslik: string
  aciklama: string
  fiyat: number
  kategori: string
  konum: string | null
  resimler: string
  aktif: boolean
}

export default function DuzenleIlanPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [ilan, setIlan] = useState<IlanData | null>(null)
  const [resimler, setResimler] = useState<string[]>([])
  const [aktif, setAktif] = useState(true)

  const actionWithId = ilanGuncelle.bind(null, id)
  const [error, action, pending] = useActionState(actionWithId, null)

  useEffect(() => {
    fetch(`/api/ilanlar/${id}`)
      .then((r) => r.json())
      .then((data: IlanData) => {
        setIlan(data)
        setResimler(JSON.parse(data.resimler))
        setAktif(data.aktif)
      })
  }, [id])

  if (!ilan) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-6 h-6 animate-spin text-amber-500" />
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <Link href="/admin" className="inline-flex items-center gap-1.5 text-sm text-stone-400 hover:text-stone-700 mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Geri dön
      </Link>

      <h1 className="text-2xl font-bold text-stone-900 mb-6">İlanı Düzenle</h1>

      <form action={action} className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6 space-y-5">
        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 text-sm px-4 py-3 rounded-lg">{error}</div>
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
            defaultValue={ilan.baslik}
            className="w-full px-4 py-2.5 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
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
              defaultValue={ilan.fiyat}
              className="w-full px-4 py-2.5 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1.5">
              Kategori <span className="text-red-400">*</span>
            </label>
            <KategoriSecici defaultValue={ilan.kategori} />
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
            defaultValue={ilan.konum || ''}
            className="w-full px-4 py-2.5 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
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
            defaultValue={ilan.aciklama}
            className="w-full px-4 py-2.5 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 resize-none"
          />
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="aktif"
            checked={aktif}
            onChange={(e) => setAktif(e.target.checked)}
            className="w-4 h-4 accent-amber-600"
          />
          <label htmlFor="aktif" className="text-sm text-stone-700">Yayında (aktif)</label>
          <input type="hidden" name="aktif" value={String(aktif)} />
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
            {pending ? 'Kaydediliyor...' : 'Kaydet'}
          </button>
        </div>
      </form>
    </div>
  )
}
