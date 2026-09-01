import { prisma } from '@/lib/prisma'
import { defaultBracelets } from '@/lib/bracelets'
import ShopContent from '@/components/ShopContent'

export default async function ShopPage() {
  let ilanlar = defaultBracelets

  const dbIlanlar = await prisma.ilan.findMany({
    where: { aktif: true },
    orderBy: { createdAt: 'desc' },
  })

  if (dbIlanlar.length > 0) {
    ilanlar = dbIlanlar
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950">
      <div className="border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
          <div>
            <p className="text-[10px] sm:text-xs font-light uppercase tracking-[0.3em] text-stone-500">Collection</p>
            <h1 className="mt-2 font-[var(--font-playfair)] text-3xl sm:text-4xl text-stone-100 tracking-[-0.04em] font-light">
              Curated pieces
            </h1>
          </div>
        </div>
      </div>

      <ShopContent initialIlanlar={ilanlar} />
    </div>
  )
}
