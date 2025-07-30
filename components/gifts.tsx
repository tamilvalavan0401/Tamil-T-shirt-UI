"use client"

import { Gift, Star } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const giftCards = [
  {
    id: "gift-1",
    title: "Amazon Gift Card",
    value: 50,
    code: "AMZN-XXXX-XXXX-1234",
    status: "active",
    expiryDate: "2024-12-31",
    image: "/placeholder.svg?height=100&width=160",
  },
  {
    id: "gift-2",
    title: "iTunes Gift Card",
    value: 25,
    code: "ITNS-XXXX-XXXX-5678",
    status: "used",
    expiryDate: "2024-06-30",
    image: "/placeholder.svg?height=100&width=160",
  },
  {
    id: "gift-3",
    title: "Google Play Gift Card",
    value: 100,
    code: "GPLY-XXXX-XXXX-9012",
    status: "active",
    expiryDate: "2025-03-15",
    image: "/placeholder.svg?height=100&width=160",
  },
  {
    id: "gift-4",
    title: "Steam Gift Card",
    value: 75,
    code: "STEM-XXXX-XXXX-3456",
    status: "active",
    expiryDate: "2024-11-20",
    image: "/placeholder.svg?height=100&width=160",
  },
]

const rewardPoints = {
  total: 2450,
  available: 2450,
  tier: "Gold",
}

export function Gifts() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <Gift className="w-6 h-6" />
            Gift Cards
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Reward Points */}
      <Card>
        <CardHeader>
          <CardTitle>Reward Points</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <Star className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">{rewardPoints.total.toLocaleString()} Points</h3>
                <p className="text-gray-600">Available: {rewardPoints.available.toLocaleString()} points</p>
                <Badge className="bg-yellow-100 text-yellow-800 mt-1">{rewardPoints.tier} Member</Badge>
              </div>
            </div>
            <Button className="bg-primary hover:bg-primary">Redeem Points</Button>
          </div>
        </CardContent>
      </Card>

      {/* Gift Cards */}
      <Card>
        <CardHeader>
          <CardTitle>My Gift Cards</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {giftCards.map((card) => (
              <Card key={card.id} className="overflow-hidden">
                <div className="relative">
                  <img src={card.image || "/placeholder.svg"} alt={card.title} className="w-full h-24 object-cover" />
                  <Badge
                    className={`absolute top-2 right-2 ${
                      card.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {card.status.charAt(0).toUpperCase() + card.status.slice(1)}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">{card.title}</h3>
                  <p className="text-2xl font-bold text-green-600 mb-2">${card.value}</p>
                  <p className="text-gray-600 text-sm mb-2">Code: {card.code}</p>
                  <p className="text-gray-600 text-sm mb-4">
                    Expires: {new Date(card.expiryDate).toLocaleDateString()}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full bg-transparent"
                    disabled={card.status === "used"}
                  >
                    {card.status === "used" ? "Used" : "Use Card"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Purchase Gift Cards */}
      <Card>
        <CardHeader>
          <CardTitle>Purchase Gift Cards</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {["Amazon", "iTunes", "Google Play", "Steam"].map((brand) => (
              <Button key={brand} variant="outline" className="h-20 flex flex-col gap-2 bg-transparent">
                <Gift className="w-6 h-6" />
                <span>{brand}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
