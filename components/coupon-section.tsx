"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { X } from "lucide-react"

export default function CouponSection() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleApplyCoupon = () => {
    // Logic to apply coupon
    console.log("Applying coupon...")
    setIsDialogOpen(false) // Close dialog after applying
  }

  return (
    <div className="bg-coupon_bg rounded-[4px] p-4 h-fit space-y-[20px]">
      {/* <div className="flex items-center gap-2">
        <img src="/placeholder.svg?height=20&width=20" alt="Coupon Icon" className="h-5 w-5" />
        <span className="font-semibold text-yellow-800">TEETAMIL</span>
      </div> */}
      <p className="text-sm text-black">
        Whistles! Get extra INR:100 cashback on prepaid orders above Rs.699. Coupon code
      </p>
      <div className="flex gap-2 md:flex-row flex-col">
        {/* <Button variant="outline" className="flex-1 bg-transparent  text-coupon_text border border-coupon_text bg-white rounded-[8px]">
          CUSTOM COUPON 
        </Button> */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex-1 !w-fit bg-transparent text-coupon_text border border-coupon_text bg-white rounded-[8px]">
              APPLY COUPON
            </Button>
          </DialogTrigger>
          <div className="w-fit">
          <DialogContent className="sm:max-w-[425px] p-6 bg-white border-none rounded-[8px]">
            <DialogHeader className="flex flex-row items-center justify-between">
              <DialogTitle className="text-lg font-semibold">Apply Coupon</DialogTitle>
              <DialogClose asChild>
                {/* <Button variant="ghost" size="icon" className="h-6 w-6">
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </Button> */}
              </DialogClose>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Input id="coupon-code" placeholder="ENTER CODE" className="col-span-3 border-2 border-border_bg rounded-[4px]" />
            </div>
            <Button type="submit" className="w-full bg-primary text-white rounded-[4px] " onClick={handleApplyCoupon}>
              APPLY
            </Button>
          </DialogContent>
          </div>
        </Dialog>
      </div>
    </div>
  )
}
