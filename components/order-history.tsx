"use client"

import { Package, Clock, CheckCircle, Truck, ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface Order {
  id: string
  productName: string
  orderDate: string
  status: "processing" | "pending" | "delivered"
  amount: number
  image: string
}

const orders: Order[] = [
  {
    id: "ORD-001",
    productName: "Wireless Bluetooth Headphones",
    orderDate: "2024-01-15",
    status: "delivered",
    amount: 99.99,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "ORD-002",
    productName: "Smart Watch Series 5",
    orderDate: "2024-01-20",
    status: "processing",
    amount: 299.99,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "ORD-003",
    productName: "Laptop Stand Adjustable",
    orderDate: "2024-01-25",
    status: "pending",
    amount: 49.99,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "ORD-004",
    productName: "USB-C Hub Multi-Port",
    orderDate: "2024-01-28",
    status: "delivered",
    amount: 79.99,
    image: "/placeholder.svg?height=80&width=80",
  },
]

interface OrderHistoryProps {
  onOrderSelect?: (orderId: string) => void
}

export function OrderHistory({ onOrderSelect }: OrderHistoryProps) {
  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="w-4 h-4" />
      case "processing":
        return <Truck className="w-4 h-4" />
      case "pending":
        return <Clock className="w-4 h-4" />
    }
  }

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-0 m-0">
      <Card className="md:border-2 border-none border-border_bg rounded-[8px] bg-white p-0 m-0">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <Package className="w-6 h-6" />
            Order History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {orders.map((order) => (
              <Card key={order.id} className="hover:shadow-md transition-shadow cursor-pointer border-2 rounded-[4px] border-border_bg">
                <CardContent className="p-6">
                  <div className="flex md:flex-row flex-col justify-between space-y-[10px]">
                    <div className="flex md:items-center items-start space-x-2">
                      <img
                        src={order.image || "/placeholder.svg"}
                        alt={order.productName}
                        className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                      />
                      <div className="space-y-3">
                        <h3 className="font-semibold md:text-[16px] text-[14px]">{order.productName}</h3>
                        <div className="">
                          <p className="text-gray_text md:text-[14px] text-[12px] p-0 m-0">Order ID: {order.id}</p>
                          <p className="text-gray_text md:text-[14px] text-[12px] p-0 m-0">
                            Order Date: {new Date(order.orderDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Badge className={`${getStatusColor(order.status)} flex items-center gap-1 w-fit`}>
                        {getStatusIcon(order.status)}
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                      <p className="font-semibold text-lg">${order.amount}</p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onOrderSelect?.(order.id)}
                        className="flex items-center gap-1"
                      >
                        View Details
                        <ArrowRight className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
