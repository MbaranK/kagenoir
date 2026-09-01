import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Tag, ArrowLeft, CalendarDays, Ruler, Gem, ShieldCheck } from 'lucide-react'
import IletisimButonu from '@/components/IletisimButonu'
import { defaultBracelets } from '@/lib/bracelets'

export default async function IlanDetay({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const dbIlan = await prisma.ilan.findUnique({ where: { id } })
  const ilan = dbIlan ?? defaultBracelets.find((item) => item.id === id) ?? null

  if (!ilan || !ilan.aktif) notFound()

  const resimler: string[] = JSON.parse(ilan.resimler)
  const dimensions = typeof (ilan as any).olculer === 'string' ? (ilan as any).olculer : 'Standard fit'
  const material = typeof (ilan as any).malzeme === 'string' ? (ilan as any).malzeme : 'Premium finish'

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950">
      <div className="max-w-5xl mx-auto px-0 sm:px-4 py-0 sm:py-8">
        <div className="px-4 pt-4 sm:px-0 sm:pt-0">
          <Link href="/shop" className="inline-flex items-center gap-1.5 text-sm text-stone-400 hover:text-stone-200 mb-6 transition-colors font-light">
            <ArrowLeft className="w-4 h-4" />
            Back to collection
          </Link>
        </div>

        <div className="bg-stone-900/40 backdrop-blur-sm sm:rounded-[28px] sm:shadow-2xl sm:border sm:border-stone-700/60 overflow-hidden">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
            {/* Left: Images */}
            <div>
              {resimler.length > 0 ? (
                <>
                  <div className="aspect-[4/5] sm:aspect-[4/5] relative overflow-hidden bg-stone-800">
                    <Image
                      src={resimler[0]}
                      alt={ilan.baslik}
                      fill
                      className="object-cover"
                      priority
                      unoptimized={resimler[0].startsWith('/uploads/')}
                      sizes="(max-width: 640px) 100vw, 700px"
                    />
                  </div>
                  {resimler.length > 1 && (
                    <div className="flex gap-2 px-3 sm:px-4 py-3 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden bg-stone-800/50 border-t border-stone-700/50">
                      {resimler.map((url, i) => (
                        <div key={i} className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border border-stone-700/60 shadow-lg relative">
                          <Image src={url} alt="" fill className="object-cover" sizes="80px" unoptimized={url.startsWith('/uploads/')} />
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="aspect-[4/5] bg-stone-800 flex items-center justify-center text-stone-600">
                  <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
            </div>

            {/* Right: Details */}
            <div className="px-4 py-4 sm:px-6 sm:py-6 lg:px-7 lg:py-8">
              <div className="mb-4">
                <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-light tracking-[0.18em] sm:tracking-[0.22em] uppercase text-stone-400 bg-stone-800/50 rounded-full px-3 py-1.5">
                  <Tag className="w-3 h-3" />
                  {ilan.kategori}
                </span>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-light text-stone-100 leading-snug mt-4 mb-3">
                  {ilan.baslik}
                </h1>
                <div className="text-2xl sm:text-3xl font-light text-stone-300">
                  {ilan.fiyat.toLocaleString('tr-TR')} ₺
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-5 sm:mb-6">
                {ilan.konum && (
                  <span className="flex items-center gap-1 text-[11px] sm:text-xs bg-stone-800/50 text-stone-400 px-3 py-1.5 rounded-full font-light">
                    <MapPin className="w-3 h-3" />
                    {ilan.konum}
                  </span>
                )}
                <span className="flex items-center gap-1 text-[11px] sm:text-xs bg-stone-800/50 text-stone-500 px-3 py-1.5 rounded-full font-light">
                  <CalendarDays className="w-3 h-3" />
                  {new Date(ilan.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>

              <div className="space-y-3 sm:space-y-4 border-t border-stone-700/50 pt-4 sm:pt-5">
                <div className="flex items-center gap-3 rounded-xl bg-stone-800/30 p-3 border border-stone-700/40">
                  <div className="bg-stone-800/60 rounded-full p-2 text-stone-400 shrink-0">
                    <Ruler className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.18em] sm:tracking-[0.2em] text-stone-500 font-light">Dimensions</p>
                    <p className="text-sm font-light text-stone-300">{dimensions}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl bg-stone-800/30 p-3 border border-stone-700/40">
                  <div className="bg-stone-800/60 rounded-full p-2 text-stone-400 shrink-0">
                    <Gem className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.18em] sm:tracking-[0.2em] text-stone-500 font-light">Material</p>
                    <p className="text-sm font-light text-stone-300">{material}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl bg-stone-800/30 p-3 border border-stone-700/40">
                  <div className="bg-stone-800/60 rounded-full p-2 text-stone-400 shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.18em] sm:tracking-[0.2em] text-stone-500 font-light">Craftsmanship</p>
                    <p className="text-sm font-light text-stone-300">Hand-finished and quality checked</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-stone-700/50 pt-4 sm:pt-5 mt-5 sm:mt-6">
                <h2 className="text-[10px] sm:text-xs font-light text-stone-400 uppercase tracking-[0.18em] sm:tracking-wider mb-3">Product details</h2>
                <p className="text-stone-300 leading-relaxed text-sm font-light whitespace-pre-wrap">{ilan.aciklama}</p>
              </div>

              <IletisimButonu ilanBaslik={ilan.baslik} ilanId={ilan.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
