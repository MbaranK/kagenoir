import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Tag, ArrowLeft, CalendarDays } from 'lucide-react'
import IletisimButonu from '@/components/IletisimButonu'

export default async function IlanDetay({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const ilan = await prisma.ilan.findUnique({ where: { id } })

  if (!ilan || !ilan.aktif) notFound()

  const resimler: string[] = JSON.parse(ilan.resimler)

  return (
    <div className="max-w-2xl mx-auto px-0 sm:px-4 py-0 sm:py-8">
      {/* Geri butonu — mobilde padding'li */}
      <div className="px-4 pt-4 sm:px-0 sm:pt-0">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-stone-400 hover:text-amber-700 mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Tüm ilanlar
        </Link>
      </div>

      <div className="bg-white sm:rounded-2xl sm:shadow-sm sm:border sm:border-stone-100 overflow-hidden">
        {/* Ana fotoğraf */}
        {resimler.length > 0 ? (
          <div>
            <div className="aspect-square sm:aspect-[4/3] relative overflow-hidden bg-stone-50">
              <Image
                src={resimler[0]}
                alt={ilan.baslik}
                fill
                className="object-contain"
                priority
                unoptimized={resimler[0].startsWith('/uploads/')}
                sizes="(max-width: 640px) 100vw, 640px"
              />
            </div>
            {/* Küçük resimler */}
            {resimler.length > 1 && (
              <div className="flex gap-2 px-4 py-3 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden bg-stone-50 border-b border-stone-100">
                {resimler.map((url, i) => (
                  <div key={i} className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 border-white shadow-sm relative">
                    <Image src={url} alt="" fill className="object-cover" sizes="64px" unoptimized={url.startsWith('/uploads/')} />
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="aspect-square sm:aspect-[4/3] bg-stone-100 flex items-center justify-center text-stone-300">
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}

        <div className="px-4 py-5 sm:px-6 sm:py-6">
          {/* Başlık + Fiyat — mobilde alt alta */}
          <div className="mb-4">
            <h1 className="text-xl sm:text-2xl font-bold text-stone-900 leading-snug mb-2">
              {ilan.baslik}
            </h1>
            <div className="text-2xl font-bold text-amber-600">
              {ilan.fiyat.toLocaleString('tr-TR')} ₺
            </div>
          </div>

          {/* Etiketler */}
          <div className="flex flex-wrap gap-2 mb-5">
            <span className="flex items-center gap-1 text-xs bg-amber-50 text-amber-700 px-2.5 py-1 rounded-full">
              <Tag className="w-3 h-3" />
              {ilan.kategori}
            </span>
            {ilan.konum && (
              <span className="flex items-center gap-1 text-xs bg-stone-50 text-stone-600 px-2.5 py-1 rounded-full">
                <MapPin className="w-3 h-3" />
                {ilan.konum}
              </span>
            )}
            <span className="flex items-center gap-1 text-xs bg-stone-50 text-stone-500 px-2.5 py-1 rounded-full">
              <CalendarDays className="w-3 h-3" />
              {new Date(ilan.createdAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
          </div>

          {/* Açıklama */}
          <div className="border-t border-stone-100 pt-5">
            <h2 className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-3">Açıklama</h2>
            <p className="text-stone-700 leading-relaxed text-sm whitespace-pre-wrap">{ilan.aciklama}</p>
          </div>

          {/* İletişim */}
          <IletisimButonu />
        </div>
      </div>
    </div>
  )
}
