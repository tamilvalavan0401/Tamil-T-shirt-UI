"use client"

import { useState } from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import type { Filters } from "@/app/page" // Updated import path for types

type MobileFilterSheetProps = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  filters: Filters
  selectedFilters: { [key: string]: string[] }
  onFilterChange: (filterType: string, value: string, checked: boolean) => void
  onClearAll: () => void
  onApply: () => void
}

export default function MobileFilterSheet({
  isOpen,
  onOpenChange,
  filters,
  selectedFilters,
  onFilterChange,
  onClearAll,
  onApply,
}: MobileFilterSheetProps) {
  const [activeFilterCategory, setActiveFilterCategory] = useState<string>("category")

  const currentFilterOptions = filters[activeFilterCategory as keyof Filters] || []

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[90vh] flex flex-col p-0">
        <SheetHeader className="flex flex-row items-center justify-between px-4 py-3 border-b">
          <SheetTitle className="text-lg font-semibold">Filters</SheetTitle>
          <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)}>
            <X className="w-5 h-5" />
            <span className="sr-only">Close</span>
          </Button>
        </SheetHeader>
        <div className="flex flex-1 overflow-hidden">
          <div className="w-1/3 bg-gray-100 overflow-y-auto py-4">
            {Object.keys(filters).map((filterType) => (
              <Button
                key={filterType}
                variant="ghost"
                className={`w-full justify-start rounded-none px-4 py-3 text-sm capitalize ${
                  activeFilterCategory === filterType ? "bg-white text-blue-600 font-semibold" : "text-gray_text"
                }`}
                onClick={() => setActiveFilterCategory(filterType)}
              >
                {filterType}
              </Button>
            ))}
          </div>
          <div className="w-2/3 bg-white overflow-y-auto p-4">
            <div className="grid gap-3">
              {currentFilterOptions.map((option:any) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`mobile-${activeFilterCategory}-${option.value}`}
                    checked={selectedFilters[activeFilterCategory]?.includes(option.value)}
                    onCheckedChange={(checked) =>
                      onFilterChange(activeFilterCategory, option.value, checked as boolean)
                    }
                  />
                  <label
                    htmlFor={`mobile-${activeFilterCategory}-${option.value}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {option.label} ({option.count})
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex-shrink-0 flex border-t p-4 gap-2">
          <Button variant="outline" className="flex-1 bg-transparent" onClick={onClearAll}>
            Clear All
          </Button>
          <Button className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white" onClick={onApply}>
            Apply
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
