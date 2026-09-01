export const PRODUCT_CATEGORIES = [
  'Male',
  'Woman',
  'Sakura Collection',
  'Shuriken Collection',
] as const

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number]

export const SHOP_FILTERS = ['All', ...PRODUCT_CATEGORIES] as const
