'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Trash2, Plus, Minus, ArrowRight, CheckCircle2, Utensils } from 'lucide-react'
import { useCartStore } from '@/store/useCartStore'
import { POPULAR_DRINKS } from '@/data/menuData'

export default function CartDrawer() {
  const isCartOpen = useCartStore(state => state.isCartOpen)
  const closeCart = useCartStore(state => state.closeCart)
  const items = useCartStore(state => state.items)
  const tableNumber = useCartStore(state => state.tableNumber)
  const updateQuantity = useCartStore(state => state.updateQuantity)
  const removeItem = useCartStore(state => state.removeItem)
  const clearCart = useCartStore(state => state.clearCart)
  const addItem = useCartStore(state => state.addItem)

  const [orderPlaced, setOrderPlaced] = useState(false)

  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  // Recommendations: items not yet in cart
  const recommendations = POPULAR_DRINKS.filter(
    drink => !items.some(i => i.productId === drink.id)
  )

  const handlePlaceOrder = () => {
    setOrderPlaced(true)
    setTimeout(() => {
      clearCart()
      setOrderPlaced(false)
      closeCart()
    }, 2500)
  }

  if (!isCartOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end justify-center">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeCart}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs"
        />

        {/* Drawer Sheet */}
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', stiffness: 320, damping: 32 }}
          className="relative w-full max-w-[430px] bg-[#FDFAF6] rounded-t-[32px] max-h-[90vh] flex flex-col z-10 shadow-2xl overflow-hidden"
        >
          {/* Handle indicator */}
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-12 h-1.5 bg-[#E2DDD8] rounded-full" />
          </div>

          {orderPlaced ? (
            /* Order Success View */
            <div className="p-8 flex flex-col items-center text-center my-auto py-16">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className="w-20 h-20 bg-[#2C1A0E] rounded-full flex items-center justify-center text-[#D4956A] mb-4 shadow-xl"
              >
                <CheckCircle2 size={48} />
              </motion.div>
              <h2
                className="text-[24px] font-bold text-[#2C1A0E] mb-2"
                style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
              >
                Order Placed! 🎉
              </h2>
              <p className="text-[14px] text-[#8C7362] max-w-[260px] mb-4">
                Your sips are being prepared for <span className="font-bold text-[#2C1A0E]">{tableNumber}</span>.
              </p>
              <span className="bg-[#F5EDE4] text-[#6B3F2A] text-[12px] font-bold px-4 py-1.5 rounded-full border border-[#E2DDD8]">
                📍 {tableNumber}
              </span>
            </div>
          ) : (
            /* Cart Content */
            <>
              {/* Header */}
              <div className="flex items-center justify-between px-6 pt-2 pb-4 border-b border-[#F0E6DC]">
                <div className="flex items-center gap-2">
                  <h2
                    className="text-[20px] font-bold text-[#2C1A0E]"
                    style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                  >
                    Your Cart
                  </h2>
                  <span className="bg-[#2C1A0E] text-[#FDFAF6] text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1">
                    <Utensils size={11} />
                    {tableNumber}
                  </span>
                </div>
                <button
                  onClick={closeCart}
                  className="w-8 h-8 rounded-full bg-[#F2EAE1] flex items-center justify-center text-[#6B3F2A] hover:bg-[#EAE0D5] active:scale-90 transition-all"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Scrollable Body */}
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                {items.length === 0 ? (
                  <div className="py-12 text-center">
                    <p className="text-[15px] font-bold text-[#2C1A0E] mb-1">Your cart is empty</p>
                    <p className="text-[12px] text-[#8C7362]">Add some drinks to start your order!</p>
                  </div>
                ) : (
                  <>
                    {/* Items List */}
                    <div className="space-y-3">
                      {items.map(item => (
                        <div
                          key={item.id}
                          className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-[#F0E6DC] shadow-sm"
                        >
                          {/* Thumbnail */}
                          <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-[#F5EDE4] shrink-0">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>

                          {/* Details */}
                          <div className="flex-1 min-w-0">
                            <h4 className="text-[14px] font-bold text-[#2C1A0E] truncate">
                              {item.name}
                            </h4>
                            <p className="text-[11px] text-[#A89080]">
                              {item.size} {item.temp ? `• ${item.temp}` : ''}
                            </p>
                            {item.extras.length > 0 && (
                              <p className="text-[10px] text-[#D4956A] truncate">
                                + {item.extras.map(e => e.name).join(', ')}
                              </p>
                            )}
                            <p className="text-[13px] font-bold text-[#2C1A0E] mt-0.5">
                              &#x20b9;{item.price * item.quantity}
                            </p>
                          </div>

                          {/* Controls */}
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1.5 bg-[#F5EDE4] p-1 rounded-full border border-[#E8DFC8]">
                              <button
                                onClick={() => updateQuantity(item.id, -1)}
                                className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-[#2C1A0E] shadow-xs active:scale-90"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="text-[12px] font-bold w-4 text-center text-[#2C1A0E]">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, 1)}
                                className="w-6 h-6 rounded-full bg-[#2C1A0E] flex items-center justify-center text-white shadow-xs active:scale-90"
                              >
                                <Plus size={12} />
                              </button>
                            </div>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-[#A89080] hover:text-[#D4956A] p-1"
                              aria-label="Remove item"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Add More Recommendations Section */}
                    {recommendations.length > 0 && (
                      <div className="pt-3">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-[13px] font-bold text-[#2C1A0E]">Add more</h3>
                          <span className="text-[11px] text-[#D4956A] font-semibold">View all →</span>
                        </div>
                        <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-1">
                          {recommendations.map(drink => (
                            <div
                              key={drink.id}
                              className="shrink-0 w-32 bg-white p-2.5 rounded-2xl border border-[#F0E6DC] shadow-xs flex flex-col justify-between"
                            >
                              <div className="relative w-full h-20 rounded-xl overflow-hidden bg-[#F5EDE4] mb-2">
                                <Image
                                  src={drink.image}
                                  alt={drink.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <p className="text-[11px] font-bold text-[#2C1A0E] truncate">
                                {drink.name}
                              </p>
                              <div className="flex items-center justify-between mt-1">
                                <span className="text-[12px] font-bold text-[#2C1A0E]">
                                  &#x20b9;{drink.price}
                                </span>
                                <button
                                  onClick={() =>
                                    addItem(drink, '200 ml', [])
                                  }
                                  className="w-5 h-5 rounded-full bg-[#D4956A] flex items-center justify-center text-white active:scale-90"
                                >
                                  <Plus size={12} />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="p-5 bg-white border-t border-[#F0E6DC] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] text-[#8C7362] font-medium">Total</span>
                    <span className="text-[20px] font-bold text-[#2C1A0E]">
                      &#x20b9;{totalPrice}
                    </span>
                  </div>
                  <button
                    onClick={handlePlaceOrder}
                    className="w-full bg-[#2C1A0E] hover:bg-[#1E110A] text-white text-[15px] font-bold py-3.5 rounded-full shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                  >
                    <span>Proceed to Order</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              )}
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
