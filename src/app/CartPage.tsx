import { useNavigate } from 'react-router-dom'
import { useApp } from './context'

export default function CartPage() {
  const { cart, removeFromCart, checkout } = useApp()
  const navigate = useNavigate()

  const total = cart.reduce((sum, item) => {
    const price =
      item.product.basePrice *
      item.product.sizes[item.selectedSize].priceMultiplier *
      item.product.materials[item.selectedMaterial].priceMultiplier *
      item.quantity
    return sum + price
  }, 0)

  // Check if any items require artwork but don't have it
  const hasItemsWithoutArtwork = cart.some(
    (item) => item.product.requiresArtwork && !item.artwork
  )

  const canCheckout = !hasItemsWithoutArtwork

  const handleCheckout = () => {
    if (!canCheckout) return
    checkout()
    navigate('/orders')
  }

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-16">
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
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
          <h2 className="text-2xl font-bold text-[#111]">Your cart is empty</h2>
          <p className="mt-2 text-[#555]">Add some products to get started!</p>
          <button
            onClick={() => navigate('/shop')}
            className="mt-6 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <h1 className="mb-8 text-3xl font-bold text-[#111]">Shopping Cart</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item, index) => {
            const itemPrice =
              item.product.basePrice *
              item.product.sizes[item.selectedSize].priceMultiplier *
              item.product.materials[item.selectedMaterial].priceMultiplier *
              item.quantity

            const sizeDisplay = item.sizeUnit === 'mm' 
              ? item.product.sizes[item.selectedSize].mm 
              : item.product.sizes[item.selectedSize].ft

            return (
              <div key={index} className="rounded-lg bg-white p-6 shadow-sm">
                <div className="flex gap-6">
                  <div className="h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-[#f5f5f7]">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="h-full w-full object-contain"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-[#111]">{item.product.name}</h3>
                        <p className="mt-1 text-sm text-[#555]">
                          Size: {sizeDisplay}
                        </p>
                        <p className="text-sm text-[#555]">
                          Material: {item.product.materials[item.selectedMaterial].label}
                        </p>
                        <p className="text-sm text-[#555]">Quantity: {item.quantity}</p>
                        {item.product.requiresArtwork && !item.artworkName && (
                          <div className="mt-2 flex items-center gap-2">
                            <svg className="h-4 w-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            <span className="text-xs font-medium text-red-600">Artwork required</span>
                          </div>
                        )}
                        {item.artworkName && (
                          <div className="mt-2 flex items-center gap-2">
                            <svg className="h-4 w-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-xs text-green-600">Artwork: {item.artworkName}</span>
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-[#111]">£{itemPrice.toFixed(2)}</div>
                        <button
                          onClick={() => removeFromCart(index)}
                          className="mt-2 text-sm text-red-600 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-lg bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-bold text-[#111]">Order Summary</h2>
            
            <div className="space-y-3 border-b border-[#e5e5e7] pb-4">
              <div className="flex justify-between text-sm">
                <span className="text-[#555]">Subtotal</span>
                <span className="font-semibold text-[#111]">£{total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#555]">Shipping</span>
                <span className="font-semibold text-green-600">FREE</span>
              </div>
            </div>

            <div className="mt-4 flex justify-between">
              <span className="text-lg font-bold text-[#111]">Total</span>
              <span className="text-lg font-bold text-[#111]">£{total.toFixed(2)}</span>
            </div>

            {hasItemsWithoutArtwork && (
              <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
                <svg className="mb-1 inline h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span className="ml-1 font-medium">Some items require artwork to checkout</span>
              </div>
            )}

            <button
              onClick={handleCheckout}
              disabled={!canCheckout}
              className={`mt-6 w-full rounded-lg px-6 py-4 font-semibold text-white transition ${
                canCheckout
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              {canCheckout ? 'Proceed to Checkout' : 'Artwork Required'}
            </button>

            <button
              onClick={() => navigate('/shop')}
              className="mt-3 w-full rounded-lg border border-[#e5e5e7] px-6 py-3 font-medium text-[#111] hover:bg-[#f5f5f7]"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
