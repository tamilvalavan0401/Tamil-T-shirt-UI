"use client"

import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { OrderStatusSteps } from "./order-status-steps"
// import { OrderStatusSteps } from "./order-status-steps"

interface OrderDetailsProps {
  orderId: string
  onBack: () => void
}

export function OrderDetails({ orderId, onBack }: OrderDetailsProps) {
  // Simplified 3-step order flow: Order Placed → Processing → Delivered
  const orderSteps = [
    {
      id: 1,
      title: "Order Placed",
      description: "Your order has been placed successfully",
      date: "June 16, 2018 - 10:45 pm",
      completed: true,
    },
    {
      id: 2,
      title: "Processing",
      description: "Your order is being prepared and processed",
      date: "June 17, 2018 - 11:05 am",
      completed: true,
      current: true,
    },
    {
      id: 3,
      title: "Delivered",
      description: "Your order has been delivered successfully",
      date: "",
      completed: false,
    },
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-2xl font-bold">Order Details - {orderId}</h1>
      </div>

      {/* Order Status Timeline */}
      <Card>
        <CardContent className="p-0">
          {/* Desktop Horizontal Layout */}
          <div className="hidden lg:block">
            <OrderStatusSteps steps={orderSteps} layout="horizontal" />
          </div>

          {/* Mobile/Tablet Vertical Layout */}
          <div className="lg:hidden">
            <OrderStatusSteps steps={orderSteps} layout="vertical" />
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">

      {/* Product Details */}
      <Card className="bg-white rounded-[4px] border-2 border-border_bg">
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-6">
            <img
              src="/placeholder.svg?height=200&width=200"
              alt="Product"
              className="w-[100px] h-[100px] object-cover rounded-lg"
            />
            <div className="flex-1 space-y-2">
              <h3 className="text-[16px] font-semibold">Wireless Bluetooth Headphones</h3>
              {/* <p className="text-gray_text">
                Premium quality wireless headphones with noise cancellation and 30-hour battery life.
              </p> */}
              <div className="space-y-1">
                <p  className="font-medium text-gray_text md:text-[14px] text-[12px]">
                  <span className="text-black ">SKU:</span> WBH-001
                </p>
                <p  className="font-medium text-gray_text md:text-[14px] text-[12px]">
                  <span className="text-black ">Color:</span> Black
                </p>
                <p  className="font-medium text-gray_text md:text-[14px] text-[12px]">
                  <span className="text-black ">Quantity:</span> 1
                </p>
                <p  className="font-medium text-gray_text md:text-[14px] text-[12px]">
                  <span className="text-black ">Price:</span> $99.99
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Shipping Information */}
      <Card className="bg-white rounded-[4px] border-2 border-border_bg">
        <CardHeader>
          <CardTitle>Shipping Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium">Shipping Address</h4>
            <p className="text-gray_text md:text-[14px] text-[12px]">
              Sara Tancredi
              <br />
              123 Main Street
              <br />
              New York, NY 10001
              <br />
              United States
            </p>
          </div>
          <Separator />
          <div>
            <h4 className="font-medium">Tracking Information</h4>
            <p className="text-gray_text md:text-[14px] text-[12px]">Tracking Number: TRK123456789</p>
            <p className="text-gray_text md:text-[14px] text-[12px]">Carrier: FedEx</p>
            <p className="text-gray_text md:text-[14px] text-[12px]">Expected Delivery: June 20, 2018</p>
          </div>
        </CardContent>
      </Card>
      </div>

      {/* Order Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>$99.99</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span>$5.99</span>
            </div>
            <div className="flex justify-between">
              <span>Tax:</span>
              <span>$8.50</span>
            </div>
            <Separator />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total:</span>
              <span>$114.48</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
