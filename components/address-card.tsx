"use client"

import { Button } from "@/components/ui/button"
// import type { Address } from "@/types/address"
import { cn } from "@/lib/utils"
import { Trash2, Edit } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { MdOutlineRadioButtonChecked } from "react-icons/md"
import { IoRadioButtonOffOutline } from "react-icons/io5";

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

interface AddressCardProps {
  address: Address
  isSelected: boolean
  onSelect: (id: string) => void
  onEdit: (address: Address) => void
  onDelete: (id: string) => void
  canDelete: boolean
}

export default function AddressCard({ address, isSelected, onSelect, onEdit, onDelete, canDelete }: AddressCardProps) {
  return (
    <div
      className={cn(
        "border-b-2 border-border_bg last:border-b-0 p-6 grid gap-4 cursor-pointer transition-all duration-200 relative",
        // isSelected ? "border-primary border-[#000000] ring-2 ring-primary/50 !shadow-md" : "border-border_bg hover:border-gray-300",
      )}
      onClick={() => onSelect(address.id)}
    >
      {/* Radio button icon */}
      <div className="absolute top-2 left-2">
        {isSelected ? (
          <MdOutlineRadioButtonChecked className="text-primary w-5 h-5" />
        ) : (
          <IoRadioButtonOffOutline className="!text-primary w-5 h-5" />
        )}
      </div>

      <div className="flex sm:flex-row flex-col justify-between items-start ">
        <div className="grid gap-1 text-sm">
          <div className="flex items-center gap-2">
            <span className="font-medium">
              {address.firstName} {address.lastName}
            </span>
            <span className="text-muted-foreground text-xs px-2 py-0.5 rounded-full bg-gray-100">
              {address.saveAs.toUpperCase()}
            </span>
          </div>
          <p>
            {address.doorNoStreet}, {address.localityTownDistrict}, {address.city}, {address.state} {address.pinCode}.
          </p>
          <p >Mobile: <span className="font-semibold">{address.phone}</span></p>
        </div>
        {isSelected && (
          <div className="flex gap-2 sm:mt-[16px] mt-[16px]">
            <Button
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                onEdit(address)
              }}
              className="border-none bg-hr_line rounded-[8px]"
            >
              <Edit className="h-4 w-4 mr-1" /> Edit
            </Button>
            {canDelete && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button size="sm" className="text-error hover:text-error_hover  border-none bg-hr_line rounded-[8px] ">
                    <Trash2 className="h-4 w-4 mr-1" /> Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="!bg-white !p-4 !rounded-[8px] !border-none">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your address.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="bg-primary hover:bg-primary_hover border-none hover:text-white text-white rounded-[8px]">Cancel</AlertDialogCancel>
                    <AlertDialogAction className="bg-error hover:bg-error_hover border-none text-white rounded-[8px]" onClick={() => onDelete(address.id)}>Delete</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
