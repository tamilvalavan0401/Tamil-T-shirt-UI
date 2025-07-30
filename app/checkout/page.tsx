"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft, CheckCircle, Plus, ChevronUp, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useCart } from "@/components/ui/cart-provider"
import AddressCard from "@/components/address-card"
import AddressFormDialog from "@/components/address-form-dialog"
import PaymentMethodSection, { OnlinePaymentOption, SpecialPaymentOption } from "@/components/payment-method-section"
import { addAddress, deleteAddress, getAddresses, updateAddress, Address } from "@/lib/address-utils"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import ExtraNav from "@/components/ExtraNav"

export default function CheckoutPage() {
  const router = useRouter()
  const { cartItems } = useCart()

  const [addresses, setAddresses] = useState<Address[]>([])
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null)
  const [isAddressFormOpen, setIsAddressFormOpen] = useState(false)
  const [editingAddress, setEditingAddress] = useState<Address | null>(null)
  const [showAllAddresses, setShowAllAddresses] = useState(false)

  const [selectedOnlinePaymentMethod, setSelectedOnlinePaymentMethod] =
    useState<OnlinePaymentOption>("razorpay")
  const [selectedSpecialPaymentMethod, setSelectedSpecialPaymentMethod] =
    useState<SpecialPaymentOption>(null)

  const [isOrderSummaryOpen, setIsOrderSummaryOpen] = useState(true)
  const [isPriceDetailsOpen, setIsPriceDetailsOpen] = useState(true)

  useEffect(() => {
    const storedAddresses = getAddresses()
    setAddresses(storedAddresses)
    if (storedAddresses.length > 0) {
      setSelectedAddressId(storedAddresses[0].id)
    }
  }, [])

  useEffect(() => {
    if (addresses.length > 0 && !selectedAddressId) {
      setSelectedAddressId(addresses[0].id)
    } else if (addresses.length === 0 && selectedAddressId) {
      setSelectedAddressId(null)
    }
  }, [addresses, selectedAddressId])

  const handleSaveAddress = (address: Address) => {
    if (editingAddress) {
      setAddresses(updateAddress(address))
      setEditingAddress(null)
    } else {
      const newAddresses = addAddress(address)
      setAddresses(newAddresses)
      if (newAddresses.length === 1) {
        setSelectedAddressId(newAddresses[0].id)
      }
    }
    setIsAddressFormOpen(false)
  }

  const handleEditAddress = (address: Address) => {
    setEditingAddress(address)
    setIsAddressFormOpen(true)
  }

  const handleDeleteAddress = (id: string) => {
    const updatedAddresses = deleteAddress(id)
    setAddresses(updatedAddresses)
    if (selectedAddressId === id) {
      setSelectedAddressId(updatedAddresses.length > 0 ? updatedAddresses[0].id : null)
    }
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.sp * item.cartQuantity, 0)
  const deliveryFee = subtotal >= 299 ? 0 : 45
  const totalAmountBeforeSpecialPayments = subtotal + deliveryFee

  let codCharges = 0
  let toBePaidNow = 0
  let codDueAmount = 0
  let walletDeduction = 0

  if (selectedSpecialPaymentMethod === "partial-cod") {
    codCharges = 100
    toBePaidNow = totalAmountBeforeSpecialPayments * 0.3
    codDueAmount = totalAmountBeforeSpecialPayments - toBePaidNow + codCharges
  } else if (selectedSpecialPaymentMethod === "wallet-cash") {
    walletDeduction = 500
  }

  let finalTotal = totalAmountBeforeSpecialPayments + codCharges - walletDeduction
  if (finalTotal < 0) finalTotal = 0

  const displayedAddresses = showAllAddresses ? addresses : addresses.slice(0, 3)

  return (
    <>
     <ExtraNav/>
      <div className="max-w-7xl mx-auto p-[16px]">
        <div className="md:block hidden">
          <div className="flex items-center gap-4 mb-6 ">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Button>
            <h1 className="text-2xl font-bold">Checkout</h1>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 grid gap-6">
            {/* Delivered To Section */}
            <div className=" rounded-lg grid ">
              <h2 className="text-[14px] font-semibold text-gray_text mb-[16px]">Delivered to</h2>
              {addresses.length === 0 ? (
                <p className="text-muted-foreground text-sm">
                  No addresses saved. Please add one.
                </p>
              ) : (
                <div className="grid gap-4 p-2 border-2 border-border_bg rounded-[8px]">
                  {displayedAddresses.map((address) => (
                    <AddressCard
                      key={address.id}
                      address={address}
                      isSelected={selectedAddressId === address.id}
                      onSelect={setSelectedAddressId}
                      onEdit={handleEditAddress}
                      onDelete={handleDeleteAddress}
                      canDelete={addresses.length > 1}
                    />
                  ))}
                  
                </div>
              )}
              
              <div className="flex ">
                <Button
                  className="w-1/2 mx-2 my-2 flex items-center rounded-[8px] gap-2 text-primary bg-transparent border-2 border-primary "
                  onClick={() => {
                    setEditingAddress(null)
                    setIsAddressFormOpen(true)
                  }}
                >
                  <Plus className="h-4 w-4" /> 
                  Add address
                </Button>
                <div className="w-1/2 flex justify-end items-center flex-end ">
                  {addresses.length > 3 && !showAllAddresses && (
                        <Button
                          // variant="outline"
                          className=""
                          onClick={() => setShowAllAddresses(true)}
                        >
                          View More ({addresses.length - 3} more)
                        </Button>
                      )}
                      {addresses.length > 3 && showAllAddresses && (
                        <Button
                          // variant="outline"
                          className=""
                          onClick={() => setShowAllAddresses(false)}
                        >
                          View Less
                        </Button>
                      )}
                  </div>
                  </div>
            </div>

            {/* Payment Method Section */}
            <PaymentMethodSection
              selectedOnlinePaymentMethod={selectedOnlinePaymentMethod}
              setSelectedOnlinePaymentMethod={setSelectedOnlinePaymentMethod}
              selectedSpecialPaymentMethod={selectedSpecialPaymentMethod}
              setSelectedSpecialPaymentMethod={setSelectedSpecialPaymentMethod}
              totalAmountBeforeSpecialPayments={totalAmountBeforeSpecialPayments}
            />
          </div>

          {/* Right Side: Order Summary & Price Details */}
          <div className=" space-y-[16px] md:mt-[37px] mt-[0px]">
            {/* Order Summary Section */}
            <Collapsible open={isOrderSummaryOpen} onOpenChange={setIsOrderSummaryOpen} className="border-2  border-border_bg p-2 rounded-[8px] h-fit">
              <CollapsibleTrigger asChild>
                <div className="flex justify-between items-center  cursor-pointer">
                  <h2 className="text-[14px] font-semibold text-gray_text">Order Summary</h2>
                  
                  <Button variant="ghost" size="icon" className="h-auto w-auto p-0">
                    {isOrderSummaryOpen ? (
                      <ChevronUp className="h-5 w-5 transition-transform duration-300" />
                    ) : (
                      <ChevronDown className="h-5 w-5 transition-transform duration-300" />
                    )}
                    <span className="sr-only">Toggle order summary</span>
                  </Button>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="overflow-hidden transition-all duration-300 data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                <hr className="my-4 !h-[1.5px] !bg-hr_line !border-none rounded-full" />
                <div className="grid ">
                  {cartItems.map((item) => (
                    <div
                      key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                      className="flex items-center"
                    >
                      <Image
                        src={`/${item.imageurl}`}
                        alt={item.name}
                        width={64}
                        height={64}
                        className="aspect-square rounded-md object-cover"
                      />
                      <div className="grid gap-1 text-sm flex-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-muted-foreground">
                          Qty: {item.cartQuantity} | ₹{item.sp}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div className="flex items-center gap-2 text-[12px] text-center w-full text-delivery_text bg-delivery_bg p-2 rounded-[8px] font-medium">
                    <CheckCircle className="h-4 w-4" />
                    <span>Estimated Delivery in 28 July 2025</span>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Price Details Section */}
            <Collapsible open={isPriceDetailsOpen} onOpenChange={setIsPriceDetailsOpen} className="border-2 border-border_bg p-2 rounded-[8px] h-fit">
              <CollapsibleTrigger asChild>
                <div className="flex justify-between items-center cursor-pointer">
                  <h2 className="text-[14px] font-semibold text-gray_text">Price Details</h2>
                  <Button variant="ghost" size="icon" className="h-auto w-auto p-0">
                    {isPriceDetailsOpen ? (
                      <ChevronUp className="h-5 w-5 transition-transform duration-300" />
                    ) : (
                      <ChevronDown className="h-5 w-5 transition-transform duration-300" />
                    )}
                    <span className="sr-only">Toggle price details</span>
                  </Button>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="overflow-hidden transition-all duration-300 data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                <hr className="my-4 !h-[1.5px] !bg-hr_line !border-none rounded-full" />
                
                <div className="grid gap-2 text-sm  pt-0">
                  <div className="flex justify-between">
                    <span>Item Price & GST</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    {deliveryFee === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      <span>₹{deliveryFee.toFixed(2)}</span>
                    )}
                  </div>
                  {/* <Separator className="" /> */}
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>

                <hr className="my-4 h-[1.5px] border-0 bg-[repeating-linear-gradient(to_right,#cbcbcb_0_12px,transparent_10px_20px)]" />



                  {selectedSpecialPaymentMethod === "partial-cod" && (
                    <>
                      <div className="flex justify-between">
                        <span>COD Charges</span>
                        <span>₹{codCharges.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-primary font-medium">
                        <span>To Be Paid Now</span>
                        <span>₹{toBePaidNow.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-red-600 font-medium">
                        <span>COD Due Amount (Payable on delivery)</span>
                        <span>₹{codDueAmount.toFixed(2)}</span>
                      </div>
                    </>
                  )}

                  {selectedSpecialPaymentMethod === "wallet-cash" && (
                    <div className="flex justify-between text-green-600">
                      <span>Wallet Discount</span>
                      <span>- ₹{walletDeduction.toFixed(2)}</span>
                    </div>
                  )}
                </div>
              </CollapsibleContent>
              <div className="flex justify-between font-bold text-base my-2">
                    <span>Total</span>
                    <span>₹{finalTotal.toFixed(2)}</span>
                  </div>
                  {deliveryFee === 0 && (
                    <div className="text-green-600 text-xs font-medium mt-2">
                      *Free Delivery - Flat Rate ₹45
                    </div>
                  )}
            </Collapsible>

          <div className="border-2  border-border_bg p-2 rounded-[8px]">
            <div className="flex justify-between items-center text-xl font-bold">
              <span>Total Amount</span>
              <span>₹{finalTotal.toFixed(2)}</span>
            </div>
            <Button size="lg" className="w-full rounded-[8px] mt-[20px] text-white bg-[#457dff]"                                                                                         >
              Pay ₹{finalTotal.toFixed(2)}
            </Button>
          </div>

          </div>
        </div>

        {/* Footer Payment Logos */}
        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p className="mb-4">Safe and Secure Payments. 100% Authentic products.</p>
          <div className="flex justify-center items-center gap-4 flex-wrap">
            <img src="/placeholder.svg?height=24&width=40" alt="Visa" className="h-6" />
            <img src="/placeholder.svg?height=24&width=40" alt="Mastercard" className="h-6" />
            <img src="/placeholder.svg?height=24&width=40" alt="RuPay" className="h-6" />
            <img src="/placeholder.svg?height=24&width=40" alt="Google Pay" className="h-6" />
            <img src="/placeholder.svg?height=24&width=40" alt="PhonePe" className="h-6" />
            <img src="/placeholder.svg?height=24&width=40" alt="Paytm" className="h-6" />
            <img src="/placeholder.svg?height=24&width=40" alt="Amazon Pay" className="h-6" />
            <img src="/placeholder.svg?height=24&width=40" alt="PayPal" className="h-6" />
          </div>
        </div>

        <AddressFormDialog
          isOpen={isAddressFormOpen}
          onOpenChange={setIsAddressFormOpen}
          onSave={handleSaveAddress}
          editingAddress={editingAddress}
        />
      </div>

    </>
  )
}
