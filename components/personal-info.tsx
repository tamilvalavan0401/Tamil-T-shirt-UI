"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Camera, Edit, Save, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function PersonalInfo() {
  const [isEditing, setIsEditing] = useState(false)
  const [profileImage, setProfileImage] = useState("/placeholder.svg?height=96&width=96")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState({
    firstName: "Sara",
    lastName: "Tancredi",
    email: "Sara.Tancredi@gmail.com",
    phone: "(+98) 9123728167",
    dateOfBirth: "1990-05-15",
    gender: "female",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = () => {
    console.log("Saving data:", formData)
    setIsEditing(false)
    // Add your save logic here
  }

  return (
    <div className="max-w-4xl mx-auto p-0 m-0">
      <Card className="md:border-2 border-none border-border_bg rounded-[8px] bg-white p-0 m-0">
        <CardHeader>
          <CardTitle className="text-[20px] font-bold">Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8 px-[16px]">
          {/* Profile Photo Section */}
          <div className="flex items-center gap-6">
            <div className="relative">
              <Avatar className="md:w-20 w-[50px] md:h-20 h-[50px] !object-contain">
                <AvatarImage src={profileImage || "/placeholder.svg"} alt="Sara Tancredi" />
                <AvatarFallback className="text-xl">ST</AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                className="absolute -bottom-1 -right-1 md:w-6 w-5 md:h-6 h-5 rounded-full bg-primary hover:bg-primary p-0"
                onClick={() => fileInputRef.current?.click()}
              >
                <Camera className="md:w-3 !w-[11px] !h-[11px] md:h-3 text-white" />
              </Button>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </div>
            <div>
              <h3 className="text-[16px] font-semibold text-gray-900">Sara Tancredi</h3>
              <p className="text-gray_text md:text-[14px] text-[12px]">New York, USA</p>
              <Button
                // variant="outline"
                // size="sm"
                className="mt-2 px-[8px] rounded-[4px] bg-transparent text-[12px] border border-border_bg"
                onClick={() => fileInputRef.current?.click()}
              >
                Update Photo
              </Button>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] p-0 m-0">
            <div className="space-y-[8px]">
              <Label htmlFor="firstName" className="text-sm font-medium text-black">
                Name
              </Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                disabled={!isEditing }
                className={!isEditing ? "bg-gray-50 rounded-[4px] border-2 border-border_bg" : "rounded-[4px] border-2 border-border_bg"}
              />
            </div>

            <div className="space-y-[8px]">
              <Label htmlFor="lastName" className="text-sm font-medium text-black">
                Full Name
              </Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                disabled={!isEditing}
                className={!isEditing ? "bg-gray-50 rounded-[4px] border-2 border-border_bg" : "rounded-[4px] border-2 border-border_bg"}
              />
            </div>

            <div className="space-y-[8px]">
              <Label htmlFor="email" className="text-sm font-medium text-black">
                Email ID
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                disabled={!isEditing}
                className={!isEditing ? "bg-gray-50 rounded-[4px] border-2 border-border_bg" : "rounded-[4px] border-2 border-border_bg"}
              />
            </div>

            <div className="space-y-[8px]">
              <Label htmlFor="phone" className="text-sm font-medium text-black">
                Phone Number
              </Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                disabled={!isEditing}
                className={!isEditing ? "bg-gray-50 rounded-[4px] border-2 border-border_bg" : "rounded-[4px] border-2 border-border_bg"}
              />
            </div>

            <div className="space-y-[8px]">
              <Label htmlFor="dateOfBirth" className="text-sm font-medium text-black">
                Date of Birth
              </Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                disabled={!isEditing}
                className={!isEditing ? "bg-gray-50 rounded-[4px] border-2 border-border_bg" : "rounded-[4px] border-2 border-border_bg"}
              />
            </div>

            <div className="space-y-[8px]">
              <Label className="text-sm font-medium text-black">Gender</Label>
              <RadioGroup
                value={formData.gender}
                onValueChange={(value) => handleInputChange("gender", value)}
                disabled={!isEditing}
                className="flex gap-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female">Female</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button onClick={handleSave} className="bg-primary  text-white rounded-[4px] " >
                  <Save className="m-0 text-white" />
                  Save
                </Button>
                <Button className="!border-2 !border-error hover:bg-error_hover hover:text-white text-error rounded-[4px]"  onClick={() => setIsEditing(false)}>
                  <X className=" m-0" />
                  Cancel
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)} className="!border-2 !border-border_bg rounded-[4px]" >
                <Edit className="m-0" />
                Edit Information
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
