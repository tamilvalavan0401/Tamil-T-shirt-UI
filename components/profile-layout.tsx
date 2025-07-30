"use client"

import type React from "react"
import { Bell, ChevronDown, User, ShoppingBag, CreditCard, Gift, UserCircle, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"

interface ProfileLayoutProps {
  children: React.ReactNode
  activeSection: string
  onSectionChange: (section: string) => void
}

const menuItems = [
  { id: "personal-info", label: "Personal Information", icon: User },
  { id: "order-history", label: "Order History", icon: ShoppingBag },
  // { id: "billing-payments", label: "Billing and Payments", icon: CreditCard },
  // { id: "gifts", label: "Gifts", icon: Gift },
  { id: "my-account", label: "My Account", icon: UserCircle },
]

export function ProfileLayout({ children, activeSection, onSectionChange }: ProfileLayoutProps) {
  const router = useRouter()

  return (
    <div className="min-h-screen md:bg-gray-50 bg-white flex">
      {/* Sidebar - Always visible and sticky */}
      <div className="w-16 sm:w-64 bg-white border-r border-gray-200 flex-shrink-0 sticky top-[50px] h-[90vh] ">
        <div className="p-3 sm:p-6">
          {/* Title - Hidden on mobile, visible on sm+ screens */}
          <h2 className="hidden sm:block text-xl font-semibold text-gray-800 mb-8">User Profile</h2>

          {/* Navigation Menu */}
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = activeSection === item.id

              return (
                <button
                  key={item.id}
                  onClick={() => onSectionChange(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-3 text-left rounded-lg transition-colors relative ${
                    isActive ? "text-primary bg-dash_menu_light" : "text-gray-600 hover:bg-gray-50"
                  } sm:justify-start justify-center`}
                  title={item.label} // Tooltip for mobile users
                >
                  {/* Orange left border for active item - only visible on sm+ screens */}
                  {isActive && (
                    <div className="hidden sm:block absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full" />
                  )}

                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {/* Text - Hidden on mobile, visible on sm+ screens */}
                  <span className="hidden sm:block text-sm font-medium">{item.label}</span>
                </button>
              )
            })}
          </nav>
        </div>

        {/* Log out button at bottom */}
        <div className="absolute bottom-6 left-3 right-3 sm:left-6 sm:right-6">
          <button
            onClick={() => router.push("/")}
            className="w-full flex items-center gap-3 px-3 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors sm:justify-start justify-center"
            title="Log out" // Tooltip for mobile users
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {/* Text - Hidden on mobile, visible on sm+ screens */}
            <span className="hidden sm:block text-sm font-medium">Log out</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* <header className="bg-white border-b border-gray-200 px-4 sm:px-6 h-16 flex items-center justify-between sm:justify-end flex-shrink-0">
          <h1 className="text-lg font-semibold text-gray-800 sm:hidden">Dashboard</h1>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 px-2">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Sara Tancredi" />
                    <AvatarFallback>ST</AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:block text-sm font-medium">Sara Tancredi</span>
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>Profile Settings</DropdownMenuItem>
                <DropdownMenuItem>Account Settings</DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/")}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header> */}

        <main className="flex-1 p-0 md:p-8 overflow-auto ">{children}</main>
      </div>
    </div>
  )
}
