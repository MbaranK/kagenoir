'use client'

import { useState } from 'react'
import { Send, CheckCircle, Loader2 } from 'lucide-react'

interface Props {
  ilanBaslik: string
  ilanId: string
}

export default function IletisimButonu({ ilanBaslik, ilanId }: Props) {
  const [ad, setAd] = useState('')
  const [telefon, setTelefon] = useState('')
  const [mesaj, setMesaj] = useState('')
  const [durum, setDurum] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle')

  async function gonder(e: React.FormEvent) {
    e.preventDefault()
    if (!mesaj.trim()) return
    setDurum('loading')
    try {
      const res = await fetch('/api/mesaj', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ad, telefon, mesaj, ilanBaslik, ilanId }),
      })
      setDurum(res.ok ? 'ok' : 'error')
    } catch {
      setDurum('error')
    }
  }

  return (
    <div className="mt-6 sm:mt-8 rounded-xl border border-stone-700/60 overflow-hidden bg-stone-800/40 backdrop-blur-sm">
      <div className="bg-stone-800/60 border-b border-stone-700/60 px-4 sm:px-5 py-3 sm:py-4">
        <p className="text-sm font-light text-stone-200">Interested in this piece?</p>
        <p className="text-[11px] sm:text-xs text-stone-400 mt-1 font-light">Leave a message and we'll get back to you.</p>
      </div>

      {durum === 'ok' ? (
        <div className="px-4 sm:px-5 py-6 bg-stone-800/30 flex flex-col items-center gap-2 text-center">
          <CheckCircle className="w-8 h-8 text-stone-300" />
          <p className="font-light text-stone-200">Message sent!</p>
          <p className="text-xs text-stone-500">We'll be in touch soon.</p>
        </div>
      ) : (
        <form onSubmit={gonder} className="px-4 sm:px-5 py-4 sm:py-5 bg-stone-800/20 space-y-3">
          <input
            type="text"
            placeholder="Your name (optional)"
            value={ad}
            onChange={e => setAd(e.target.value)}
            className="w-full border border-stone-700 bg-stone-800/40 rounded-lg px-3.5 py-2.5 text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:border-stone-600 focus:ring-2 focus:ring-stone-700/50 font-light backdrop-blur-sm"
          />
          <input
            type="tel"
            placeholder="Your phone (optional)"
            value={telefon}
            onChange={e => setTelefon(e.target.value)}
            className="w-full border border-stone-700 bg-stone-800/40 rounded-lg px-3.5 py-2.5 text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:border-stone-600 focus:ring-2 focus:ring-stone-700/50 font-light backdrop-blur-sm"
          />
          <textarea
            placeholder="Your message..."
            value={mesaj}
            onChange={e => setMesaj(e.target.value)}
            rows={4}
            required
            className="w-full border border-stone-700 bg-stone-800/40 rounded-lg px-3.5 py-2.5 text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:border-stone-600 focus:ring-2 focus:ring-stone-700/50 resize-none font-light backdrop-blur-sm"
          />
          {durum === 'error' && (
            <p className="text-xs text-rose-400 font-light">Error sending message, please try again.</p>
          )}
          <button
            type="submit"
            disabled={durum === 'loading' || !mesaj.trim()}
            className="w-full flex items-center justify-center gap-2 bg-stone-700 hover:bg-stone-600 disabled:opacity-50 text-stone-100 font-light py-2.5 rounded-lg transition-colors text-sm active:scale-[0.99]"
          >
            {durum === 'loading' ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            {durum === 'loading' ? 'Gönderiliyor...' : 'Mesaj Gönder'}
          </button>
        </form>
      )}
    </div>
  )
}
