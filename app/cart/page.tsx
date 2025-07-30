"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, ChevronUp, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useState } from "react"
import CouponSection from "@/components/coupon-section"
import CartItemCard from "@/components/cart-item-card"
import { useCart } from "@/components/ui/cart-provider"
import productsData from "@/public/products.json" // Adjust path if needed
import ExtraNav from "@/components/ExtraNav"

export default function CartPage() {
  const { cartItems, itemCount } = useCart()
  const router = useRouter()
  const [isPriceDetailsOpen, setIsPriceDetailsOpen] = useState(true)

  const subtotal = cartItems.reduce((sum: any, item: any) => sum + item.sp * item.cartQuantity, 0)
  const totalMRP = cartItems.reduce((sum: any, item: any) => sum + item.mrp * item.cartQuantity, 0)
  const discountAmount = totalMRP - subtotal
  const deliveryFee = subtotal >= 299 ? 0 : 45
  const totalAmount = subtotal + deliveryFee

  return (
    <>
    <div>
      <ExtraNav/>
      <div className="max-w-7xl mx-auto">
        <div className="mt-4 gap-4 md:mb-4 md:block hidden">
        <div className="flex items-center gap-4 md:mb-4 ">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="md:text-[20px] text-[16px] font-bold">
            My Cart ({itemCount} item{itemCount !== 1 ? "s" : ""})
          </h1>
        </div>
        </div>

        {itemCount === 0 ? (
          <div className="flex flex-wrap">
            <div className="md:w-7/12 w-12/12 p-4 space-y-4">
              <div className="bg-delivery_bg  p-3 rounded-[8px]">
                <p className="text-[12px] text-delivery_text">"Get Free Shipping on Orders Over ₹299!"</p> 
              </div>
              <div className="border-2 border-border_bg rounded-[8px] p-[10px]">
                {productsData.slice(0, 5).map((item: any) => (
                  <CartItemCard key={item.id} item={item} />
                ))}
              </div>
            </div>
            <div className="md:w-5/12 w-12/12 p-4 space-y-4">
              <CouponSection />
              <Collapsible open={isPriceDetailsOpen} onOpenChange={setIsPriceDetailsOpen} className="border-2 space-y-[16px] h-fit rounded-[8px] p-4 rounded-border_bg">
                <CollapsibleTrigger asChild>
                  <div className="flex justify-between items-center cursor-pointer">
                    <h2 className="text-lg ">Price Details</h2>
                    <Button variant="ghost" size="icon" className="h-auto w-auto p-0">
                      {isPriceDetailsOpen ? (
                        <ChevronUp className="h-5 w-5 transition-transform duration-300" />
                      ) : (
                        <ChevronDown className="h-5 w-5 transition-transform duration-300" />
                      )}
                      <span className="sr-only">Toggle price details</span>
                    </Button>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="overflow-hidden h-fit transition-all duration-300 data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                  <div className="grid gap-2 text-sm">
                    <div className="flex justify-between">
                      <span>MRP & GST</span>
                      <span>₹0.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Discount Amount</span>
                      <span className="text-green-600">- ₹0.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Fee</span>
                      <span className="text-green-600">Free</span>
                    </div>

                <hr className="my-4 h-[2px] border-0 bg-[repeating-linear-gradient(to_right,#cbcbcb_0_12px,transparent_10px_20px)]" />

                    <Separator className="" />
                    <div className="flex justify-between font-bold text-base">
                      <span>Subtotal</span>
                      <span>₹0.00</span>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
              <div className="flex justify-between items-center text-xl font-bold">
                <span>Total Amount</span>
                <span>₹0.00</span>
              </div>
              <Button size="lg" className="w-full bg-primary border border-primary hover:bg-primary_hover text-white rounded-[8px]" onClick={() => router.push("/checkout")}>
                Go To Checkout
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 grid gap-6">
              {subtotal >= 299 ? (
                <div className="bg-green-100 text-green-800 p-3 rounded-md text-sm font-medium">
                  🎉 Get Free Shipping on Orders Over ₹299!
                </div>
              ) : (
                <div className="bg-yellow-100 text-yellow-800 p-3 rounded-md text-sm font-medium">
                  Add ₹{299 - subtotal} more to get Free Shipping!
                </div>
              )}
              {cartItems.map((item: any) => (
                <CartItemCard key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} item={item} />
              ))}
            </div>

            <div className="grid gap-6">
              <CouponSection />
              <Collapsible open={isPriceDetailsOpen} onOpenChange={setIsPriceDetailsOpen} className="border rounded-lg">
                <CollapsibleTrigger asChild>
                  <div className="flex justify-between items-center p-6 cursor-pointer">
                    <h2 className="text-lg font-semibold">Price Details</h2>
                    <Button variant="ghost" size="icon" className="h-auto w-auto p-0">
                      {isPriceDetailsOpen ? (
                        <ChevronUp className="h-5 w-5 transition-transform duration-300" />
                      ) : (
                        <ChevronDown className="h-5 w-5 transition-transform duration-300" />
                      )}
                      <span className="sr-only">Toggle price details</span>
                    </Button>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="overflow-hidden  transition-all duration-300 data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                  <div className="grid gap-2 text-sm p-6 pt-0">
                    <div className="flex justify-between">
                      <span>MRP & GST</span>
                      <span>₹{totalMRP.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Discount Amount</span>
                      <span className="text-green-600">- ₹{discountAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Fee</span>
                      {deliveryFee === 0 ? (
                        <span className="text-green-600">Free</span>
                      ) : (
                        <span>₹{deliveryFee.toFixed(2)}</span>
                      )}
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between font-bold text-base">
                      <span>Subtotal</span>
                      <span>₹{subtotal.toFixed(2)}</span>
                    </div>
                    {deliveryFee === 0 && (
                      <div className="text-green-600 text-xs font-medium mt-2">*Free Delivery - Flat Rate ₹45</div>
                    )}
                  </div>
                </CollapsibleContent>
              </Collapsible>
              <div className="flex justify-between items-center text-xl font-bold">
                <span>Total Amount</span>
                <span>₹{totalAmount.toFixed(2)}</span>
              </div>
              <Button size="lg" className="w-full" onClick={() => router.push("/checkout")}>
                Place Order
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  )
}
