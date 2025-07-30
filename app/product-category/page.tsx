"use client"

import { useEffect, useMemo, useState } from "react"
// import TopBanner from "@/components/top-banner"
// import Breadcrumbs from "@/components/breadcrumbs"
// import MobileNav from "@/components/mobile-nav"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import CategoryLeftFilter from "@/components/category-left-filter"
import ProductCard from "@/components/product-card"
import SortDropdown from "@/components/sort-dropdown"
import MobileFilterSheet from "@/components/mobile-filter-sheet"
import MobileSortSheet from "@/components/mobile-sort-sheet"
import BottomMobileBar from "@/components/bottom-mobile-bar"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
// import productsData from "../products.json" // Direct import

// --- Types moved from lib/data.ts ---
export type Product = {
  imageurl: string
  id: number
  storeid: number
  products_id: number
  category_id: number
  category_ids: string | null
  size_id: string | null
  colorcodes_id: number | null
  weight_id: number | null
  products_group_id: number
  quantity: number
  mrp: number
  sp: number
  sortorder: number
  visibility: number
  gst_rate: string
  hsn_code: string
  zoho_item_id: string | null
  old_zoho_item_id: string | null
  created_at: string
  updated_at: string
  esin: string
  product_tags: string | null
  meta_tag_title: string
  meta_tag_desc: string
  customizable: number
  variation: string
  name: string
  eng_name: string
  sku: string
  descp: string
  shrtdesc: string
  seo_url: string
  weight: string | null
  city_shipping: string | null
  state_shipping: string | null
  national_shipping: string | null
  delivery_time: string | null
  status: string
  is_featured: string | null
  category_storeid: number
  category_subcat: number
  category_is_featured: number
  category_name: string
  category_description: string | null
  category_seo_url: string
  category_meta_tag_title: string
  category_meta_tag_desc: string
  category_meta_tag_keywords: string | null
  category_cat_img: string | null
  category_parent_id: number
  category_sortorder: number
  category_status: number
  category_created_at: string
  category_updated_at: string
  group_seo_url: string
}

export type FilterOption = {
  value: string
  label: string
  count: number
}

export type Filters = {
  category: FilterOption[]
  sizes: FilterOption[]
  brand: FilterOption[]
  color: FilterOption[]
  design: FilterOption[]
  fit: FilterOption[]
  sleeve: FilterOption[]
  neck: FilterOption[]
  type: FilterOption[]
  ratings: FilterOption[]
  offers: FilterOption[]
}
// --- End of Types ---

// Helper function to map size IDs to labels (example)
function getSizeLabel(sizeId: string): string {
  switch (sizeId) {
    case "149":
      return "XS"
    case "151":
      return "S"
    case "152":
      return "M"
    case "153":
      return "L"
    case "154":
      return "XL"
    default:
      return "Unknown"
  }
}

export default function ProductListingPage() {
  /* ---------------- state ---------------- */
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [filtersData, setFiltersData] = useState<Filters | null>(null)

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({})
  const [sortBy, setSortBy] = useState("popularity")

  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false)
  const [isSortSheetOpen, setIsSortSheetOpen] = useState(false)

  /* --------------- load data and process filters -------------- */
  useEffect(() => {
    async function load() {
      const res = await fetch("/products.json")
      const products: Product[] = await res.json()
      setAllProducts(products)

      const categoriesMap = new Map<string, number>()
      const sizesMap = new Map<string, number>()
      const brandsMap = new Map<string, number>()
      const colorsMap = new Map<string, number>()
      const designsMap = new Map<string, number>()
      const fitsMap = new Map<string, number>()
      const sleevesMap = new Map<string, number>()
      const necksMap = new Map<string, number>()
      const typesMap = new Map<string, number>()
      const ratingsMap = new Map<string, number>()
      const offersMap = new Map<string, number>()

      products.forEach((product) => {
        // Categories
        const categoryName = product.category_name
        categoriesMap.set(categoryName, (categoriesMap.get(categoryName) || 0) + 1)

        // Sizes (assuming size_id is a comma-separated string of size IDs, we'll just use a placeholder for now)
        if (product.size_id) {
          product.size_id.split(",").forEach((size) => {
            const sizeLabel = getSizeLabel(size) // Map ID to label if needed
            sizesMap.set(sizeLabel, (sizesMap.get(sizeLabel) || 0) + 1)
          })
        }

        // Brand (using a placeholder for brand, as it's not explicitly in the JSON)
        const brandName = "tamiltshirts®" // Placeholder brand
        brandsMap.set(brandName, (brandsMap.get(brandName) || 0) + 1)

        // Color (using a placeholder for color, as it's not explicitly in the JSON)
        const colorName = "Black" // Placeholder color
        colorsMap.set(colorName, (colorsMap.get(colorName) || 0) + 1)

        // Design (using a placeholder for design, as it's not explicitly in the JSON)
        const designName = "Graphic print" // Placeholder design
        designsMap.set(designName, (designsMap.get(designName) || 0) + 1)

        // Fit (using a placeholder for fit)
        const fitName = "Regular" // Placeholder fit
        fitsMap.set(fitName, (fitsMap.get(fitName) || 0) + 1)

        // Sleeve (using a placeholder for sleeve)
        const sleeveName = "Half Sleeve" // Placeholder sleeve
        sleevesMap.set(sleeveName, (sleevesMap.get(sleeveName) || 0) + 1)

        // Neck (using a placeholder for neck)
        const neckName = "Round Neck" // Placeholder neck
        necksMap.set(neckName, (necksMap.get(neckName) || 0) + 1)

        // Type (using a placeholder for type)
        const typeName = "T-Shirt" // Placeholder type
        typesMap.set(typeName, (typesMap.get(typeName) || 0) + 1)

        // Ratings (using a placeholder for ratings)
        const rating = "4 Stars & Up" // Placeholder rating
        ratingsMap.set(rating, (ratingsMap.get(rating) || 0) + 1)

        // Offers (using a placeholder for offers)
        const offer = "Buy 2 Get 1 Free" // Placeholder offer
        offersMap.set(offer, (offersMap.get(offer) || 0) + 1)
      })

      const mapToFilterOptions = (map: Map<string, number>): FilterOption[] =>
        Array.from(map.entries()).map(([label, count]) => ({
          value: label.toLowerCase().replace(/\s/g, "-"),
          label,
          count,
        }))

      const filters: Filters = {
        category: mapToFilterOptions(categoriesMap),
        sizes: mapToFilterOptions(sizesMap),
        brand: mapToFilterOptions(brandsMap),
        color: mapToFilterOptions(colorsMap),
        design: mapToFilterOptions(designsMap),
        fit: mapToFilterOptions(fitsMap),
        sleeve: mapToFilterOptions(sleevesMap),
        neck: mapToFilterOptions(necksMap),
        type: mapToFilterOptions(typesMap),
        ratings: mapToFilterOptions(ratingsMap),
        offers: mapToFilterOptions(offersMap),
      }

      setFiltersData(filters)

      // default to first category for mobile tabs and initial filter state
      if (filters.category.length) {
        const firstCat = filters.category[0].value
        setSelectedCategory(firstCat)
        setSelectedFilters({ category: [firstCat] })
      }
    }
    load()
  }, [])

  /* --------------- handlers -------------- */
  const handleFilterChange = (filterType: string, value: string, checked: boolean) => {
    setSelectedFilters((prev) => {
      const current = prev[filterType] ?? []
      const next = checked ? [...current, value] : current.filter((v) => v !== value)
      return { ...prev, [filterType]: next }
    })
  }

  const clearAllFilters = () => {
    setSelectedFilters({})
    setSelectedCategory(null) // Also clear selected category for mobile tabs
  }

  const handleCategorySelect = (cat: string | null) => {
    setSelectedCategory(cat)
    // When a mobile category tab is selected, it acts as a single-select filter
    setSelectedFilters((prev) => ({ ...prev, category: cat ? [cat] : [] }))
  }

  /* ------- derive filtered + sorted list ------- */
  const productsToShow = useMemo(() => {
    let list = [...allProducts]

    // Apply all selected filters
    Object.entries(selectedFilters).forEach(([filterType, values]) => {
      if (!values.length) return

      list = list.filter((product) => {
        switch (filterType) {
          case "category":
            return values.includes(product.category_name.toLowerCase().replace(/\s/g, "-"))
          case "sizes":
            // Assuming product.size_id is a comma-separated string of size IDs
            // This is a simplified check, you might need a more robust mapping
            return values.some((val) => product.size_id?.toLowerCase().includes(val))
          case "brand":
            // Placeholder logic for brand, adjust based on your actual product data
            return values.includes("tamiltshirts®")
          case "color":
            // Placeholder logic for color, adjust based on your actual product data
            return values.includes("black")
          case "design":
            // Placeholder logic for design, adjust based on your actual product data
            return values.includes("graphic-print")
          case "fit":
            // Placeholder logic for fit, adjust based on your actual product data
            return values.includes("regular")
          case "sleeve":
            // Placeholder logic for sleeve, adjust based on your actual product data
            return values.includes("half-sleeve")
          case "neck":
            // Placeholder logic for neck, adjust based on your actual product data
            return values.includes("round-neck")
          case "type":
            // Placeholder logic for type, adjust based on your actual product data
            return values.includes("t-shirt")
          case "ratings":
            // Placeholder logic for ratings, adjust based on your actual product data
            return values.includes("4-stars-&-up")
          case "offers":
            // Placeholder logic for offers, adjust based on your actual product data
            return values.includes("buy-2-get-1-free")
          default:
            return true
        }
      })
    })

    /* sorting */
    list.sort((a, b) => {
      switch (sortBy) {
        case "new-arrival":
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        case "price-high-to-low":
          return b.sp - a.sp
        case "price-low-to-high":
          return a.sp - b.sp
        case "popularity":
        default:
          return 0 // No specific popularity data, keep original order or implement custom logic
      }
    })
    return list
  }, [allProducts, selectedFilters, sortBy]) // Removed selectedCategory from dependencies as selectedFilters is the source of truth

  const productCount = productsToShow.length
  const categoryOptions = filtersData?.category ?? []

  /* ---------------- render ---------------- */
  return (
    <>
    <Navbar/>
    <div className="min-h-screen flex flex-col ">
      <div className="bg-primary text-white text-center py-2 text-sm font-medium">
        <p>FREE SHIPPING on all orders above ₹399</p>
      </div>
      
        <div className="max-w-[90rem] mx-auto">
            <nav className="bg-white px-4 py-3 text-sm text-gray_text flex items-center ">
              <Link href="#" className="hover:underline">
                  Home
              </Link>
              <ChevronRight className="w-4 h-4 mx-1" />
              <Link href="#" className="hover:underline">
                  Men Clothing
              </Link>
            </nav>

            <div className="flex flex-1 ">
              {filtersData && (
                <CategoryLeftFilter
                  filters={filtersData}
                  selectedFilters={selectedFilters}
                  onFilterChange={handleFilterChange}
                  onClearAll={clearAllFilters}
                />
              )}

              <main className="flex-1 p-4 md:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-[22px] text-[#363735] font-bold">
                    Clothes for Men <span className="text-[#676767] text-[14px]">({productCount} Products)</span>
                  </h2>
                  <div className="hidden md:block">
                    <SortDropdown sortBy={sortBy} onSortChange={setSortBy} />
                  </div>
                </div>

                {/* Product Grid Layout: 2 columns on mobile, 3 columns on larger devices */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                  {productsToShow.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              </main>
            </div>

            {filtersData && (
              <>
                <MobileFilterSheet
                  isOpen={isFilterSheetOpen}
                  onOpenChange={setIsFilterSheetOpen}
                  filters={filtersData}
                  selectedFilters={selectedFilters}
                  onFilterChange={handleFilterChange}
                  onClearAll={clearAllFilters}
                  onApply={() => {
                  }}
                />
                <MobileSortSheet
                  isOpen={isSortSheetOpen}
                  onOpenChange={setIsSortSheetOpen}
                  sortBy={sortBy}
                  onSortChange={setSortBy}
                />
              </>
            )}

            <BottomMobileBar
              onOpenFilterSheet={() => setIsFilterSheetOpen(true)}
              onOpenSortSheet={() => setIsSortSheetOpen(true)}
            />
        </div>
    </div>
    <Footer/>
    </>
  )
}
