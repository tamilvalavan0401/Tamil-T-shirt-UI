"use client"

import { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

type SortDropdownProps = {
  sortBy: string
  onSortChange: (value: string) => void
}

export default function SortDropdown({ sortBy, onSortChange }: SortDropdownProps) {
  const [open, setOpen] = useState(false)

  const sortOptions = [
    { value: "popularity", label: "Popularity" },
    { value: "new-arrival", label: "New Arrival" },
    { value: "price-high-to-low", label: "Price: High to Low" },
    { value: "price-low-to-high", label: "Price: Low to High" },
  ]

  const currentSortLabel =
    sortOptions.find((option) => option.value === sortBy)?.label || "Popularity"

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setOpen(false)}
        />
      )}
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex text-[#666875] items-center gap-2 bg-transparent">
            Sort by : <span className="text-black">{currentSortLabel}</span>
            <ChevronDown className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 bg-white z-50">
          <DropdownMenuRadioGroup value={sortBy} onValueChange={onSortChange}>
            {sortOptions.map((option) => (
              <DropdownMenuRadioItem key={option.value} value={option.value}>
                {option.label}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}