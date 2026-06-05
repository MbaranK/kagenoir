import { prisma } from '@/lib/prisma'
import IlanKarti from '@/components/IlanKarti'
import { Package } from 'lucide-react'

const KATEGORILER = ['Tümü', 'El İşi', 'Giyim', 'Ev Eşyası', 'Antika', 'Porselen & Cam', 'Tablo & Sanat', 'Mücevher', 'Elektronik', 'Diğer']

export default async function AnaSayfa({
  searchParams,
}: {
  searchParams: Promise<{ kategori?: string; q?: string }>
}) {
  const params = await searchParams
  const kategori = params.kategori
  const q = params.q?.trim()

  const ilanlar = await prisma.ilan.findMany({
    where: {
      aktif: true,
      ...(kategori && kategori !== 'Tümü' ? { kategori } : {}),
      ...(q
        ? { OR: [{ baslik: { contains: q } }, { aciklama: { contains: q } }] }
        : {}),
    },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <>
      {/* Hero */}
      <div className="bg-stone-50 border-b border-stone-100 py-8 px-4 text-center">
        <h1 className="font-[var(--font-playfair)] text-3xl sm:text-5xl font-bold text-stone-800 mb-1">
          Cansın Antik
        </h1>
        <p className="text-stone-500 text-xs tracking-widest uppercase">
          Antika · Koleksiyon · Nadir Eserler
        </p>

        {/* Arama */}
        <form method="GET" className="mt-5 max-w-md mx-auto">
          <div className="relative">
            <input
              type="text"
              name="q"
              defaultValue={q}
              placeholder="İlan ara..."
              className="w-full pl-4 pr-12 py-3 rounded-xl border border-stone-200 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 text-sm bg-white shadow-sm"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-amber-600 transition-colors p-1"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </form>
      </div>

      <div className="max-w-6xl mx-auto px-3 py-6">
        {/* Kategori filtreleri — yatay kaydırma, scrollbar gizli */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {KATEGORILER.map((k) => (
            <a
              key={k}
              href={k === 'Tümü' ? '/' : `/?kategori=${encodeURIComponent(k)}`}
              className={`whitespace-nowrap flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                (k === 'Tümü' && !kategori) || kategori === k
                  ? 'bg-stone-800 text-white'
                  : 'bg-stone-100 text-stone-600 active:bg-stone-200'
              }`}
            >
              {k}
            </a>
          ))}
        </div>

        {/* İlanlar */}
        {ilanlar.length === 0 ? (
          <div className="text-center py-20 text-stone-400">
            <Package className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-base font-medium text-stone-500">Henüz ilan yok</p>
            <p className="text-sm mt-1">Arama kriterlerinize uygun ilan bulunamadı.</p>
          </div>
        ) : (
          <>
            <p className="text-xs text-stone-400 mb-3 uppercase tracking-wide">{ilanlar.length} ürün</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {ilanlar.map((ilan) => (
                <IlanKarti key={ilan.id} ilan={ilan} />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  )
}
