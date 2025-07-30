"use client"

import { Button } from "@/components/ui/button"
import { SlidersHorizontal, ArrowUpDown } from "lucide-react"

type BottomMobileBarProps = {
  onOpenFilterSheet: () => void
  onOpenSortSheet: () => void
}

export default function BottomMobileBar({ onOpenFilterSheet, onOpenSortSheet }: BottomMobileBarProps) {
  return (
    <div className="md:hidden sticky bottom-0 bg-white border-t shadow-lg z-10 flex justify-around py-3">
      <Button variant="ghost" className="flex  items-center gap-1 text-gray_text" onClick={onOpenSortSheet}>
        <ArrowUpDown className="w-5 h-5" />
        <span className="text-xs font-medium">Sort</span>
      </Button>
      <Button variant="ghost" className="flex  items-center gap-1 text-gray_text" onClick={onOpenFilterSheet}>
        <SlidersHorizontal className="w-5 h-5" />
        <span className="text-xs font-medium">Filter</span>
      </Button>
    </div>
  )
}
