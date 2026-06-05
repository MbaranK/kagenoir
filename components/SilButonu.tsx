'use client'

import { ilanSil } from '@/app/actions/ilanlar'
import { Trash2 } from 'lucide-react'

export default function SilButonu({ ilanId }: { ilanId: string }) {
  return (
    <form
      action={ilanSil.bind(null, ilanId)}
      onSubmit={(e) => {
        if (!confirm('Bu ilanı silmek istediğinize emin misiniz?')) {
          e.preventDefault()
        }
      }}
    >
      <button
        type="submit"
        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        title="Sil"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </form>
  )
}
