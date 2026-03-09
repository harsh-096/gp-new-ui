import { useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useApp } from './context'
import { products, categories } from './data'

export default function ProductPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useApp()
  
  const product = products.find((p) => p.id === Number(id))
  
  const [selectedSize, setSelectedSize] = useState(0)
  const [selectedMaterial, setSelectedMaterial] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [sizeUnit, setSizeUnit] = useState<'mm' | 'ft'>('mm')
  const [artwork, setArtwork] = useState<string | null>(null)
  const [artworkName, setArtworkName] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-16 text-center">
        <h1 className="text-2xl font-bold text-[#111]">Product not found</h1>
        <button
          onClick={() => navigate('/shop')}
          className="mt-4 rounded bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
        >
          Back to Store
        </button>
      </div>
    )
  }

  const price =
    product.basePrice *
    product.sizes[selectedSize].priceMultiplier *
    product.materials[selectedMaterial].priceMultiplier *
    quantity

  const canAddToCart = !product.requiresArtwork || artwork !== null

  const handleAddToCart = () => {
    if (!canAddToCart) return
    
    addToCart({
      product,
      selectedSize,
      selectedMaterial,
      sizeUnit,
      quantity,
      artwork: artwork || undefined,
      artworkName: artworkName || undefined,
    })
    navigate('/cart')
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setArtwork(reader.result as string)
        setArtworkName(file.name)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveArtwork = () => {
    setArtwork(null)
    setArtworkName(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleReplaceArtwork = () => {
    fileInputRef.current?.click()
  }

  const category = categories.find((c) => c.id === product.parentCategory)
  const subCategory = category?.subcategories.find((s) => s.id === product.subCategory)

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-sm text-[#555]">
        <button onClick={() => navigate('/')} className="hover:text-[#111]">
          Home
        </button>
        <span>/</span>
        <button
          onClick={() => navigate(`/shop?category=${product.parentCategory}`)}
          className="hover:text-[#111]"
        >
          {category?.name}
        </button>
        <span>/</span>
        <span className="text-[#111]">{product.name}</span>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Product Image */}
        <div className="rounded-lg bg-white p-8 shadow-sm">
          <div className="flex aspect-square items-center justify-center overflow-hidden rounded-md bg-[#f5f5f7]">
            <img src={product.image} alt={product.name} className="h-full w-full object-contain" />
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="rounded bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
                {category?.name}
              </span>
              <span className="rounded bg-[#f5f5f7] px-2 py-1 text-xs font-medium text-[#555]">
                {subCategory?.name}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-[#111]">{product.name}</h1>
            <p className="mt-2 text-sm text-[#8a8a8f]">{product.code}</p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="text-3xl font-bold text-[#111]">£{price.toFixed(2)}</div>
            <p className="mt-1 text-sm text-[#555]">{product.description}</p>
          </div>

          {/* Size Selection with Dropdown and Unit Toggle */}
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <label className="block text-sm font-semibold text-[#111]">Size</label>
              <div className="flex rounded-lg border border-[#e5e5e7] overflow-hidden">
                <button
                  onClick={() => setSizeUnit('mm')}
                  className={`px-3 py-1 text-xs font-medium transition ${
                    sizeUnit === 'mm'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-[#555] hover:bg-[#f5f5f7]'
                  }`}
                >
                  mm
                </button>
                <button
                  onClick={() => setSizeUnit('ft')}
                  className={`px-3 py-1 text-xs font-medium transition ${
                    sizeUnit === 'ft'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-[#555] hover:bg-[#f5f5f7]'
                  }`}
                >
                  ft
                </button>
              </div>
            </div>
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(Number(e.target.value))}
              className="w-full rounded-lg border border-[#e5e5e7] px-4 py-3 text-sm text-[#111] focus:border-blue-600 focus:outline-none"
            >
              {product.sizes.map((size, index) => (
                <option key={index} value={index}>
                  {sizeUnit === 'mm' ? size.mm : size.ft}
                </option>
              ))}
            </select>
          </div>

          {/* Material Selection with Dropdown */}
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <label className="mb-3 block text-sm font-semibold text-[#111]">Material</label>
            <select
              value={selectedMaterial}
              onChange={(e) => setSelectedMaterial(Number(e.target.value))}
              className="w-full rounded-lg border border-[#e5e5e7] px-4 py-3 text-sm text-[#111] focus:border-blue-600 focus:outline-none"
            >
              {product.materials.map((material, index) => (
                <option key={index} value={index}>
                  {material.label}
                </option>
              ))}
            </select>
          </div>

          {/* Artwork Upload Section - Only for products that require it */}
          {product.requiresArtwork && (
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <label className="mb-3 block text-sm font-semibold text-[#111]">
                Upload Artwork <span className="text-red-600">*</span>
              </label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,.pdf,.ai,.psd"
                onChange={handleFileUpload}
                className="hidden"
              />
              
              {!artwork ? (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full rounded-lg border-2 border-dashed border-[#e5e5e7] p-6 text-center text-sm text-[#555] transition hover:border-blue-600 hover:text-blue-600"
                >
                  <svg
                    className="mx-auto mb-2 h-8 w-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <div className="font-medium">Click to upload</div>
                  <div className="text-xs mt-1">PDF, AI, PSD, JPG, PNG</div>
                  <div className="text-xs mt-2 text-red-600">Required to checkout</div>
                </button>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 rounded-lg border border-[#e5e5e7] p-3">
                    {artwork.startsWith('data:image') && (
                      <img src={artwork} alt="Preview" className="h-16 w-16 rounded object-cover" />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-[#111] truncate">{artworkName}</div>
                      <div className="text-xs text-[#555]">Artwork uploaded</div>
                    </div>
                    <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleReplaceArtwork}
                      className="flex-1 rounded bg-[#f5f5f7] px-4 py-2 text-sm font-medium text-[#111] hover:bg-[#e5e5e7]"
                    >
                      Replace
                    </button>
                    <button
                      onClick={handleRemoveArtwork}
                      className="flex-1 rounded bg-red-50 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Quantity */}
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <label className="mb-3 block text-sm font-semibold text-[#111]">Quantity</label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#e5e5e7] text-[#111] hover:bg-[#f5f5f7]"
              >
                −
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                className="h-10 w-20 rounded-lg border border-[#e5e5e7] text-center text-[#111]"
              />
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#e5e5e7] text-[#111] hover:bg-[#f5f5f7]"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            disabled={!canAddToCart}
            className={`w-full rounded-lg px-6 py-4 font-semibold text-white transition ${
              canAddToCart
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            {canAddToCart ? 'Add to Cart' : 'Artwork Required'}
          </button>

          {/* Features */}
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="mb-3 text-sm font-semibold text-[#111]">Features</h3>
            <ul className="space-y-2">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-[#555]">
                  <svg
                    className="mt-0.5 h-4 w-4 shrink-0 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
