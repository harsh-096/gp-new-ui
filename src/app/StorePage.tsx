import { Link, useSearchParams } from 'react-router-dom'
import { products, categories } from './data'

export default function StorePage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const categoryId = searchParams.get('category')
  const subCategoryId = searchParams.get('sub')

  const filteredProducts = products.filter((product) => {
    if (!categoryId) return true
    if (!subCategoryId) return product.parentCategory === categoryId
    return product.parentCategory === categoryId && product.subCategory === subCategoryId
  })

  const activeCategory = categories.find((c) => c.id === categoryId)

  const getPageTitle = () => {
    if (!categoryId) return 'All Products'
    if (!activeCategory) return 'All Products'
    if (!subCategoryId) return activeCategory.name
    const subCategory = activeCategory.subcategories.find((s) => s.id === subCategoryId)
    return subCategory ? subCategory.name : activeCategory.name
  }

  const handleCategoryClick = (catId: string) => {
    const params = new URLSearchParams()
    params.set('category', catId)
    setSearchParams(params)
  }

  const handleSubClick = (catId: string, subId: string) => {
    const params = new URLSearchParams()
    params.set('category', catId)
    params.set('sub', subId)
    setSearchParams(params)
  }

  const handleAllProducts = () => {
    setSearchParams({})
  }

  return (
    <div className="mx-auto flex max-w-7xl gap-0 px-6 py-8">
      {/* Left Sidebar */}
      <aside className="hidden w-64 shrink-0 md:block">
        <div className="sticky top-[120px] rounded-xl bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-[#888]">Categories</h2>

          <nav className="space-y-1">
            <button
              onClick={handleAllProducts}
              className={`w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium transition ${
                !categoryId
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-[#555] hover:bg-[#f5f5f7] hover:text-[#111]'
              }`}
            >
              All Products
            </button>

            {categories.map((category) => {
              const isActive = categoryId === category.id
              return (
                <div key={category.id}>
                  <button
                    onClick={() => handleCategoryClick(category.id)}
                    className={`w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium transition ${
                      isActive && !subCategoryId
                        ? 'bg-blue-50 text-blue-700'
                        : isActive
                          ? 'bg-[#f5f5f7] text-[#111]'
                          : 'text-[#555] hover:bg-[#f5f5f7] hover:text-[#111]'
                    }`}
                  >
                    {category.name}
                  </button>

                  {isActive && (
                    <div className="ml-3 mt-1 space-y-0.5 border-l-2 border-[#e5e5e7] pl-3">
                      {category.subcategories.map((sub) => (
                        <button
                          key={sub.id}
                          onClick={() => handleSubClick(category.id, sub.id)}
                          className={`w-full rounded-md px-3 py-2 text-left text-sm transition ${
                            subCategoryId === sub.id
                              ? 'bg-blue-50 font-medium text-blue-700'
                              : 'text-[#777] hover:bg-[#f5f5f7] hover:text-[#111]'
                          }`}
                        >
                          {sub.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </nav>
        </div>
      </aside>

      {/* Right Content */}
      <div className="min-w-0 flex-1 md:pl-8">
        {/* Breadcrumb */}
        <div className="mb-2 flex items-center gap-2 text-sm text-[#888]">
          <Link to="/" className="hover:text-[#111] transition-colors">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-[#111] transition-colors">Shop</Link>
          {activeCategory && (
            <>
              <span>/</span>
              <button
                onClick={() => handleCategoryClick(activeCategory.id)}
                className="hover:text-[#111] transition-colors"
              >
                {activeCategory.name}
              </button>
            </>
          )}
          {subCategoryId && activeCategory && (
            <>
              <span>/</span>
              <span className="text-[#111] font-medium">
                {activeCategory.subcategories.find((s) => s.id === subCategoryId)?.name}
              </span>
            </>
          )}
        </div>

        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-[#111]">{getPageTitle()}</h1>
          <p className="mt-1.5 text-sm text-[#555]">
            {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} available
          </p>
        </div>

        {/* Mobile Category Filter */}
        <div className="mb-6 md:hidden">
          <select
            value={categoryId || ''}
            onChange={(e) => {
              if (e.target.value) {
                handleCategoryClick(e.target.value)
              } else {
                handleAllProducts()
              }
            }}
            className="w-full rounded-lg border border-[#e5e5e7] bg-white px-4 py-2.5 text-sm text-[#111] focus:border-blue-500 focus:outline-none"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="flex flex-col items-center py-20 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#f5f5f7]">
              <svg className="h-8 w-8 text-[#ccc]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <p className="text-lg font-medium text-[#555]">No products found</p>
            <p className="mt-1 text-sm text-[#888]">Try selecting a different category</p>
          </div>
        )}
      </div>
    </div>
  )
}

function ProductCard({ product }: { product: (typeof products)[0] }) {
  const category = categories.find((c) => c.id === product.parentCategory)
  const subCategory = category?.subcategories.find((s) => s.id === product.subCategory)

  return (
    <Link
      to={`/product/${product.id}`}
      className="group block overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div className="flex aspect-square items-center justify-center overflow-hidden bg-[#f5f5f7] p-4">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4 space-y-2">
        <div className="text-xs text-[#8a8a8f]">{product.code}</div>
        <h3 className="font-semibold text-[#111] group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-[#f0f0f5] px-2.5 py-0.5 text-xs font-medium text-[#555]">
            {subCategory?.name}
          </span>
        </div>
        <div className="text-sm text-[#555]">
          From <span className="font-bold text-[#111]">£{product.basePrice.toFixed(2)}</span>
        </div>
        <div className="pt-1">
          <span className="inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700">
            View Product
          </span>
        </div>
      </div>
    </Link>
  )
}
