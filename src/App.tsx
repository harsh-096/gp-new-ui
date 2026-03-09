import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppProvider } from './app/context'
import Layout from './app/Layout'
import HomePage from './app/HomePage'
import StorePage from './app/StorePage'
import ProductPage from './app/ProductPage'
import CartPage from './app/CartPage'
import OrdersPage from './app/OrdersPage'
import ProfilePage from './app/ProfilePage'

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<StorePage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}

export default App
