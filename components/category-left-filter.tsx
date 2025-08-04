"use client"

import { useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { ChevronDown, Check } from "lucide-react"
import type { Filters } from "@/app/category/[slug]/page"

type CategoryLeftFilterProps = {
  filters: Filters
  selectedFilters: { [key: string]: string[] }
  selectedMainCategory: string | null
  onFilterChange: (filterType: string, value: string, checked: boolean) => void
  onClearAll: () => void
  setCategorySlug: (slug: string) => void
}

export default function CategoryLeftFilter({
  filters,
  selectedFilters,
  selectedMainCategory,
  onFilterChange,
  onClearAll,
  setCategorySlug,
}: CategoryLeftFilterProps) {
  const [openAccordion, setOpenAccordion] = useState<string[]>(["category"])
  const [showAllCategories, setShowAllCategories] = useState(false)

  const handleAccordionChange = (value: string[]) => {
    setOpenAccordion(value)
  }

  const totalActiveFilters = Object.values(selectedFilters).flat().length
  const categoryOptions = filters.category
  const displayedCategories = showAllCategories ? categoryOptions : categoryOptions.slice(0, 5)
  const hasMoreCategories = categoryOptions.length > 5

  // Handle main category selection
  const handleMainCategoryChange = (value: string) => {
    onFilterChange("category", value, true)
    setCategorySlug(value) // Update URL only for main category changes
  }

  // Handle subcategory selection
  const handleSubcategoryChange = (subcatValue: string, checked: boolean, parentValue: string) => {
    onFilterChange("category", subcatValue, checked)
    if (checked) {
      setCategorySlug(subcatValue) // Update URL to subcategory
    } else {
      // If unchecking a subcategory, check if other subcategories under the same parent are selected
      const parentCategory = filters.category.find(cat =>
        cat.subcategories?.some(sub => sub.value === subcatValue)
      )
      const hasOtherSubcategories = selectedFilters.category.some(
        v => v !== subcatValue && filters.category
          .find(c => c.subcategories?.some(s => s.value === v))
          ?.value === parentCategory?.value
      )
      if (!hasOtherSubcategories && parentCategory) {
        setCategorySlug(parentCategory.value) // Revert to parent category URL
      }
    }
  }

  return (
    <aside
      className=" py-4 px-6 bg-white hidden md:flex flex-col sticky top-0 h-screen overflow-y-scroll"
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      <div className="flex justify-between items-center mb-4 flex-shrink-0">
        <h2 className="text-[18px] text-[#363537] font-semibold">Filters ({totalActiveFilters})</h2>
        <Button variant="link" size="sm" onClick={onClearAll} className="text-blue-600">
          Clear All
        </Button>
      </div>
      <Accordion
        type="multiple"
        value={openAccordion}
        onValueChange={handleAccordionChange}
        className="w-full flex-grow"
      >
        <AccordionItem value="category">
          <AccordionTrigger className="flex items-center justify-between !py-[16px] text-sm font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180">
            <span className="capitalize text-[16px] text-[#1A1E31]">Category</span>
            {/* <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" /> */}
          </AccordionTrigger>
          <AccordionContent className="pb-2 pt-0">
            <RadioGroup
              value={selectedMainCategory || undefined}
              onValueChange={handleMainCategoryChange}
            >
              {displayedCategories.map((option) => (
                <AccordionItem key={option.value} value={option.value}>
                  <div className="flex items-center justify-between py-[8px]">
                    <div className="flex items-center space-x-[8px]">
                      <div className="relative">
                        <RadioGroupItem
                          id={`category-${option.value}`}
                          value={option.value}
                          className={`w-5 h-5  border-2 border-gray-400 rounded-sm ${
                            selectedMainCategory === option.value ? "!bg-primary" : "!bg-white "
                          }`}
                        />
                        <Check
                          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 text-white -translate-y-1/2 w-3 h-3  ${
                            selectedMainCategory === option.value ? "opacity-100" : "opacity-0 "
                          }`}
                        />
                      </div>
                      <label
                        htmlFor={`category-${option.value}`}
                        className="text-[14px] text-gray_text font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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
                              id={`category-${subcat.value}`}
                              checked={selectedFilters.category?.includes(subcat.value)}
                              onCheckedChange={(checked) => handleSubcategoryChange(subcat.value, checked as boolean, option.value)}
                            />
                            <label
                              htmlFor={`category-${subcat.value}`}
                              className="text-[14px] text-gray_text font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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
            </RadioGroup>
            {hasMoreCategories && (
              <Button
                variant="link"
                size="sm"
                className="text-blue-600 mt-2 justify-start"
                onClick={() => setShowAllCategories(!showAllCategories)}
              >
                {showAllCategories ? "Show Less" : "Show More"}
              </Button>
            )}
          </AccordionContent>
        </AccordionItem>
        {Object.entries(filters)
          .filter(([filterType]) => filterType !== "category")
          .map(([filterType, options]) => (
            <AccordionItem key={filterType} value={filterType}>
              <AccordionTrigger className="flex items-center justify-between !py-[16px] text-sm font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180">
                <span className="capitalize text-[16px] text-[#1A1E31]">{filterType}</span>
                {/* <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" /> */}
              </AccordionTrigger>
              <AccordionContent className="pb-2 pt-0">
                <div className="grid gap-2">
                  {options.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                      <Checkbox
                        id={`${filterType}-${option.value}`}
                        checked={selectedFilters[filterType]?.includes(option.value)}
                        onCheckedChange={(checked) => onFilterChange(filterType, option.value, checked as boolean)}
                      />
                      <label
                        htmlFor={`${filterType}-${option.value}`}
                        className="text-[14px] text-gray_text font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {option.label} ({option.count})
                      </label>
                    </div>
                  ))}
                  {options.length > 5 && (
                    <Button
                      variant="link"
                      size="sm"
                      className="text-blue-600 mt-2 justify-start"
                      onClick={() => {} /* Add logic to show more options if needed */}
                    >
                      Show More
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