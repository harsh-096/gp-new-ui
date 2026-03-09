import { useState, useRef } from 'react'
import { useApp } from './context'

export default function OrdersPage() {
  const { orders, uploadArtwork } = useApp()
  const [selectedArtwork, setSelectedArtwork] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploadingFor, setUploadingFor] = useState<{ orderId: string; itemIndex: number } | null>(null)

  const handleFileUpload = (orderId: string, itemIndex: number) => {
    setUploadingFor({ orderId, itemIndex })
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && uploadingFor) {
      const reader = new FileReader()
      reader.onload = () => {
        uploadArtwork(uploadingFor.orderId, uploadingFor.itemIndex, reader.result as string, file.name)
        setUploadingFor(null)
      }
      reader.readAsDataURL(file)
    }
  }

  const allArtworks = orders.flatMap((order) =>
    order.items
      .filter((item) => item.artwork)
      .map((item) => ({
        orderId: order.id,
        artwork: item.artwork!,
        artworkName: item.artworkName || 'Untitled',
        productName: item.product.name,
      }))
  )

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <h1 className="mb-8 text-3xl font-bold text-[#111]">My Orders</h1>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,.pdf,.ai,.psd"
        onChange={handleFileChange}
        className="hidden"
      />

      {orders.length === 0 ? (
        <div className="rounded-lg bg-white p-12 text-center shadow-sm">
          <svg
            className="mx-auto mb-4 h-16 w-16 text-[#8a8a8f]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <h2 className="text-2xl font-bold text-[#111]">No orders yet</h2>
          <p className="mt-2 text-[#555]">Your orders will appear here once you make a purchase.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => {
            const sizeDisplay = (item: typeof order.items[0]) => 
              item.sizeUnit === 'mm' 
                ? item.product.sizes[item.selectedSize].mm 
                : item.product.sizes[item.selectedSize].ft

            return (
              <div key={order.id} className="overflow-hidden rounded-lg bg-white shadow-sm">
                {/* Order Header */}
                <div className="border-b border-[#e5e5e7] bg-[#f5f5f7] px-6 py-4">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <div className="text-sm text-[#555]">Order ID</div>
                      <div className="font-semibold text-[#111]">{order.id}</div>
                    </div>
                    <div>
                      <div className="text-sm text-[#555]">Date</div>
                      <div className="font-semibold text-[#111]">{order.date}</div>
                    </div>
                    <div>
                      <div className="text-sm text-[#555]">Total</div>
                      <div className="font-semibold text-[#111]">£{order.total.toFixed(2)}</div>
                    </div>
                    <div>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          order.status === 'completed'
                            ? 'bg-green-100 text-green-700'
                            : order.status === 'processing'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="divide-y divide-[#e5e5e7]">
                  {order.items.map((item, itemIndex) => {
                    const itemPrice =
                      item.product.basePrice *
                      item.product.sizes[item.selectedSize].priceMultiplier *
                      item.product.materials[item.selectedMaterial].priceMultiplier *
                      item.quantity

                    return (
                      <div key={itemIndex} className="p-6">
                        <div className="flex gap-6">
                          <div className="h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-[#f5f5f7]">
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="h-full w-full object-contain"
                            />
                          </div>

                          <div className="flex-1">
                            <h3 className="font-semibold text-[#111]">{item.product.name}</h3>
                            <p className="mt-1 text-sm text-[#555]">
                              Size: {sizeDisplay(item)}
                            </p>
                            <p className="text-sm text-[#555]">
                              Material: {item.product.materials[item.selectedMaterial].label}
                            </p>
                            <p className="text-sm text-[#555]">Quantity: {item.quantity}</p>
                            <p className="mt-2 font-semibold text-[#111]">£{itemPrice.toFixed(2)}</p>

                            {/* Artwork Status */}
                            <div className="mt-3">
                              {item.artwork ? (
                                <div className="flex items-center gap-3">
                                  <div className="flex items-center gap-2 rounded bg-green-50 px-3 py-1.5">
                                    <svg
                                      className="h-4 w-4 text-green-600"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 13l4 4L19 7"
                                      />
                                    </svg>
                                    <span className="text-sm font-medium text-green-700">
                                      Artwork: {item.artworkName}
                                    </span>
                                  </div>
                                  <button
                                    onClick={() => setSelectedArtwork(item.artwork!)}
                                    className="text-sm text-blue-600 hover:text-blue-700"
                                  >
                                    View Artwork
                                  </button>
                                </div>
                              ) : (
                                <button
                                  onClick={() => handleFileUpload(order.id, itemIndex)}
                                  className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                                >
                                  Upload Artwork
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Uploaded Artwork Grid */}
      {allArtworks.length > 0 && (
        <div className="mt-12">
          <h2 className="mb-6 text-2xl font-bold text-[#111]">Uploaded Artwork</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {allArtworks.map((art, index) => (
              <div key={index} className="overflow-hidden rounded-lg bg-white shadow-sm">
                <div
                  className="aspect-square cursor-pointer overflow-hidden bg-[#f5f5f7]"
                  onClick={() => setSelectedArtwork(art.artwork)}
                >
                  {art.artwork.startsWith('data:image') ? (
                    <img
                      src={art.artwork}
                      alt={art.artworkName}
                      className="h-full w-full object-cover transition hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <svg className="h-16 w-16 text-[#8a8a8f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="font-medium text-[#111]">{art.artworkName}</div>
                  <div className="text-sm text-[#555]">{art.productName}</div>
                  <div className="mt-1 text-xs text-[#8a8a8f]">Order: {art.orderId}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Artwork Modal */}
      {selectedArtwork && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setSelectedArtwork(null)}
        >
          <div className="relative max-h-[90vh] max-w-4xl overflow-hidden rounded-lg bg-white p-4">
            <button
              onClick={() => setSelectedArtwork(null)}
              className="absolute right-4 top-4 rounded-full bg-white p-2 shadow-lg hover:bg-[#f5f5f7]"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img
              src={selectedArtwork}
              alt="Artwork preview"
              className="max-h-[80vh] w-full object-contain"
            />
          </div>
        </div>
      )}
    </div>
  )
}
