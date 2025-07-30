"use client"

import { Wallet, MapPin, User, Shield, Plus, Edit, Trash2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

const addresses = [
  {
    id: "addr-1",
    type: "Home",
    name: "Sara Tancredi",
    address: "123 Main Street\nNew York, NY 10001\nUnited States",
    isDefault: true,
  },
  {
    id: "addr-2",
    type: "Work",
    name: "Sara Tancredi",
    address: "456 Business Ave\nNew York, NY 10002\nUnited States",
    isDefault: false,
  },
]

export function MyAccount() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="md:border-2 border-none border-border_bg rounded-[8px] bg-white p-0 m-0">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <User className="w-6 h-6" />
            My Account
          </CardTitle>
        </CardHeader>
      </Card>

      {/* My Wallet */}
      {/* <Card className="md:border-2 border-none border-border_bg rounded-[8px] bg-white p-0 m-0">
        <CardHeader className="">
          <CardTitle className="flex items-center gap-2 ">
            <Wallet className="w-5 h-5" />
            My Wallet
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-3xl font-bold text-green-600">$245.50</h3>
              <p className="text-gray_text text-[12px]">Available Balance</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">Add Funds</Button>
              <Button className="bg-primary hover:bg-primary">Withdraw</Button>
            </div>
          </div>
          <div className="mt-6 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Pending transactions</span>
              <span>$12.99</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Last transaction</span>
              <span>Jan 25, 2024</span>
            </div>
          </div>
        </CardContent>
      </Card> */}

      {/* My Address */}
      <Card className="md:border-2 border-none border-border_bg rounded-[8px] bg-white p-0 m-0">
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin className="w-4 h-4" />
            <p className="text-[16px]">My Address</p>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {addresses.map((address) => (
              <div key={address.id} className="p-4 border-2 border-border_bg rounded-[8px] ">
                <div className="flex justify-between flex-col md:flex-row space-y-[14px]">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium">{address.type} Address</h4>
                      {address.isDefault && (
                        <span className="text-xs bg-primary_hover text-white px-2 py-1 rounded">Default</span>
                      )}
                    </div>
                    <p className="text-gray_text md:text-[14px] text-[12px] whitespace-pre-line">
                      {address.name}
                      {"\n"}
                      {address.address}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="w-3 h-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            <Button className="w-full flex items-center gap-2 bg-transparent border-2 border-primary text-primary rounded-[4px]">
              <Plus className="w-4 h-4" />
              Add New Address
            </Button>
          </div>
        </CardContent>
      </Card>

    </div>
  )
}
