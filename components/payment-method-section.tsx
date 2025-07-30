"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import type { Dispatch, SetStateAction } from "react"

export type OnlinePaymentOption = "upi-netbanking" | "razorpay"
export type SpecialPaymentOption = "partial-cod" | "wallet-cash" | null

interface PaymentMethodSectionProps {
  selectedOnlinePaymentMethod: OnlinePaymentOption
  setSelectedOnlinePaymentMethod: Dispatch<SetStateAction<OnlinePaymentOption>>
  selectedSpecialPaymentMethod: SpecialPaymentOption
  setSelectedSpecialPaymentMethod: Dispatch<SetStateAction<SpecialPaymentOption>>
  totalAmountBeforeSpecialPayments: number // Total amount before Partial COD/Wallet deductions
}

export default function PaymentMethodSection({
  selectedOnlinePaymentMethod,
  setSelectedOnlinePaymentMethod,
  selectedSpecialPaymentMethod,
  setSelectedSpecialPaymentMethod,
  totalAmountBeforeSpecialPayments,
}: PaymentMethodSectionProps) {
  const partialCodAmountToBePaidNow = totalAmountBeforeSpecialPayments * 0.3 // 30% of total amount
  const codCharges = 100 // Fixed COD charge
  const codDueAmount = totalAmountBeforeSpecialPayments - partialCodAmountToBePaidNow + codCharges
  const walletAmount = 500

  const handleSpecialPaymentChange = (value: SpecialPaymentOption, checked: boolean) => {
    if (checked) {
      setSelectedSpecialPaymentMethod(value)
    } else {
      // If unchecking the currently selected one, set to null
      if (selectedSpecialPaymentMethod === value) {
        setSelectedSpecialPaymentMethod(null)
      }
    }
  }

  return (
    <div className="border-none rounded-lg  grid gap-4">
      <h2 className="text-[14px] font-semibold text-gray_text">Payment Method</h2>
      <div className="border-2 border-border_bg p-4 rounded-[8px]">

        <div>
            <p className="font-medium text-gray_text text-[14px]">UPI/Net banking/Cards</p>
        </div>

        <RadioGroup
          value={selectedOnlinePaymentMethod}
          onValueChange={(value: OnlinePaymentOption) => setSelectedOnlinePaymentMethod(value)}
          className="grid"
        >
          
          <Label
            htmlFor="razorpay"
            className="flex items-center gap-3 cursor-pointer rounded-md border-none py-4 [&:has(:checked)]:bg-muted"
          >
            <RadioGroupItem id="razorpay" value="razorpay" />
            <div className="grid gap-1">
              <span className="font-medium">Razorpay</span>
            </div>
          </Label>
        </RadioGroup>

      </div>

      <div className="grid gap-4 ">
        <div className="border-2 border-border_bg p-4 rounded-[8px]">
          <p className="font-medium text-gray_text pb-4 text-[14px]">Partial COD</p>

          <Label
            htmlFor="partial-cod"
            className="flex items-center gap-3 cursor-pointer rounded-md border-none [&:has(:checked)]:bg-muted"
          >
            <Checkbox
              id="partial-cod"
              checked={selectedSpecialPaymentMethod === "partial-cod"}
              onCheckedChange={(checked) =>
                handleSpecialPaymentChange("partial-cod", typeof checked === "boolean" ? checked : false)
              }
            />
            <div className="grid gap-1">
              <span className="text-sm text-muted-foreground">Pay a part now, the rest on delivery</span>
              <span className="text-[12px] font-medium  bg-cod_bg text-cod_text w-fit p-1 rounded-full">
                ₹ {partialCodAmountToBePaidNow.toFixed(2)} Now + ₹ {codCharges.toFixed(2)} COD
              </span>
            </div>
          </Label>
        </div>

        <div className="border-2 border-border_bg p-4 rounded-[8px]">
          <p className="font-medium text-gray_text pb-4 text-[14px]">Partial COD</p>
          <Label
            htmlFor="wallet-cash"
            className="flex border-none items-center gap-3 cursor-pointer rounded-md border [&:has(:checked)]:bg-muted"
          >
            <Checkbox
              id="wallet-cash"
              checked={selectedSpecialPaymentMethod === "wallet-cash"}
              onCheckedChange={(checked) =>
                handleSpecialPaymentChange("wallet-cash", typeof checked === "boolean" ? checked : false)
              }
            />
            <div className="grid gap-1 flex-1">
              <span className="font-medium">TamilTshirts Wallet</span>
            </div>
            <span className="font-medium">₹ {walletAmount.toFixed(2)}</span>
          </Label>
        </div>
      </div>
    </div>
  )
}
