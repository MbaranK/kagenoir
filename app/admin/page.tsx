import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import Image from 'next/image'
import { ilanDurumDegistir } from '@/app/actions/ilanlar'
import SilButonu from '@/components/SilButonu'
import { PlusCircle, Pencil, Eye, EyeOff, Package } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function AdminSayfa() {
  const ilanlar = await prisma.ilan.findMany({ orderBy: { createdAt: 'desc' } })

  return (
    <div className="max-w-3xl mx-auto px-3 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-stone-900">İlanlarım</h1>
          <p className="text-xs text-stone-500 mt-0.5">{ilanlar.length} ilan</p>
        </div>
        <Link
          href="/admin/yeni"
          className="flex items-center gap-1.5 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Yeni İlan</span>
        </Link>
      </div>

      {ilanlar.length === 0 ? (
        <div className="text-center py-20 text-stone-400">
          <Package className="w-12 h-12 mx-auto mb-3 opacity-40" />
          <p className="text-base font-medium">Henüz ilan yok</p>
          <p className="text-sm mt-1">İlk ilanınızı ekleyin.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {ilanlar.map((ilan) => {
            const resimler: string[] = JSON.parse(ilan.resimler)
            return (
              <div
                key={ilan.id}
                className={`bg-white rounded-xl border border-stone-100 p-3 flex items-center gap-3 ${!ilan.aktif ? 'opacity-50' : ''}`}
              >
                {/* Resim */}
                <div className="w-14 h-14 flex-shrink-0 rounded-lg overflow-hidden bg-stone-50 relative">
                  {resimler[0] ? (
                    <Image src={resimler[0]} alt="" fill className="object-cover" sizes="56px" unoptimized={resimler[0].startsWith('/uploads/')} />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-stone-300">
                      <Package className="w-5 h-5" />
                    </div>
                  )}
                </div>

                {/* Bilgiler */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <h3 className="font-medium text-stone-800 text-sm truncate">{ilan.baslik}</h3>
                    {!ilan.aktif && (
                      <span className="text-[10px] bg-stone-100 text-stone-500 px-1.5 py-0.5 rounded-full flex-shrink-0">Pasif</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-amber-700 font-bold text-sm">{ilan.fiyat.toLocaleString('tr-TR')} ₺</span>
                    <span className="text-stone-400 text-xs truncate">{ilan.kategori}</span>
                  </div>
                </div>

                {/* Aksiyonlar — büyük dokunma alanları */}
                <div className="flex items-center flex-shrink-0">
                  <Link href={`/ilan/${ilan.id}`} className="p-2.5 text-stone-400 hover:text-stone-600 rounded-lg" title="Görüntüle">
                    <Eye className="w-4 h-4" />
                  </Link>
                  <Link href={`/admin/duzenle/${ilan.id}`} className="p-2.5 text-stone-400 hover:text-amber-600 rounded-lg" title="Düzenle">
                    <Pencil className="w-4 h-4" />
                  </Link>
                  <form action={ilanDurumDegistir.bind(null, ilan.id, !ilan.aktif)}>
                    <button type="submit" className="p-2.5 text-stone-400 hover:text-blue-600 rounded-lg" title={ilan.aktif ? 'Pasife al' : 'Aktif et'}>
                      {ilan.aktif ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </form>
                  <SilButonu ilanId={ilan.id} />
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
