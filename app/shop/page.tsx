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
      <ShopContent initialIlanlar={ilanlar} />
    </div>
  )
}
