"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X } from "lucide-react"

interface AddressFormDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onSave: (address: Address) => void
  editingAddress?: Address | null
}

export interface Address {
  id: string
  firstName: string
  lastName: string
  country: string
  city: string
  state: string
  pinCode: string
  doorNoStreet: string
  localityTownDistrict: string
  email: string
  phone: string
  saveAs: "Home" | "Office" | "Other"
}

const countries = ["India", "USA", "Malaysia"]
const statesByCountry: Record<string, string[]> = {
  India: ["Tamil Nadu", "Kerala", "Karnataka", "Maharashtra", "Delhi"],
  USA: ["California", "New York", "Texas", "Florida"],
  Malaysia: ["Selangor", "Johor", "Penang"],
}

export default function AddressFormDialog({ isOpen, onOpenChange, onSave, editingAddress }: AddressFormDialogProps) {
  const [formData, setFormData] = useState<Omit<Address, "id">>({
    firstName: "",
    lastName: "",
    country: "India",
    city: "",
    state: "",
    pinCode: "",
    doorNoStreet: "",
    localityTownDistrict: "",
    email: "",
    phone: "",
    saveAs: "Home",
  })

  useEffect(() => {
    if (editingAddress) {
      setFormData(editingAddress)
    } else {
      setFormData({
        firstName: "",
        lastName: "",
        country: "India",
        city: "",
        state: "",
        pinCode: "",
        doorNoStreet: "",
        localityTownDistrict: "",
        email: "",
        phone: "",
        saveAs: "Home",
      })
    }
  }, [editingAddress, isOpen])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSelectChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newAddress: Address = {
      ...formData,
      id: editingAddress?.id || crypto.randomUUID(), // Use existing ID if editing, otherwise generate new
    }
    onSave(newAddress)
    onOpenChange(false) // Close dialog
  }

  const currentStates = statesByCountry[formData.country] || []

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <div className="">
      <DialogContent className="sm:!max-w-[450px]  max-h-[90vh] bg-white overflow-y-auto !rounded-[8px] "
       style={{
    scrollbarWidth: "none",       /* Firefox */
    msOverflowStyle: "none",      /* IE & Edge */
  }}
      >
        {/* <p className="!sticky !top-0">
          {editingAddress ? "Edit Address" : "Add New Address"}
        </p> */}
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-lg font-semibold ">
            {editingAddress ? "Edit Address" : "Add New Address"}
          </DialogTitle>
          {/* <DialogClose asChild>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </DialogClose> */}
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="firstName">First Name *</Label>
              <Input id="firstName" className="rounded-[8px] !border-2 !border-border_bg" value={formData.firstName} onChange={handleChange} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="lastName">Last Name *</Label>
              <Input id="lastName" className="rounded-[8px] !border-2 !border-border_bg" value={formData.lastName} onChange={handleChange} required />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="country">Country *</Label>
            <Select value={formData.country} onValueChange={(value) => handleSelectChange("country", value)}>
              <SelectTrigger className="rounded-[8px] !border-2 !border-border_bg" id="country">
                <SelectValue placeholder="Select Country" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {countries.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="city">City *</Label>
              <Input className="rounded-[8px] !border-2 !border-border_bg" id="city" value={formData.city} onChange={handleChange} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="state">State *</Label>
              <Select value={formData.state} onValueChange={(value) => handleSelectChange("state", value)}>
                <SelectTrigger className="rounded-[8px] !border-2 !border-border_bg" id="state">
                  <SelectValue placeholder="Select State" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {currentStates.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="pinCode">Pin Code *</Label>
            <Input className="rounded-[8px] !border-2 !border-border_bg" id="pinCode" value={formData.pinCode} onChange={handleChange} required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="doorNoStreet">Door no / Street address *</Label>
            <Input className="rounded-[8px] !border-2 !border-border_bg" id="doorNoStreet" value={formData.doorNoStreet} onChange={handleChange} required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="localityTownDistrict">Locality / Town / District *</Label>
            <Input className="rounded-[8px] !border-2 !border-border_bg" id="localityTownDistrict" value={formData.localityTownDistrict} onChange={handleChange} required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email address *</Label>
            <Input className="rounded-[8px] !border-2 !border-border_bg" id="email" type="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">Phone *</Label>
            <Input className="rounded-[8px] !border-2 !border-border_bg" id="phone" type="tel" value={formData.phone} onChange={handleChange} required />
          </div>

          <div className="grid gap-2">
            <Label className="text-base">Save Address As *</Label>
            <RadioGroup
              value={formData.saveAs}
              onValueChange={(value: "Home" | "Office" | "Other") =>
                setFormData((prev) => ({ ...prev, saveAs: value }))
              }
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Home" id="save-as-home" />
                <Label htmlFor="save-as-home">Home</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Office" id="save-as-office" />
                <Label htmlFor="save-as-office">Office</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Other" id="save-as-other" />
                <Label htmlFor="save-as-other">Other</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <Button className="rounded-[8px] !border-2 text-primary !border-primary hover:!bg-primary_hover hover:!text-white" type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button className="rounded-[8px] !border-2 text-white !border-primary bg-primary hover:!bg-primary_hover" type="submit">Save</Button>
          </div>
        </form>
      </DialogContent>
      </div>
    </Dialog>
  )
}
