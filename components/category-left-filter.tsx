"use client"

import { useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import type { Filters } from "@/app/page" // Updated import path for types
import { ChevronDown } from "lucide-react"

type CategoryLeftFilterProps = {
  filters: Filters
  selectedFilters: { [key: string]: string[] }
  onFilterChange: (filterType: string, value: string, checked: boolean) => void
  onClearAll: () => void
}

export default function CategoryLeftFilter({
  filters,
  selectedFilters,
  onFilterChange,
  onClearAll,
}: CategoryLeftFilterProps) {
  const [openAccordion, setOpenAccordion] = useState<string[]>(["category"]) // Keep category open by default
  const [showAllCategories, setShowAllCategories] = useState(false) // State for "Show More/Less"

  const handleAccordionChange = (value: string[]) => {
    setOpenAccordion(value)
  }

  const totalActiveFilters = Object.values(selectedFilters).flat().length

  const categoryOptions = filters.category
  const displayedCategories = showAllCategories ? categoryOptions : categoryOptions.slice(0, 5)
  const hasMoreCategories = categoryOptions.length > 5

  return (
    <aside className=" w-3/12 py-4 px-6 bg-white hidden md:flex flex-col sticky top-0 h-screen overflow-y-scroll"
    style={{
    scrollbarWidth: "none",       /* Firefox */
    msOverflowStyle: "none",      /* IE & Edge */
  }}
    >
      
      {/* Changed to overflow-y-scroll */}
      <div className="flex justify-between items-center mb-4 flex-shrink-0">
        <h2 className="text-[18px] text-[#363537] font-semibold">Filters({totalActiveFilters})</h2>
        <Button variant="link" size="sm" onClick={onClearAll} className="text-blue-600">
          Clear All
        </Button>
      </div>
      <Accordion
        type="multiple"
        value={openAccordion}
        onValueChange={handleAccordionChange}
        className="w-full flex-grow" // Removed overflow-y-auto here, let parent handle scroll
      >
        {Object.entries(filters).map(([filterType, options]) => (
          <AccordionItem key={filterType} value={filterType}>
            <AccordionTrigger className="flex items-center justify-between !py-[16px] text-sm font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180">
              <span className="capitalize text-[16px] text-[#1A1E31]">{filterType}</span>
              {/* <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" /> */}
            </AccordionTrigger>
            <AccordionContent className="pb-2 pt-0">
              <div className="grid gap-2">
                {filterType === "category"
                  ? displayedCategories.map((option:any) => (
                      <div key={option.value} className="flex py-[8px] items-center  space-x-[8px]">
                        <Checkbox
                          id={`${filterType}-${option.value}`}
                          checked={selectedFilters[filterType]?.includes(option.value)}
                          onCheckedChange={(checked) => onFilterChange(filterType, option.value, checked as boolean)}
                        />
                        <label
                          htmlFor={`${filterType}-${option.value}`}
                          className="text-[14px] text-[#676767] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {option.label} ({option.count})
                        </label>
                      </div>
                    ))
                  : options.map((option:any) => (
                      <div key={option.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={`${filterType}-${option.value}`}
                          checked={selectedFilters[filterType]?.includes(option.value)}
                          onCheckedChange={(checked) => onFilterChange(filterType, option.value, checked as boolean)}
                        />
                        <label
                          htmlFor={`${filterType}-${option.value}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {option.label} ({option.count})
                        </label>
                      </div>
                    ))}
                {filterType === "category" && hasMoreCategories && (
                  <Button
                    variant="link"
                    size="sm"
                    className="text-blue-600 mt-2 justify-start"
                    onClick={() => setShowAllCategories(!showAllCategories)}
                  >
                    {showAllCategories ? "Show Less" : "Show More"}
                  </Button>
                )}
                {filterType !== "category" &&
                  options.length > 5 && ( // Example: show "Show" button if more than 5 options for other filters
                    <Button variant="link" size="sm" className="text-blue-600 mt-2 justify-start">
                      Show
                    </Button>
                  )}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </aside>
  )
}
