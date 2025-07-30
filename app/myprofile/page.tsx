"use client"

import { BillingPayments } from "@/components/billing-payments"
import ExtraNav from "@/components/ExtraNav"
import { Footer } from "@/components/footer"
import { Gifts } from "@/components/gifts"
import { MyAccount } from "@/components/my-account"
import { Navbar } from "@/components/navbar"
import { OrderDetails } from "@/components/order-details"
import { OrderHistory } from "@/components/order-history"
import { PersonalInfo } from "@/components/personal-info"
import ProdutinfomobileNav from "@/components/ProdutinfomobileNav"
import { ProfileLayout } from "@/components/profile-layout"
import { useState } from "react"


export default function MyProfilePage() {
  const [activeSection, setActiveSection] = useState("personal-info")
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null)

  // Handle section change - always reset selected order when changing sections
  const handleSectionChange = (section: string) => {
    setActiveSection(section)
    setSelectedOrder(null) // Reset order details when changing sections
  }

  const renderContent = () => {
    // Show order details only when in order-history section AND an order is selected
    if (activeSection === "order-history" && selectedOrder) {
      return <OrderDetails orderId={selectedOrder} onBack={() => setSelectedOrder(null)} />
    }

    // Otherwise show the selected section content
    switch (activeSection) {
      case "personal-info":
        return <PersonalInfo />
      case "order-history":
        return <OrderHistory onOrderSelect={setSelectedOrder} />
      // case "billing-payments":
      //   return <BillingPayments />
      // case "gifts":
      //   return <Gifts />
      case "my-account":
        return <MyAccount />
      default:
        return <PersonalInfo />
    }
  }

  return (
    <>
    {/* <Navbar/> */}
    {/* <ProdutinfomobileNav/> */}
    <ExtraNav/>
    <ProfileLayout activeSection={activeSection} onSectionChange={handleSectionChange}>
      {renderContent()}
    </ProfileLayout>
    {/* <Footer/> */}
    </>
  )
}
