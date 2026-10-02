'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  SlidersHorizontal,
  RotateCcw,
  Sparkles,
  ShoppingBag,
  ArrowRight,
  Plus,
  Minus,
  Check,
} from 'lucide-react'

import {
  MENU_ITEMS,
  RECENT_ORDERS,
  CATEGORY_TABS,
  CATEGORY_HEADERS,
  MenuItem,
  MenuCategory,
  SubCategory,
} from '@/data/menuData'
import { useCartStore, Product } from '@/store/useCartStore'
import MenuProductCard from '@/components/menu/MenuProductCard'
import MenuFilterBottomSheet, { FilterState } from '@/components/menu/MenuFilterBottomSheet'
import ProductDetailModal from '@/components/menu/ProductDetailModal'
import AddToCartToast from '@/components/cart/AddToCartToast'
import MiniCartBar from '@/components/cart/MiniCartBar'
import CartDrawer from '@/components/cart/CartDrawer'

export default function MenuClient() {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [isReturningUser, setIsReturningUser] = useState(true)

  const [filters, setFilters] = useState<FilterState>({
    dietary: 'all',
    temperature: 'all',
    taste: 'all',
    price: 'all',
  })

  // Cart Store hooks
  const cartItems = useCartStore((state) => state.items)
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0)
  const openCart = useCartStore((state) => state.openCart)
  const addItem = useCartStore((state) => state.addItem)
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const openProductDetail = useCartStore((state) => state.openProductDetail)
  const isMenuFilterOpen = useCartStore((state) => state.isMenuFilterOpen)
  const setMenuFilterOpen = useCartStore((state) => state.setMenuFilterOpen)
  const tableNumber = useCartStore((state) => state.tableNumber)
  const isTableConfirmed = useCartStore((state) => state.isTableConfirmed)

  // Active filter count
  const activeFiltersCount = useMemo(() => {
    let count = 0
    if (filters.dietary !== 'all') count++
    if (filters.temperature !== 'all') count++
    if (filters.taste !== 'all') count++
    if (filters.price !== 'all') count++
    return count
  }, [filters])

  // Filtered menu items
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        const matches =
          item.name.toLowerCase().includes(q) ||
          item.desc.toLowerCase().includes(q) ||
          item.tasteNotes.toLowerCase().includes(q) ||
          (item.tag && item.tag.toLowerCase().includes(q))
        if (!matches) return false
      }

      // Dietary
      if (filters.dietary !== 'all' && item.dietary !== filters.dietary) {
        return false
      }

      // Temperature
      if (filters.temperature !== 'all' && item.temp !== filters.temperature) {
        return false
      }

      // Taste
      if (filters.taste !== 'all' && !item.taste.includes(filters.taste as any)) {
        return false
      }

      // Price
      if (filters.price === 'under200' && item.price >= 200) return false
      if (filters.price === '200to350' && (item.price < 200 || item.price > 350)) return false
      if (filters.price === '350plus' && item.price < 350) return false

      return true
    })
  }, [selectedCategory, searchQuery, filters])

  const handleQuickAdd = (e: React.MouseEvent, item: MenuItem) => {
    e.stopPropagation()
    const product: Product = {
      id: item.id,
      name: item.name,
      desc: item.desc,
      price: item.price,
      originalPrice: item.originalPrice,
      offer: item.offer,
      rating: item.rating,
      reviewsCount: item.reviewsCount,
      tag: item.tag,
      features: item.features,
      image: item.image,
      category: item.category,
      temp: item.temp,
    }
    addItem(product, 'Regular', [])
  }

  const handleOpenDetail = (item: MenuItem) => {
    const product: Product = {
      id: item.id,
      name: item.name,
      desc: item.desc,
      price: item.price,
      originalPrice: item.originalPrice,
      offer: item.offer,
      rating: item.rating,
      reviewsCount: item.reviewsCount,
      tag: item.tag,
      features: item.features,
      image: item.image,
      category: item.category,
      temp: item.temp,
    }
    openProductDetail(product)
  }

  const currentCategoryHeader = CATEGORY_HEADERS[selectedCategory]

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2C1A0E] pb-32">
      {/* ── Top Bar ── */}
      <header className="sticky top-0 z-30 bg-[#FAF7F2]/90 backdrop-blur-md px-5 pt-4 pb-3 ">
        <div className="max-w-lg mx-auto flex items-center justify-between">
        {/* ── Page Title & Subtitle ── */}
        <div className="mb-2">
          <div className="flex items-center gap-2">
            <h1
              className="text-[32px] font-extrabold tracking-tight text-[#2C1A0E]"
              style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
            >
              Menu
            </h1>
            <span className="text-[#D4956A] text-[22px] select-none">♡</span>
          </div>
          <div className="flex items-center gap-1.5 text-[14px] text-[#7A6353] font-medium">
            <span>What are you craving today?</span>
            <span className="text-[14px]">🍃</span>
          </div>
        </div>

          {/* Cart Button */}
          <button
            onClick={openCart}
            className="relative w-10 h-10 rounded-full bg-white border border-[#E7DFD5] flex items-center justify-center text-[#2C1A0E] shadow-sm hover:border-[#D4956A] active:scale-95 transition-all"
            aria-label="View shopping cart"
          >
            <ShoppingBag size={18} strokeWidth={2.2} />
            {totalCartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#D4956A] text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-in zoom-in-50">
                {totalCartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-5 pt-3">
        {/* ── Active Table Pill (Screen 9 in Mockup) ── */}
        {isTableConfirmed && (
          <div className="mb-3.5 flex items-center justify-between bg-[#F4ECE3] border border-[#E4D9CC] rounded-2xl px-4 py-2 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="text-[14px]">🪑</span>
              <span className="text-[12.5px] font-bold text-[#2C1A0E]">
                {tableNumber || 'Table 12'} • Ordering here
              </span>
            </div>
            <Link
              href="/scan"
              className="text-[11px] font-semibold text-[#8C6D58] hover:text-[#2C1A0E] underline"
            >
              Change
            </Link>
          </div>
        )}

        {/* ── Search & Filter Bar ── */}
        <div className="flex items-center gap-2.5 mb-5">
          <div className="relative flex-1">
            <Search
              size={17}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A89080]"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search drinks, food, or items..."
              className="w-full h-11 pl-10 pr-4 rounded-full bg-white border border-[#E7DFD5] text-[13.5px] text-[#2C1A0E] placeholder:text-[#A89080] focus:outline-none focus:border-[#D4956A] focus:ring-1 focus:ring-[#D4956A]/20 transition-all shadow-[0_2px_6px_rgba(44,26,14,0.02)]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-[#8F7868] hover:text-[#2C1A0E] bg-[#F2EDE6] px-2 py-0.5 rounded-full font-medium"
              >
                Clear
              </button>
            )}
          </div>

          {/* Filter Button */}
          <button
            onClick={() => setMenuFilterOpen(true)}
            className={`relative w-11 h-11 rounded-2xl flex items-center justify-center border transition-all active:scale-95 shadow-sm ${
              activeFiltersCount > 0
                ? 'bg-[#3D2314] text-white border-[#3D2314]'
                : 'bg-white border-[#E7DFD5] text-[#5C3D2E] hover:border-[#D4956A]'
            }`}
            aria-label="Open filter options"
          >
            <SlidersHorizontal size={17} />
            {activeFiltersCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#D4956A] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>

        {/* ── Category Tabs Row ── */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 mb-5 -mx-5 px-5">
          {CATEGORY_TABS.map((tab) => {
            const isSelected = selectedCategory === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-semibold whitespace-nowrap transition-all active:scale-95 ${
                  isSelected
                    ? 'bg-[#3D2314] text-white shadow-sm shadow-[#3D2314]/20'
                    : 'bg-white border border-[#E7DFD5] text-[#5C3D2E] hover:border-[#D4956A]'
                }`}
              >
                {tab.icon && <span className="text-[13px]">{tab.icon}</span>}
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>

        {/* ── Quick Order Area: Returning User vs New User ── */}
        <div className="mb-6">
          {isReturningUser ? (
            <div className="space-y-4">
              {/* Order Again Section */}
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-4 border border-[#ECE5DD] shadow-[0_2px_12px_rgba(44,26,14,0.03)]">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[#D4956A] text-[15px] font-bold">↻</span>
                      <h3
                        className="text-[16px] font-bold text-[#2C1A0E]"
                        style={{ fontFamily: '"Montserrat", sans-serif' }}
                      >
                        Order Again
                      </h3>
                    </div>
                    <p className="text-[11px] text-[#8F7868]">
                      Your recent favourites, one tap away
                    </p>
                  </div>
                  {/* Subtle state toggle for testing */}
                  <button
                    onClick={() => setIsReturningUser(false)}
                    className="text-[10px] text-[#A89080] hover:text-[#5C3D2E] underline"
                    title="Switch to new user view"
                  >
                    New user view?
                  </button>
                </div>

                {/* 2 Compact Recent Order Cards */}
                <div>
                  {RECENT_ORDERS.map((order) => {
                    const matching = cartItems.filter((ci) => ci.productId === order.menuItem.id)
                    const qty = matching.reduce((acc, ci) => acc + ci.quantity, 0)
                    const primary = matching[0]

                    return (
                      <div key={order.id}
                        onClick={() => handleOpenDetail(order.menuItem)}
                        className="bg-[#FAF7F2] rounded-2xl p-2 border border-[#EDE6DD] transition-all"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="relative w-18 h-14 rounded-xl overflow-hidden bg-[#EAE0D5] shrink-0">
                            <Image
                              src={order.image}
                              alt={order.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="text-[12px] font-bold text-[#2C1A0E] truncate leading-tight" 
                             style={{ fontFamily: '"Playfair Display", Georgia, serif' }} >
                              {order.name}
                            </p>
                            <p className="text-[12px] font-bold text-[#8C6D58] mt-0.5">
                              ₹{order.price}
                            </p>
                          </div>
                          {/* Quick Add or Stepper */}
                        <div
                          className="flex justify-end"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {qty === 0 ? (
                            <button
                              onClick={(e) => handleQuickAdd(e, order.menuItem)}
                              className="w-6 h-6 rounded-full bg-[#D4956A] text-white flex items-center justify-center hover:bg-[#c28459] shadow-sm active:scale-90 transition-transform"
                              aria-label={`Add ${order.name}`}
                            >
                              <Plus size={13} strokeWidth={2.8} />
                            </button>
                          ) : (
                            <div className="flex items-center bg-[#3D2314] text-white rounded-full p-0.5">
                              <button
                                onClick={() => updateQuantity(primary.id, -1)}
                                className="w-5 h-5 rounded-full flex items-center justify-center active:scale-90"
                              >
                                <Minus size={10} strokeWidth={2.5} />
                              </button>
                              <span className="text-[11px] font-bold px-1">{qty}</span>
                              <button
                                onClick={() => updateQuantity(primary.id, 1)}
                                className="w-5 h-5 rounded-full flex items-center justify-center active:scale-90"
                              >
                                <Plus size={10} strokeWidth={2.5} />
                              </button>
                            </div>
                          )}
                        </div>
                        </div>

                      </div>
                    )
                  })}
                </div>
              </div>

            </div>
          ) : (
            /* New User View: Not sure what to try? */
            <div className="bg-gradient-to-r from-[#4A2814] to-[#2B1408] rounded-3xl p-5 border border-[#E3D7C8] shadow-sm flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-[#FFF] uppercase tracking-wider flex items-center gap-1 mb-1">
                  <Sparkles size={12} />
                  Not sure what to try?
                </span>
                <h3
                  className="text-[16px] font-bold text-[#FFF] mb-1"
                  style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                >
                  Start with our favourites
                </h3>
                <p className="text-[11px] text-[#E3D7C8] mb-3">
                  Discover the drinks that our guests love the most.
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedCategory('coffee')}
                    className="inline-flex items-center gap-1.5 bg-[#c28459] text-white text-[12px] font-bold px-4 py-2 rounded-full active:scale-95 transition-transform"
                  >
                    <span>Best Sellers</span>
                    <ArrowRight size={13} />
                  </button>
                  <button
                    onClick={() => setIsReturningUser(true)}
                    className="text-[6px] text-[#8F7868] underline pl-1"
                  >
                    Return?
                  </button>
                </div>
              </div>

              <div className="relative w-24 h-24 shrink-0 rounded-2xl overflow-hidden shadow-sm border border-white/50">
                <Image
                  src="/banners/bestsellers-banner.jpg"
                  alt="Our favourites"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )}
        </div>

        {/* ── Curated Category Transition Header ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="mb-4 pt-1 border-t border-[#EAE3DA]"
          >
            <div className="flex items-baseline justify-between">
              <div>
                <h2
                  className="text-[22px] font-semibold text-[#2C1A0E] leading-tight"
                  style={{ fontFamily: '"Montserrat", sans-serif' }} 
                >
                  {currentCategoryHeader?.title || 'Menu Items'}
                </h2>
                <p className="text-[12.5px] text-[#7A6353] mt-0.5">
                  {currentCategoryHeader?.subtitle || 'Carefully prepared for you.'}
                </p>
              </div>

              <span className="text-[11px] font-semibold text-[#8F7868] bg-white px-2.5 py-1 rounded-full border border-[#EDE5DD]">
                {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ── Products Display (Curated Sub-sections or Grid) ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedCategory}-${searchQuery}-${JSON.stringify(filters)}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
          >
            {filteredItems.length === 0 ? (
              /* Empty state */
              <div className="bg-white rounded-3xl p-8 border border-[#E7DFD5] text-center my-6">
                <div className="w-12 h-12 rounded-full bg-[#F5EDE4] flex items-center justify-center mx-auto mb-3 text-xl">
                  🔍
                </div>
                <h3
                  className="text-[17px] font-bold text-[#2C1A0E] mb-1"
                  style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                >
                  No items found
                </h3>
                <p className="text-[12px] text-[#8F7868] max-w-[240px] mx-auto mb-4">
                  We couldn't find any items matching your selected criteria.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setFilters({
                      dietary: 'all',
                      temperature: 'all',
                      taste: 'all',
                      price: 'all',
                    })
                    setSelectedCategory('all')
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#3D2314] text-white text-[12px] font-bold hover:bg-[#2C1A0E] transition-colors"
                >
                  <RotateCcw size={13} />
                  Reset all filters
                </button>
              </div>
            ) : selectedCategory === 'coffee' && currentCategoryHeader?.subSections && !searchQuery ? (
              /* Curated Curated Hierarchy for Coffee: Signature -> Hot -> Cold */
              <div className="space-y-6">
                {currentCategoryHeader.subSections.map((sec) => {
                  const itemsInSub = filteredItems.filter(
                    (item) => item.subCategory === sec.subCategory
                  )
                  if (itemsInSub.length === 0) return null

                  return (
                    <div key={sec.subCategory} className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#D4956A]" />
                        <h3 className="text-[14px] font-bold text-[#3D2314] tracking-wide uppercase text-[12px]" 
                        style={{ fontFamily: '"Montserrat", sans-serif' }} >
                          {sec.title}
                        </h3>
                        <div className="flex-1 h-[1px] bg-[#E8E0D5]" />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        {itemsInSub.map((item) => (
                          <MenuProductCard key={item.id} item={item} />
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              /* Standard Curated 2-Column Grid */
              <div className="grid grid-cols-2 gap-3">
                {filteredItems.map((item) => (
                  <MenuProductCard key={item.id} item={item} />
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Filter Bottom Sheet Modal ── */}
      <MenuFilterBottomSheet
        isOpen={isMenuFilterOpen}
        onClose={() => setMenuFilterOpen(false)}
        filters={filters}
        onApply={(updatedFilters) => setFilters(updatedFilters)}
        totalCount={filteredItems.length}
      />

      {/* ── Shared Cart & Modal Components ── */}
      <ProductDetailModal />
      <AddToCartToast />
      <MiniCartBar />
      <CartDrawer />
    </div>
  )
}
