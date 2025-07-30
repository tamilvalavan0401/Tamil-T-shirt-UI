"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface Product {
  imageurl: string
  id: number
  name: string
  sp: number // Selling Price
  mrp: number // Maximum Retail Price
  gst_rate: string
  size_id: string | null // Comma-separated string of size IDs
  colorcodes_id: number | null // Color ID
  descp: string
  shrtdesc: string
  category_name: string
}

export interface CartItem extends Product {
  cartQuantity: number
  selectedSize?: string
  selectedColor?: string
}

interface CartContextType {
  cartItems: CartItem[]
  itemCount: number
  addToCart: (product: Product, quantity: number, selectedSize?: string, selectedColor?: string) => void
  removeFromCart: (productId: number, selectedSize?: string, selectedColor?: string) => void
  updateQuantity: (productId: number, newQuantity: number, selectedSize?: string, selectedColor?: string) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [itemCount, setItemCount] = useState(0)

  useEffect(() => {
    const storedCart = localStorage.getItem("cart")
    if (storedCart) {
      const parsedCart: CartItem[] = JSON.parse(storedCart)
      setCartItems(parsedCart)
      setItemCount(parsedCart.reduce((sum, item) => sum + item.cartQuantity, 0))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems))
    setItemCount(cartItems.reduce((sum, item) => sum + item.cartQuantity, 0))
  }, [cartItems])

  const addToCart = (product: Product, quantity: number, selectedSize?: string, selectedColor?: string) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.id === product.id && item.selectedSize === selectedSize && item.selectedColor === selectedColor
      )
      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems]
        updatedItems[existingItemIndex].cartQuantity += quantity
        return updatedItems
      } else {
        return [...prevItems, { ...product, cartQuantity: quantity, selectedSize, selectedColor }]
      }
    })
  }

  const removeFromCart = (productId: number, selectedSize?: string, selectedColor?: string) =>
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) =>
          !(item.id === productId && item.selectedSize === selectedSize && item.selectedColor === selectedColor)
      )
    )

  const updateQuantity = (productId: number, newQuantity: number, selectedSize?: string, selectedColor?: string) =>
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === productId && item.selectedSize === selectedSize && item.selectedColor === selectedColor
            ? { ...item, cartQuantity: newQuantity }
            : item
        )
        .filter((item) => item.cartQuantity > 0)
    )

  const clearCart = () => setCartItems([])

  return (
    <CartContext.Provider
      value={{
        cartItems,
        itemCount,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    return {
      cartItems: [],
      itemCount: 0,
      addToCart: () => {},
      removeFromCart: () => {},
      updateQuantity: () => {},
      clearCart: () => {},
    }
  }
  return context
}
