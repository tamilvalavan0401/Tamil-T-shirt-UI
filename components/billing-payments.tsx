"use client"

import { CreditCard, DollarSign, Plus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const paymentHistory = [
  {
    id: "PAY-001",
    date: "2024-01-15",
    amount: 99.99,
    method: "Visa ****1234",
    status: "completed",
    description: "Wireless Bluetooth Headphones",
  },
  {
    id: "PAY-002",
    date: "2024-01-20",
    amount: 299.99,
    method: "Mastercard ****5678",
    status: "completed",
    description: "Smart Watch Series 5",
  },
  {
    id: "PAY-003",
    date: "2024-01-25",
    amount: 49.99,
    method: "PayPal",
    status: "pending",
    description: "Laptop Stand Adjustable",
  },
  {
    id: "PAY-004",
    date: "2024-01-28",
    amount: 79.99,
    method: "Visa ****1234",
    status: "completed",
    description: "USB-C Hub Multi-Port",
  },
]

const savedCards = [
  {
    id: "card-1",
    type: "Visa",
    last4: "1234",
    expiry: "12/25",
    isDefault: true,
  },
  {
    id: "card-2",
    type: "Mastercard",
    last4: "5678",
    expiry: "08/26",
    isDefault: false,
  },
]

export function BillingPayments() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <CreditCard className="w-6 h-6" />
            Billing and Payments
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Saved Payment Methods */}
      <Card>
        <CardHeader>
          <CardTitle>Saved Payment Methods</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {savedCards.map((card) => (
              <div key={card.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <CreditCard className="w-8 h-8 text-gray-400" />
                  <div>
                    <p className="font-medium">
                      {card.type} ending in {card.last4}
                    </p>
                    <p className="text-gray-600 text-sm">Expires {card.expiry}</p>
                  </div>
                  {card.isDefault && <Badge variant="secondary">Default</Badge>}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    Remove
                  </Button>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full flex items-center gap-2 bg-transparent">
              <Plus className="w-4 h-4" />
              Add New Payment Method
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Payment History */}
      <Card>
        <CardHeader>
          <CardTitle>All Payment Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {paymentHistory.map((payment) => (
              <div
                key={payment.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg gap-4"
              >
                <div className="flex items-center gap-4">
                  <DollarSign className="w-8 h-8 text-green-500" />
                  <div>
                    <p className="font-medium">{payment.description}</p>
                    <p className="text-gray-600 text-sm">Payment ID: {payment.id}</p>
                    <p className="text-gray-600 text-sm">{new Date(payment.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex flex-col sm:items-end gap-2">
                  <p className="font-semibold text-lg">${payment.amount}</p>
                  <p className="text-gray-600 text-sm">{payment.method}</p>
                  <Badge
                    className={
                      payment.status === "completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }
                  >
                    {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
