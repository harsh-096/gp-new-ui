import { createContext, useContext, useState, type ReactNode } from 'react'
import type { CartItem, Order } from './types'

type AppContextType = {
  cart: CartItem[]
  orders: Order[]
  addToCart: (item: CartItem) => void
  removeFromCart: (index: number) => void
  updateCartItem: (index: number, item: CartItem) => void
  clearCart: () => void
  checkout: () => void
  uploadArtwork: (orderId: string, itemIndex: number, file: string, fileName: string) => void
}

const AppContext = createContext<AppContextType | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [orders, setOrders] = useState<Order[]>([])

  const addToCart = (item: CartItem) => {
    setCart((prev) => [...prev, item])
  }

  const removeFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index))
  }

  const updateCartItem = (index: number, item: CartItem) => {
    setCart((prev) => prev.map((c, i) => (i === index ? item : c)))
  }

  const clearCart = () => {
    setCart([])
  }

  const checkout = () => {
    if (cart.length === 0) return

    const total = cart.reduce((sum, item) => {
      const price =
        item.product.basePrice *
        item.product.sizes[item.selectedSize].priceMultiplier *
        item.product.materials[item.selectedMaterial].priceMultiplier *
        item.quantity
      return sum + price
    }, 0)

    const newOrder: Order = {
      id: `ORD-${Date.now()}`,
      items: [...cart],
      total,
      status: 'pending',
      date: new Date().toLocaleDateString('en-GB'),
      artworkUploaded: false,
    }

    setOrders((prev) => [newOrder, ...prev])
    setCart([])
  }

  const uploadArtwork = (orderId: string, itemIndex: number, file: string, fileName: string) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id === orderId) {
          const updatedItems = order.items.map((item, i) =>
            i === itemIndex ? { ...item, artwork: file, artworkName: fileName } : item
          )
          const allUploaded = updatedItems.every((item) => item.artwork)
          return {
            ...order,
            items: updatedItems,
            artworkUploaded: allUploaded,
            status: allUploaded ? 'processing' : order.status,
          }
        }
        return order
      })
    )
  }

  return (
    <AppContext.Provider
      value={{
        cart,
        orders,
        addToCart,
        removeFromCart,
        updateCartItem,
        clearCart,
        checkout,
        uploadArtwork,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within AppProvider')
  }
  return context
}
