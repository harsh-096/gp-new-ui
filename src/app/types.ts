export type SizeOption = {
  mm: string
  ft: string
  priceMultiplier: number
}

export type Category = {
  id: string
  name: string
  subcategories: { id: string; name: string }[]
}

export type Product = {
  id: number
  code: string
  name: string
  parentCategory: string
  subCategory: string
  description: string
  image: string
  basePrice: number
  sizes: SizeOption[]
  materials: { label: string; priceMultiplier: number }[]
  features: string[]
  requiresArtwork: boolean
}

export type CartItem = {
  product: Product
  selectedSize: number
  selectedMaterial: number
  sizeUnit: 'mm' | 'ft'
  quantity: number
  artwork?: string
  artworkName?: string
}

export type Order = {
  id: string
  items: CartItem[]
  total: number
  status: 'pending' | 'processing' | 'completed'
  date: string
  artworkUploaded: boolean
}
