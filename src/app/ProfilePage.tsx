import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from './context'

export default function ProfilePage() {
  const { orders } = useApp()
  const navigate = useNavigate()
  const [isEditingProfile, setIsEditingProfile] = useState(false)

  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+44 7700 900000',
    company: 'Print Shop Ltd',
    address: '123 High Street, London, UK',
  })

  const [editData, setEditData] = useState(profileData)

  const handleSave = () => {
    setProfileData(editData)
    setIsEditingProfile(false)
  }

  const handleCancel = () => {
    setEditData(profileData)
    setIsEditingProfile(false)
  }

  const totalOrders = orders.length
  const pendingArtwork = orders.reduce(
    (count, order) => count + order.items.filter((item) => !item.artwork).length,
    0
  )
  const uploadedArtwork = orders.reduce(
    (count, order) => count + order.items.filter((item) => item.artwork).length,
    0
  )

  const recentOrders = orders.slice(0, 3)

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <h1 className="mb-8 text-3xl font-bold text-[#111]">My Profile</h1>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Information */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#111]">Profile Information</h2>
              {!isEditingProfile && (
                <button
                  onClick={() => setIsEditingProfile(true)}
                  className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                  Edit
                </button>
              )}
            </div>

            {isEditingProfile ? (
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-[#555]">Name</label>
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    className="w-full rounded-lg border border-[#e5e5e7] px-4 py-2 text-[#111] focus:border-blue-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-[#555]">Email</label>
                  <input
                    type="email"
                    value={editData.email}
                    onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                    className="w-full rounded-lg border border-[#e5e5e7] px-4 py-2 text-[#111] focus:border-blue-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-[#555]">Phone</label>
                  <input
                    type="tel"
                    value={editData.phone}
                    onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                    className="w-full rounded-lg border border-[#e5e5e7] px-4 py-2 text-[#111] focus:border-blue-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-[#555]">Company</label>
                  <input
                    type="text"
                    value={editData.company}
                    onChange={(e) => setEditData({ ...editData, company: e.target.value })}
                    className="w-full rounded-lg border border-[#e5e5e7] px-4 py-2 text-[#111] focus:border-blue-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-[#555]">Address</label>
                  <textarea
                    value={editData.address}
                    onChange={(e) => setEditData({ ...editData, address: e.target.value })}
                    rows={3}
                    className="w-full rounded-lg border border-[#e5e5e7] px-4 py-2 text-[#111] focus:border-blue-600 focus:outline-none"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={handleSave}
                    className="rounded bg-blue-600 px-6 py-2 font-medium text-white hover:bg-blue-700"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={handleCancel}
                    className="rounded border border-[#e5e5e7] px-6 py-2 font-medium text-[#111] hover:bg-[#f5f5f7]"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-[#555]">Name</div>
                  <div className="font-medium text-[#111]">{profileData.name}</div>
                </div>

                <div>
                  <div className="text-sm text-[#555]">Email</div>
                  <div className="font-medium text-[#111]">{profileData.email}</div>
                </div>

                <div>
                  <div className="text-sm text-[#555]">Phone</div>
                  <div className="font-medium text-[#111]">{profileData.phone}</div>
                </div>

                <div>
                  <div className="text-sm text-[#555]">Company</div>
                  <div className="font-medium text-[#111]">{profileData.company}</div>
                </div>

                <div>
                  <div className="text-sm text-[#555]">Address</div>
                  <div className="font-medium text-[#111]">{profileData.address}</div>
                </div>
              </div>
            )}
          </div>

          {/* Recent Orders */}
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#111]">Recent Orders</h2>
              {orders.length > 3 && (
                <button
                  onClick={() => navigate('/orders')}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  View All
                </button>
              )}
            </div>

            {recentOrders.length === 0 ? (
              <p className="text-center text-[#555]">No orders yet</p>
            ) : (
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between rounded-lg border border-[#e5e5e7] p-4 hover:bg-[#f5f5f7]"
                  >
                    <div>
                      <div className="font-medium text-[#111]">{order.id}</div>
                      <div className="text-sm text-[#555]">{order.date}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-[#111]">£{order.total.toFixed(2)}</div>
                      <span
                        className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${
                          order.status === 'completed'
                            ? 'bg-green-100 text-green-700'
                            : order.status === 'processing'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {orders.length > 0 && (
              <button
                onClick={() => navigate('/orders')}
                className="mt-4 w-full rounded-lg border border-blue-600 px-4 py-2 font-medium text-blue-600 hover:bg-blue-50"
              >
                View All Orders
              </button>
            )}
          </div>
        </div>

        {/* Stats Sidebar */}
        <div className="space-y-6">
          {/* Profile Stats */}
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-bold text-[#111]">Statistics</h2>
            <div className="space-y-4">
              <div className="rounded-lg bg-blue-50 p-4">
                <div className="text-2xl font-bold text-blue-700">{totalOrders}</div>
                <div className="text-sm text-blue-600">Total Orders</div>
              </div>

              <div className="rounded-lg bg-yellow-50 p-4">
                <div className="text-2xl font-bold text-yellow-700">{pendingArtwork}</div>
                <div className="text-sm text-yellow-600">Pending Artwork</div>
              </div>

              <div className="rounded-lg bg-green-50 p-4">
                <div className="text-2xl font-bold text-green-700">{uploadedArtwork}</div>
                <div className="text-sm text-green-600">Uploaded Artwork</div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-bold text-[#111]">Quick Actions</h2>
            <div className="space-y-3">
              <button
                onClick={() => navigate('/shop')}
                className="w-full rounded-lg border border-[#e5e5e7] px-4 py-3 text-left text-sm font-medium text-[#111] hover:bg-[#f5f5f7]"
              >
                <div className="flex items-center gap-3">
                  <svg className="h-5 w-5 text-[#555]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  Browse Products
                </div>
              </button>

              <button
                onClick={() => navigate('/orders')}
                className="w-full rounded-lg border border-[#e5e5e7] px-4 py-3 text-left text-sm font-medium text-[#111] hover:bg-[#f5f5f7]"
              >
                <div className="flex items-center gap-3">
                  <svg className="h-5 w-5 text-[#555]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  View My Orders
                </div>
              </button>

              {pendingArtwork > 0 && (
                <button
                  onClick={() => navigate('/orders')}
                  className="w-full rounded-lg bg-yellow-50 px-4 py-3 text-left text-sm font-medium text-yellow-700 hover:bg-yellow-100"
                >
                  <div className="flex items-center gap-3">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    Upload Pending Artwork
                  </div>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
