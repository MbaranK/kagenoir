import Link from 'next/link'
import Image from 'next/image'

interface IlanKartiProps {
  ilan: {
    id: string
    baslik: string
    fiyat: number
    kategori: string
    konum: string | null
    resimler: string
  }
}

export default function IlanKarti({ ilan }: IlanKartiProps) {
  const resimler: string[] = JSON.parse(ilan.resimler)
  const kapakResim = resimler[0] || null

  return (
    <Link href={`/ilan/${ilan.id}`} className="group block active:scale-[0.98] transition-transform">
      <div className="bg-white rounded-xl overflow-hidden border border-stone-100 hover:border-stone-300 hover:shadow-md transition-all duration-200">
        <div className="aspect-square bg-stone-50 relative overflow-hidden">
          {kapakResim ? (
            <Image
              src={kapakResim}
              alt={ilan.baslik}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              unoptimized={kapakResim.startsWith('/uploads/')}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-stone-200">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
        </div>

        <div className="p-2 sm:p-2.5">
          <p className="text-[9px] sm:text-[10px] font-medium text-amber-600 uppercase tracking-wide mb-0.5 truncate">{ilan.kategori}</p>
          <h3 className="font-medium text-stone-800 text-[11px] sm:text-xs leading-snug line-clamp-2 mb-1.5 min-h-[2.5em]">
            {ilan.baslik}
          </h3>
          <span className="text-xs sm:text-sm font-bold text-stone-900">
            {ilan.fiyat.toLocaleString('tr-TR')} ₺
          </span>
        </div>
      </div>
    </Link>
  )
}
