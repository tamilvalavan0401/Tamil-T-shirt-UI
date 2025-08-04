"use client"

import { useState, useEffect } from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { X, ChevronDown, Check } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import type { Filters } from "@/app/category/[slug]/page"

type MobileFilterSheetProps = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  filters: Filters
  selectedFilters: { [key: string]: string[] }
  selectedMainCategory: string | null
  onFilterChange: (filterType: string, value: string, checked: boolean) => void
  onClearAll: () => void
  onApply: () => void
  setCategorySlug: (slug: string) => void
}

export default function MobileFilterSheet({
  isOpen,
  onOpenChange,
  filters,
  selectedFilters,
  selectedMainCategory,
  onFilterChange,
  onClearAll,
  onApply,
  setCategorySlug,
}: MobileFilterSheetProps) {
  const [activeFilterCategory, setActiveFilterCategory] = useState<string>("category")
  const [tempMainCategory, setTempMainCategory] = useState<string | null>(selectedMainCategory)
  const [tempFilters, setTempFilters] = useState<Record<string, string[]>>(selectedFilters)
  const [openAccordion, setOpenAccordion] = useState<string[]>(["category"])

  // Sync temp state with props when sheet opens
  useEffect(() => {
    if (isOpen) {
      setTempMainCategory(selectedMainCategory)
      setTempFilters(selectedFilters)
    }
  }, [isOpen, selectedMainCategory, selectedFilters])

  const handleTempFilterChange = (filterType: string, value: string, checked: boolean) => {
    setTempFilters((prev) => {
      const current = prev[filterType] ?? []
      const category = filters.category.find(cat => cat.value === value)
      const isMainCategory = category && !category.subcategories

      if (filterType === "category" && isMainCategory) {
        if (checked) {
          return { ...prev, category: [value] }
        } else {
          return { ...prev, category: [] }
        }
      } else if (filterType === "category" && category) {
        const parentCategory = filters.category.find(cat => cat.subcategories?.some(sub => sub.value === value))
        const parentSeoUrl = parentCategory?.value
        if (checked) {
          const newFilters = parentSeoUrl ? [parentSeoUrl, value] : [value]
          return { ...prev, category: newFilters }
        } else {
          const newFilters = current.filter(v => v !== value)
          const hasOtherSubcategories = newFilters.some(v => {
            const cat = filters.category.find(c => c.subcategories?.some(sub => sub.value === v))
            return cat?.value === parentCategory?.value && v !== value
          })
          if (!hasOtherSubcategories && parentSeoUrl) {
            newFilters.push(parentSeoUrl)
          }
          return { ...prev, category: newFilters }
        }
      } else {
        const next = checked ? [...current, value] : current.filter((v) => v !== value)
        return { ...prev, [filterType]: next }
      }
    })

    if (filterType === "category" && category) {
      if (!category.subcategories) {
        setTempMainCategory(checked ? value : null)
      } else if (checked) {
        const parentCategory = filters.category.find(cat => cat.subcategories?.some(sub => sub.value === value))
        setTempMainCategory(parentCategory?.value || null)
      }
    }
  }

  const handleApply = () => {
    // Apply temporary filters
    Object.entries(tempFilters).forEach(([filterType, values]) => {
      values.forEach(value => {
        const isChecked = !selectedFilters[filterType]?.includes(value)
        if (isChecked || selectedFilters[filterType]?.includes(value)) {
          onFilterChange(filterType, value, isChecked)
        }
      })
      // Remove filters that are no longer in tempFilters
      selectedFilters[filterType]?.forEach(value => {
        if (!values.includes(value)) {
          onFilterChange(filterType, value, false)
        }
      })
    })

    // Update URL based on category selection
    const selectedCategory = tempFilters.category?.length > 0
      ? tempFilters.category.find(value => {
          const cat = filters.category.find(c => c.subcategories?.some(sub => sub.value === value)) || filters.category.find(c => c.value === value)
          return cat && cat.subcategories
        }) || tempFilters.category[0]
      : null

    if (selectedCategory) {
      setCategorySlug(selectedCategory)
    } else {
      setCategorySlug(filters.category[0]?.value || "")
    }

    onApply()
  }

  const handleClearAll = () => {
    setTempFilters({ category: [] })
    setTempMainCategory(null)
    onClearAll()
    setCategorySlug(filters.category[0]?.value || "")
  }

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
            {activeFilterCategory === "category" ? (
              <RadioGroup
                value={tempMainCategory || undefined}
                onValueChange={(value) => handleTempFilterChange("category", value, true)}
              >
                <Accordion type="multiple" value={openAccordion} onValueChange={setOpenAccordion} className="w-full">
                  {currentFilterOptions.map((option) => (
                    <AccordionItem key={option.value} value={option.value}>
                      <div className="flex items-center justify-between py-[8px]">
                        <div className="flex items-center space-x-[8px]">
                          <div className="relative">
                            <RadioGroupItem
                              id={`mobile-category-${option.value}`}
                              value={option.value}
                              className={`w-5 h-5  border-2 border-gray-400 rounded-sm ${
                            selectedMainCategory === option.value ? "!bg-primary" : "!bg-white "
                          }`}
                            />
                            <Check
                              className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-white ${
                                tempMainCategory === option.value ? "opacity-100 text-white" : "opacity-0 text-white"
                              }`}
                            />
                          </div>
                          <label
                            htmlFor={`mobile-category-${option.value}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {option.label} ({option.count})
                          </label>
                        </div>
                        {option.subcategories && option.subcategories.length > 0 && (
                          <AccordionTrigger className="p-0">
                            {/* <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" /> */}
                          </AccordionTrigger>
                        )}
                      </div>
                      {option.subcategories && option.subcategories.length > 0 && (
                        <AccordionContent className="pb-2 pt-0 ml-6">
                          <div className="grid gap-2">
                            {option.subcategories.map((subcat) => (
                              <div key={subcat.value} className="flex items-center space-x-[8px]">
                                <Checkbox
                                  id={`mobile-category-${subcat.value}`}
                                  checked={tempFilters.category?.includes(subcat.value)}
                                  onCheckedChange={(checked) => handleTempFilterChange("category", subcat.value, checked as boolean)}
                                />
                                <label
                                  htmlFor={`mobile-category-${subcat.value}`}
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  {subcat.label} ({subcat.count})
                                </label>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      )}
                    </AccordionItem>
                  ))}
                </Accordion>
              </RadioGroup>
            ) : (
              <div className="grid gap-3">
                {currentFilterOptions.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={`mobile-${activeFilterCategory}-${option.value}`}
                      checked={tempFilters[activeFilterCategory]?.includes(option.value)}
                      onCheckedChange={(checked) => handleTempFilterChange(activeFilterCategory, option.value, checked as boolean)}
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
            )}
          </div>
        </div>
        <div className="flex-shrink-0 flex border-t p-4 gap-2">
          <Button variant="outline" className="flex-1 bg-transparent" onClick={handleClearAll}>
            Clear All
          </Button>
          <Button className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white" onClick={handleApply}>
            Apply
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}