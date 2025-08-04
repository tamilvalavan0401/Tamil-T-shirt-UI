"use client"

import { useEffect, useMemo, useState } from "react"
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
import { Button } from "@/components/ui/button"
import FlashOffer from "@/components/FlashOffer"
import Bag from '@/public/images/bag.svg'

// --- Types ---
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
  subcategories?: FilterOption[]
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

export type Category = {
  name: string
  seo_url: string
  meta_tag_title: string
  meta_tag_desc: string
  cat_img: string | null
  banner: string | null
  subcat: number
  parent_id: number
  sortorder: number
  id: number
}

// Helper function to map size IDs to labels
function getSizeLabel(sizeId: string): string {
  switch (sizeId) {
    case "149": return "XS"
    case "151": return "S"
    case "152": return "M"
    case "153": return "L"
    case "154": return "XL"
    default: return "Unknown"
  }
}

export default function ProductListingPage() {
  /* ---------------- state ---------------- */
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [filtersData, setFiltersData] = useState<Filters | null>(null)
  const [selectedMainCategory, setSelectedMainCategory] = useState<string | null>(null)
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({ category: [] })
  const [sortBy, setSortBy] = useState("popularity")
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false)
  const [isSortSheetOpen, setIsSortSheetOpen] = useState(false)

  /* --------------- load data and process filters -------------- */
  useEffect(() => {
    async function load() {
      try {
        // Fetch categories
        const catRes = await fetch("https://assetsvilva.blr1.cdn.digitaloceanspaces.com/ecomsaas/redisapi/hq2Tam171123/category.json")
        if (!catRes.ok) throw new Error("Failed to fetch categories")
        const categoriesData: Category[] = await catRes.json()
        setCategories(categoriesData)

        // Fetch products
        const prodRes = await fetch("https://assetsvilva.blr1.cdn.digitaloceanspaces.com/ecomsaas/redisapi/hq2Tam171123/products.json")
        if (!prodRes.ok) throw new Error("Failed to fetch products")
        const products: Product[] = await prodRes.json()
        setAllProducts(products)

        // Process categories
        const mainCategories = categoriesData.filter(cat => cat.parent_id === 0)
        const subCategories = categoriesData.filter(cat => cat.parent_id !== 0)

        const categoriesMap = new Map<string, { label: string, count: number, subcategories: FilterOption[] }>()
        
        // Initialize main categories
        mainCategories.forEach(cat => {
          categoriesMap.set(cat.seo_url, {
            label: cat.name,
            count: 0,
            subcategories: []
          })
        })

        // Add subcategories to their respective main categories
        subCategories.forEach(subcat => {
          const parent = mainCategories.find(cat => cat.id === subcat.parent_id)
          if (parent) {
            const parentEntry = categoriesMap.get(parent.seo_url)
            if (parentEntry) {
              parentEntry.subcategories.push({
                value: subcat.seo_url,
                label: subcat.name,
                count: 0
              })
            }
          }
        })

        // Count products per category and subcategory
        products.forEach(product => {
          const category = categoriesData.find(cat => cat.id === product.category_id)
          if (category) {
            if (category.parent_id === 0) {
              const entry = categoriesMap.get(category.seo_url)
              if (entry) entry.count += 1
            } else {
              const parent = mainCategories.find(cat => cat.id === category.parent_id)
              if (parent) {
                const parentEntry = categoriesMap.get(parent.seo_url)
                if (parentEntry) {
                  parentEntry.count += 1
                  const subcat = parentEntry.subcategories.find(sc => sc.value === category.seo_url)
                  if (subcat) subcat.count += 1
                }
              }
            }
          }
        })

        // Other filters
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
          if (product.size_id) {
            product.size_id.split(",").forEach((size) => {
              const sizeLabel = getSizeLabel(size)
              sizesMap.set(sizeLabel, (sizesMap.get(sizeLabel) || 0) + 1)
            })
          }
          const brandName = "tamiltshirts®"
          brandsMap.set(brandName, (brandsMap.get(brandName) || 0) + 1)
          const colorName = "Black"
          colorsMap.set(colorName, (colorsMap.get(colorName) || 0) + 1)
          const designName = "Graphic print"
          designsMap.set(designName, (designsMap.get(designName) || 0) + 1)
          const fitName = "Regular"
          fitsMap.set(fitName, (fitsMap.get(fitName) || 0) + 1)
          const sleeveName = "Half Sleeve"
          sleevesMap.set(sleeveName, (sleevesMap.get(sleeveName) || 0) + 1)
          const neckName = "Round Neck"
          necksMap.set(neckName, (necksMap.get(neckName) || 0) + 1)
          const typeName = "T-Shirt"
          typesMap.set(typeName, (typesMap.get(typeName) || 0) + 1)
          const rating = "4 Stars & Up"
          ratingsMap.set(rating, (ratingsMap.get(rating) || 0) + 1)
          const offer = "Buy 2 Get 1 Free"
          offersMap.set(offer, (offersMap.get(offer) || 0) + 1)
        })

        const mapToFilterOptions = (map: Map<string, number>): FilterOption[] =>
          Array.from(map.entries()).map(([label, count]) => ({
            value: label.toLowerCase().replace(/\s/g, "-"),
            label,
            count
          }))

        const filters: Filters = {
          category: Array.from(categoriesMap.entries()).map(([value, { label, count, subcategories }]) => ({
            value,
            label,
            count,
            subcategories
          })),
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

        if (filters.category.length) {
          const firstCat = filters.category[0].value
          setSelectedMainCategory(firstCat)
          setSelectedFilters({ category: [firstCat] })
        }
      } catch (error) {
        console.error("Error loading data:", error)
      }
    }
    load()
  }, [])

  /* --------------- handlers -------------- */
  const handleFilterChange = (filterType: string, value: string, checked: boolean) => {
    setSelectedFilters((prev) => {
      const current = prev[filterType] ?? []
      const category = categories.find(cat => cat.seo_url === value)
      const isMainCategory = category && category.parent_id === 0

      if (filterType === "category" && isMainCategory) {
        // Handle main category (radio button behavior: only one main category)
        if (checked) {
          // Clear other main categories and all subcategories
          return { ...prev, category: [value] }
        } else {
          // Clear main category and its subcategories
          return { ...prev, category: [] }
        }
      } else if (filterType === "category" && category && category.parent_id !== 0) {
        // Handle subcategory (checkbox behavior)
        const parentCategory = categories.find(cat => cat.id === category.parent_id)
        const parentSeoUrl = parentCategory?.seo_url
        if (checked) {
          // When a subcategory is checked, select its main category and add subcategory
          const newFilters = parentSeoUrl ? [parentSeoUrl, value] : [value]
          return { ...prev, category: newFilters }
        } else {
          // Remove subcategory, keep main category if no other subcategories are selected
          const newFilters = current.filter(v => v !== value)
          const hasOtherSubcategories = newFilters.some(v => {
            const cat = categories.find(c => c.seo_url === v)
            return cat && cat.parent_id === category.parent_id
          })
          if (!hasOtherSubcategories && parentSeoUrl) {
            newFilters.push(parentSeoUrl)
          }
          return { ...prev, category: newFilters }
        }
      } else {
        // Handle other filters (checkbox behavior)
        const next = checked ? [...current, value] : current.filter((v) => v !== value)
        return { ...prev, [filterType]: next }
      }
    })

    // Update selected main category for subcategory selection
    const category = categories.find(cat => cat.seo_url === value)
    if (filterType === "category" && category) {
      if (category.parent_id === 0) {
        setSelectedMainCategory(checked ? value : null)
      } else if (checked) {
        const parentCategory = categories.find(cat => cat.id === category.parent_id)
        setSelectedMainCategory(parentCategory?.seo_url || null)
      }
    }

    // Close filter sheet after selection
    if (filterType === "category") {
      setIsFilterSheetOpen(false)
    }
  }

  const clearAllFilters = () => {
    setSelectedFilters({ category: [] })
    setSelectedMainCategory(null)
  }

  /* ------- derive filtered + sorted list ------- */
  const productsToShow = useMemo(() => {
    let list = [...allProducts]

    Object.entries(selectedFilters).forEach(([filterType, values]) => {
      if (!values.length) return

      list = list.filter((product) => {
        switch (filterType) {
          case "category":
            // If only main category is selected, show all products under it and its subcategories
            // If subcategories are selected, show only those products
            const hasSubcategories = values.some(value => {
              const category = categories.find(cat => cat.seo_url === value)
              return category && category.parent_id !== 0
            })
            return values.some(value => {
              const category = categories.find(cat => cat.seo_url === value)
              if (!category) return false
              if (category.parent_id === 0 && !hasSubcategories) {
                const subCats = categories.filter(sub => sub.parent_id === category.id)
                return subCats.some(sub => sub.id === product.category_id) || product.category_id === category.id
              }
              return product.category_id === category.id
            })
          case "sizes":
            return values.some((val) => product.size_id?.toLowerCase().includes(val))
          case "brand":
            return values.includes("tamiltshirts®")
          case "color":
            return values.includes("black")
          case "design":
            return values.includes("graphic-print")
          case "fit":
            return values.includes("regular")
          case "sleeve":
            return values.includes("half-sleeve")
          case "neck":
            return values.includes("round-neck")
          case "type":
            return values.includes("t-shirt")
          case "ratings":
            return values.includes("4-stars-&-up")
          case "offers":
            return values.includes("buy-2-get-1-free")
          default:
            return true
        }
      })
    })

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
          return 0
      }
    })
    return list
  }, [allProducts, selectedFilters, sortBy, categories])

  const productCount = productsToShow.length
  const categoryOptions = filtersData?.category ?? []

  /* ---------------- render ---------------- */
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col">
        
        <FlashOffer/>

        <div className="!max-w-[90rem] mx-auto ">
          <nav className="bg-white px-4 py-3 text-sm text-gray_text flex items-center">
            <Link href="#" className="hover:underline">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 mx-1" />
            <Link href="#" className="hover:underline">
              Men Clothing
            </Link>
          </nav>

          <div className="flex md:p-[0px] p-[20px]">
            <div className="!w-4/12 hidden md:block">
            {filtersData && (
              <CategoryLeftFilter
                filters={filtersData}
                selectedFilters={selectedFilters}
                selectedMainCategory={selectedMainCategory}
                onFilterChange={handleFilterChange}
                onClearAll={clearAllFilters} setCategorySlug={function (slug: string): void {
                  throw new Error("Function not implemented.")
                } }              />
            )}
            </div>

            <main className="md:!w-10/12 !w-12/12 bg-green-500">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-[22px] text-[#363735] font-bold ">
                  {/* Dynamic category name */}
                  {(() => {
                    // Find the selected category or subcategory from selectedFilters
                    const selectedCategorySeo = selectedFilters.category.find((seo) => {
                      const category = categories.find((cat) => cat.seo_url === seo);
                      return category && (category.parent_id !== 0 || selectedFilters.category.length === 1);
                    });
                    const selectedCategory = selectedCategorySeo
                      ? categories.find((cat) => cat.seo_url === selectedCategorySeo)
                      : null;
                    return selectedCategory ? (
                      <>
                        {selectedCategory.name} <span className="text-gray_text text-[14px]">({productCount} Products)</span>
                      </>
                    ) : (
                      <>
                        Clothes for Men <span className="text-gray_text text-[14px]">({productCount} Products)</span>
                      </>
                    );
                  })()}
                </h2>
                <div className="hidden md:block">
                  <SortDropdown sortBy={sortBy} onSortChange={setSortBy} />
                </div>
              </div>

              {productsToShow.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                  {productsToShow.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                  <div className="flex flex-col items-center justify-center h-[50vh] text-center invisible ">
                    <p className="text-lg text-[#363735] font-medium mb-4">No products found. View more products!</p>
                    <Button asChild className="bg-yellow-500 hover:bg-yellow-600 text-white">
                      <Link href="/cart">View More Products</Link>
                    </Button>
                  </div>
                  <div className="flex flex-col items-center justify-center h-[50vh] text-center ">
                      {/* <Bag className="w-6 h-6 text-black" /> */}
                    <p className="text-lg text-[#363735] font-medium mb-4">No products found. View more products!</p>
                    <Button asChild className="bg-yellow-500 hover:bg-yellow-600 text-white">
                      <Link href="/cart">View More Products</Link>
                    </Button>
                  </div>
                  <div className="flex flex-col items-center justify-center h-[50vh] text-center invisible ">
                    <p className="text-lg text-[#363735] font-medium mb-4">No products found. View more products!</p>
                    <Button asChild className="bg-yellow-500 hover:bg-yellow-600 text-white">
                      <Link href="/cart">View More Products</Link>
                    </Button>
                  </div>
                </div>
              )}
            </main>
          </div>

          {filtersData && (
            <div className="z-40 sticky bottom-0">
              <MobileFilterSheet
                isOpen={isFilterSheetOpen}
                onOpenChange={setIsFilterSheetOpen}
                filters={filtersData}
                selectedFilters={selectedFilters}
                selectedMainCategory={selectedMainCategory}
                onFilterChange={handleFilterChange}
                onClearAll={clearAllFilters}
                onApply={() => setIsFilterSheetOpen(false)} setCategorySlug={function (slug: string): void {
                  throw new Error("Function not implemented.")
                } }              />
              <MobileSortSheet
                isOpen={isSortSheetOpen}
                onOpenChange={setIsSortSheetOpen}
                sortBy={sortBy}
                onSortChange={setSortBy}
              />
            </div>
          )}


        </div>
      </div>
      <div className="sticky bottom-0">
                <BottomMobileBar
            onOpenFilterSheet={() => setIsFilterSheetOpen(true)}
            onOpenSortSheet={() => setIsSortSheetOpen(true)}
          />
          </div>
      <Footer />
    </>
  )
}