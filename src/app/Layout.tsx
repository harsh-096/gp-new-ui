import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { useApp } from './context'

export default function Layout() {
  const { cart } = useApp()
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      console.log('Search:', searchQuery)
    }
  }

  return (
    <div className="min-h-screen bg-[#f9f9f9]">
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        {/* Top Bar */}
        <div className="border-b border-[#e5e5e7]">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
            {/* Logo */}
            <NavLink to="/" className="shrink-0">
              <div className="text-2xl font-bold tracking-tight text-[#111]">
                Print Shop
              </div>
            </NavLink>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search"
                  className="w-full rounded-lg border border-[#e5e5e7] bg-white px-4 py-2.5 pr-10 text-sm text-[#111] placeholder-[#8a8a8f] focus:border-[#333] focus:outline-none"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8a8a8f] hover:text-[#111]"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
            </form>

            {/* Right Navigation */}
            <nav className="shrink-0">
              <ul className="flex items-center gap-6 text-sm">
                <li>
                  <button className="flex items-center gap-2 text-[#555] hover:text-[#111] transition-colors">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>Help</span>
                  </button>
                </li>

                <li>
                  <NavLink
                    to="/shop"
                    className={({ isActive }) =>
                      `flex items-center gap-2 transition-colors ${
                        isActive ? 'text-[#111] font-medium' : 'text-[#555] hover:text-[#111]'
                      }`
                    }
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <span>Shop</span>
                  </NavLink>
                </li>

                <li className="relative">
                  <NavLink
                    to="/cart"
                    className={({ isActive }) =>
                      `flex items-center gap-2 transition-colors ${
                        isActive ? 'text-[#111] font-medium' : 'text-[#555] hover:text-[#111]'
                      }`
                    }
                  >
                    <div className="relative">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                        />
                      </svg>
                      {cart.length > 0 && (
                        <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                          {cart.length}
                        </span>
                      )}
                    </div>
                    <span>Cart</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                      `flex items-center gap-2 transition-colors ${
                        isActive ? 'text-[#111] font-medium' : 'text-[#555] hover:text-[#111]'
                      }`
                    }
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <span>Profile</span>
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
        </div>

      </header>

      <main className="bg-[#f9f9f9]">
        <Outlet />
      </main>
    </div>
  )
}
