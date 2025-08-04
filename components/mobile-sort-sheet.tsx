"use client"

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

type MobileSortSheetProps = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  sortBy: string
  onSortChange: (value: string) => void
}

export default function MobileSortSheet({ isOpen, onOpenChange, sortBy, onSortChange }: MobileSortSheetProps) {
  const sortOptions = [
    { value: "popularity", label: "Popularity" },
    { value: "new-arrival", label: "New Arrival" },
    { value: "price-high-to-low", label: "Price: High to Low" },
    { value: "price-low-to-high", label: "Price: Low to High" },
  ]

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[50vh] flex flex-col p-0">
        <SheetHeader className="flex flex-row items-center justify-between px-4 py-3 border-b">
          <SheetTitle className="text-lg font-semibold">Sort by</SheetTitle>
          <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)}>
            <X className="w-5 h-5" />
            <span className="sr-only">Close</span>
          </Button>
        </SheetHeader>
        <div className="flex-1 p-4 overflow-y-auto">
          <RadioGroup value={sortBy} onValueChange={onSortChange}>
            {sortOptions.map((option) => (
              <div key={option.value} className="flex items-center space-x-2 py-2">
                <RadioGroupItem value={option.value} id={`sort-${option.value}`} />
                <Label htmlFor={`sort-${option.value}`} className="text-base">
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </SheetContent>
    </Sheet>
  )
}