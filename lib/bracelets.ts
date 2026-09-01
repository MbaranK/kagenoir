export type BraceletListing = {
  id: string
  baslik: string
  aciklama: string
  fiyat: number
  kategori: string
  konum: string | null
  resimler: string
  aktif: boolean
  olculer?: string | null
  malzeme?: string | null
  createdAt: Date
  updatedAt: Date
}

export const defaultBracelets: BraceletListing[] = [
  {
    id: 'bracelet-rose-gold',
    baslik: 'Rose Gold Charm Bracelet',
    aciklama:
      'A refined rose gold bracelet with a delicate chain and subtle charm detailing. Designed for everyday elegance with a soft, polished finish that complements both casual and evening wear.',
    fiyat: 310,
    kategori: 'Woman',
    konum: 'Istanbul',
    resimler: JSON.stringify([
      'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1601821765780-754fa98637c1?auto=format&fit=crop&w=900&q=80',
    ]),
    aktif: true,
    olculer: '17 cm + 3 cm extension',
    malzeme: 'Rose gold plated brass',
    createdAt: new Date('2026-08-01T10:00:00.000Z'),
    updatedAt: new Date('2026-08-01T10:00:00.000Z'),
  },
  {
    id: 'bracelet-sapphire',
    baslik: 'Sapphire Halo Bracelet',
    aciklama:
      'Statement bracelet featuring a vibrant sapphire-toned centerpiece and soft metallic frame. It brings a luxe, polished look while keeping the silhouette light and wearable.',
    fiyat: 420,
    kategori: 'Sakura Collection',
    konum: 'London',
    resimler: JSON.stringify([
      'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=900&q=80',
    ]),
    aktif: true,
    olculer: '18 cm + 2 cm extension',
    malzeme: 'Sterling silver with sapphire accents',
    createdAt: new Date('2026-08-05T10:00:00.000Z'),
    updatedAt: new Date('2026-08-05T10:00:00.000Z'),
  },
  {
    id: 'bracelet-minimal',
    baslik: 'Minimal Pearl Bracelet',
    aciklama:
      'An understated pearl bracelet designed for elegant layering. The smooth finish and balanced proportions make it ideal for gifting or adding a refined accent to formal outfits.',
    fiyat: 290,
    kategori: 'Male',
    konum: 'Paris',
    resimler: JSON.stringify([
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=900&q=80',
    ]),
    aktif: true,
    olculer: '19 cm',
    malzeme: 'Pearl and silver finish',
    createdAt: new Date('2026-08-12T10:00:00.000Z'),
    updatedAt: new Date('2026-08-12T10:00:00.000Z'),
  },
]
