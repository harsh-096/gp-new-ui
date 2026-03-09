import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { categories } from './data'

const categoryImages: Record<string, string> = {
  signages: '/images/roller-banners.png',
  'roller-banners': '/images/roller-banners.png',
  'print-materials': '/images/flyers.png',
  stationery: '/images/notepads.png',
}

const categoryDescriptions: Record<string, string> = {
  signages: 'Road signs, banners, hazard & safety signs',
  'roller-banners': 'Standard, premium, double-sided & wide format',
  'print-materials': 'Flyers, business cards, notepads & brochures',
  stationery: 'Letterheads, envelopes & folders',
}

export default function HomePage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setForm({ name: '', email: '', message: '' })
    setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 25% 50%, rgba(255,255,255,0.15) 0%, transparent 50%), radial-gradient(circle at 75% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
          }} />
        </div>
        <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-8 px-6 py-20 md:flex-row md:py-28">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
              Professional Printing <br />
              <span className="text-blue-400">Made Simple</span>
            </h1>
            <p className="mt-5 max-w-lg text-lg text-gray-300">
              From signage to stationery, get premium quality prints delivered to your door. Fast turnaround, competitive prices.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4 md:justify-start">
              <button
                onClick={() => navigate('/shop')}
                className="rounded-lg bg-blue-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 transition hover:bg-blue-700 hover:shadow-blue-600/40"
              >
                Browse Products
              </button>
              <a
                href="#contact"
                className="rounded-lg border border-white/20 bg-white/10 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                Contact Us
              </a>
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="absolute -inset-4 rounded-2xl bg-blue-500/20 blur-2xl" />
              <img
                src="/images/roller-banners.png"
                alt="Professional printing services"
                className="relative w-full rounded-2xl object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-[#f9f9f9] py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-[#111] md:text-4xl">Shop by Category</h2>
            <p className="mt-3 text-[#555]">Find exactly what you need from our wide range of products</p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => {
              const productCount = category.subcategories.length
              return (
                <button
                  key={category.id}
                  onClick={() => navigate(`/shop?category=${category.id}`)}
                  className="group relative flex flex-col overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl text-left"
                >
                  <div className="flex aspect-4/3 items-center justify-center bg-[#f0f0f5] p-6 transition-colors group-hover:bg-[#e8e8f0]">
                    <img
                      src={categoryImages[category.id] || '/images/roller-banners.png'}
                      alt={category.name}
                      className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-lg font-bold text-[#111] group-hover:text-blue-600 transition-colors">
                      {category.name}
                    </h3>
                    <p className="mt-1.5 text-sm text-[#777]">
                      {categoryDescriptions[category.id]}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
                        {productCount} subcategories
                      </span>
                      <svg
                        className="h-5 w-5 text-[#ccc] transition-all group-hover:translate-x-1 group-hover:text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="border-t border-[#e5e5e7] bg-white py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: 'M5 13l4 4L19 7', title: 'Premium Quality', desc: 'High-resolution prints with vibrant colors' },
              { icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', title: 'Fast Turnaround', desc: 'Same day and next day delivery options' },
              { icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', title: 'Best Prices', desc: 'Competitive pricing with bulk discounts' },
              { icon: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z', title: 'Expert Support', desc: 'Dedicated team to help with your orders' },
            ].map((feature) => (
              <div key={feature.title} className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50">
                  <svg className="h-7 w-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                  </svg>
                </div>
                <h3 className="font-semibold text-[#111]">{feature.title}</h3>
                <p className="mt-2 text-sm text-[#555]">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section id="contact" className="bg-[#f9f9f9] py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-[#111] md:text-4xl">Contact Us</h2>
              <p className="mt-3 text-[#555]">Have a question or need a custom quote? Get in touch with our team.</p>
            </div>

            <div className="overflow-hidden rounded-xl bg-white shadow-sm">
              <div className="grid md:grid-cols-5">
                {/* Contact Info */}
                <div className="bg-[#1a1a2e] p-8 text-white md:col-span-2">
                  <h3 className="text-lg font-semibold">Get in Touch</h3>
                  <p className="mt-2 text-sm text-gray-300">
                    We'd love to hear from you. Reach out using any method below.
                  </p>
                  <div className="mt-8 space-y-6">
                    <div className="flex items-start gap-3">
                      <svg className="mt-0.5 h-5 w-5 shrink-0 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <div>
                        <p className="text-sm font-medium">Email</p>
                        <p className="mt-1 text-sm text-gray-300">info@printshop.com</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg className="mt-0.5 h-5 w-5 shrink-0 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <div>
                        <p className="text-sm font-medium">Phone</p>
                        <p className="mt-1 text-sm text-gray-300">+44 (0) 123 456 7890</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg className="mt-0.5 h-5 w-5 shrink-0 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <div>
                        <p className="text-sm font-medium">Address</p>
                        <p className="mt-1 text-sm text-gray-300">123 Print Street, London, UK</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Form */}
                <div className="p-8 md:col-span-3">
                  {submitted ? (
                    <div className="flex h-full flex-col items-center justify-center py-8 text-center">
                      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                        <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-[#111]">Message Sent!</h3>
                      <p className="mt-2 text-sm text-[#555]">We'll get back to you within 24 hours.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div>
                        <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-[#333]">
                          Full Name
                        </label>
                        <input
                          id="name"
                          type="text"
                          required
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="w-full rounded-lg border border-[#e5e5e7] px-4 py-2.5 text-sm text-[#111] placeholder-[#aaa] focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-[#333]">
                          Email Address
                        </label>
                        <input
                          id="email"
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="w-full rounded-lg border border-[#e5e5e7] px-4 py-2.5 text-sm text-[#111] placeholder-[#aaa] focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="john@example.com"
                        />
                      </div>
                      <div>
                        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-[#333]">
                          Message
                        </label>
                        <textarea
                          id="message"
                          rows={4}
                          required
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          className="w-full resize-none rounded-lg border border-[#e5e5e7] px-4 py-2.5 text-sm text-[#111] placeholder-[#aaa] focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="Tell us about your project or ask a question..."
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                      >
                        Send Message
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#e5e5e7] bg-white py-8">
        <div className="mx-auto max-w-7xl px-6 text-center text-sm text-[#777]">
          &copy; {new Date().getFullYear()} Print Shop. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
