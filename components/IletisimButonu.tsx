'use client'

import { useState } from 'react'
import { Phone, MessageCircle, ChevronDown } from 'lucide-react'

const TELEFON = '05397641671'
const TELEFON_GOSTERIM = '0539 764 16 71'

export default function IletisimButonu() {
  const [acik, setAcik] = useState(false)

  return (
    <div className="mt-8 rounded-2xl border border-amber-200 overflow-hidden">
      <div className="bg-amber-50 px-5 py-4">
        <p className="text-sm font-semibold text-stone-700">Bu ürünle ilgileniyor musunuz?</p>
        <p className="text-xs text-stone-500 mt-0.5">Telefon veya WhatsApp ile ulaşabilirsiniz.</p>
      </div>

      {!acik ? (
        <div className="px-5 py-4 bg-white">
          <button
            onClick={() => setAcik(true)}
            className="w-full flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 rounded-xl transition-colors text-sm"
          >
            <Phone className="w-4 h-4" />
            İletişime Geç
            <ChevronDown className="w-4 h-4 ml-auto" />
          </button>
        </div>
      ) : (
        <div className="px-5 py-4 bg-white space-y-3">
          <p className="text-center text-xl font-bold text-stone-800 tracking-wide">
            {TELEFON_GOSTERIM}
          </p>
          <div className="grid grid-cols-2 gap-3">
            <a
              href={`tel:${TELEFON}`}
              className="flex items-center justify-center gap-2 bg-stone-800 hover:bg-stone-900 text-white py-2.5 rounded-xl text-sm font-medium transition-colors"
            >
              <Phone className="w-4 h-4" />
              Ara
            </a>
            <a
              href={`https://wa.me/90${TELEFON.slice(1)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-2.5 rounded-xl text-sm font-medium transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
