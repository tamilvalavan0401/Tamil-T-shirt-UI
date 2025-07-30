"use client"

import Image from "next/image"
import { Heart, Trash2, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { type CartItem, useCart } from "@/components/ui/cart-provider"

interface CartItemCardProps {
  item: CartItem
}

export default function CartItemCard({ item }: CartItemCardProps) {
  const { updateQuantity, removeFromCart } = useCart()

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) {
      // If new quantity is less than 1, set it to 1 instead of removing the item
      updateQuantity(item.id, 1, item.selectedSize, item.selectedColor)
    } else {
      updateQuantity(item.id, newQuantity, item.selectedSize, item.selectedColor)
    }
  }

  // Use the actual imageurl from the item data
  const imageUrl =
    `/${item.imageurl}` ||
    `/placeholder.svg?height=100&width=100&query=${encodeURIComponent(item.name + " " + (item.selectedColor || ""))}`

  return (
    <div className="flex  md:justify-between flex-col  border-b-2 border-border_bg  gap-4  p-4 bg-card text-card-foreground">
      <div className="flex gap-2">
        <div>
          <Image
            src={imageUrl}
            alt={item.name}
            width={60}
            height={60}
            className="aspect-square rounded-md object-cover "
          />
        </div>
      <div className="grid gap-1 flex-1 min-w-0 ">
        <h3 className="font-semibold truncate text-pr_name">{item.name}</h3>
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-bold text-pr_name ">₹{item.sp}</span>
          {item.mrp > item.sp && (
            <>
              <span className="text-sm text-muted-foreground text-gray_text line-through">₹{item.mrp}</span>
              <span className="text-xs text-offer_text">You saved ₹{item.mrp - item.sp}!</span>
            </>
          )}
        </div>
        {/* Placeholder for Couple Size based on Figma */}
        <div className="text-sm text-muted-foreground">
          {item.selectedSize && <span>Size: {item.selectedSize}</span>}
          {item.selectedColor && <span> | Color: {item.selectedColor}</span>}
          {/* This is a placeholder. In a real app, this would come from product data. */}
          {item.name.includes("Couple") && <p className="mt-1">Couple Size: Men: 2XL Women: XL</p>}
        </div>
      </div>
      </div>

      <div className="flex items-center">

      <div className="flex items-center border-2 rounded-full border-border_bg ">
        <Button
          size="icon"
          className="h-8 w-8 bg-transparent"
          onClick={() => handleQuantityChange(item.cartQuantity - 1)}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="w-8 text-center font-medium">{item.cartQuantity}</span>
        <Button
          size="icon"
          className="h-8 w-8 bg-transparent"
          onClick={() => handleQuantityChange(item.cartQuantity + 1)}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex gap-2 ">
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
          <Heart className="h-5 w-5" />
          <span className="sr-only">Add to wishlist</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-primary"
          onClick={() => removeFromCart(item.id, item.selectedSize, item.selectedColor)}
        >
          <Trash2 className="h-5 w-5" />
          <span className="sr-only">Remove item</span>
        </Button>
      </div>
      </div>
    </div>
  )
}
