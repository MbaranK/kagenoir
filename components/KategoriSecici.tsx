'use client'

import { useState } from 'react'

const SABIT_KATEGORILER = ['El İşi', 'Giyim', 'Ev Eşyası', 'Antika', 'Porselen & Cam', 'Tablo & Sanat', 'Mücevher', 'Elektronik', 'Diğer']

export default function KategoriSecici({ defaultValue }: { defaultValue?: string }) {
  const baslangicOzel = !!defaultValue && !SABIT_KATEGORILER.includes(defaultValue)
  const [ozel, setOzel] = useState(baslangicOzel)
  const [deger, setDeger] = useState(defaultValue ?? '')

  return (
    <div className="space-y-2">
      <select
        onChange={(e) => {
          if (e.target.value === '__ozel__') {
            setOzel(true)
            setDeger('')
          } else {
            setOzel(false)
            setDeger(e.target.value)
          }
        }}
        defaultValue={baslangicOzel ? '__ozel__' : (defaultValue ?? '')}
        className="w-full px-4 py-2.5 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 bg-white"
      >
        <option value="">Seçin</option>
        {SABIT_KATEGORILER.map((k) => (
          <option key={k} value={k}>{k}</option>
        ))}
        <option value="__ozel__">+ Yeni kategori yaz...</option>
      </select>

      {ozel ? (
        <input
          name="kategori"
          required
          type="text"
          value={deger}
          onChange={(e) => setDeger(e.target.value)}
          placeholder="Kategori adını yazın (örn: Halı & Kilim)"
          autoFocus
          className="w-full px-4 py-2.5 border border-amber-300 rounded-xl text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
        />
      ) : (
        <input type="hidden" name="kategori" value={deger} />
      )}
    </div>
  )
}
