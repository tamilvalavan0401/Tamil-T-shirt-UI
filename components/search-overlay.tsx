// components/search-overlay.tsx
"use client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Search, History, CircleX } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"

interface SearchOverlayProps {
  isOpen: boolean
  onClose: () => void
}

interface Product {
  id: string
  name: string
  eng_name: string
  category: string
  subcategory: string | null
  imageurl: string[]
  selling_price: string
  mrp: string
  discount: string
  star_rating: number
  description: string
  color_options: string[]
  size_options: string[]
  seo_url: string
}

const RECENT_SEARCHES_KEY = "tamil_tshirt_recent_searches"
const MAX_RECENT_SEARCHES = 8
const SEARCH_SUGGESTION_DEBOUNCE_MS = 300

const popularSearches = [
  "Tamil T-Shirt",
  "Casual Wear",
  "Men's Fashion",
  "Women's Fashion",
  "Sports Wear",
  "Ethnic Wear",
  "Formal Wear",
  "Summer Wear",
]

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [suggestions, setSuggestions] = useState<{ name: string; seo_url: string }[]>([])
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleClearRecentSearches = () => {
    setRecentSearches([])
    if (typeof window !== "undefined") {
      localStorage.removeItem(RECENT_SEARCHES_KEY)
    }
  }

  // Load recent searches from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedSearches = localStorage.getItem(RECENT_SEARCHES_KEY)
      if (storedSearches) {
        try {
          const parsed = JSON.parse(storedSearches)
          if (Array.isArray(parsed)) {
            setRecentSearches(parsed)
          }
        } catch (error) {
          console.error("Error parsing recent searches:", error)
        }
      }
    }
  }, [])

  // Save recent searches to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(recentSearches))
      } catch (error) {
        console.error("Error saving recent searches:", error)
      }
    }
  }, [recentSearches])

  // Fetch products from /public/products.json
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log("Fetching products from /products.json")
        const res = await fetch("/products.json", { cache: "no-store" })
        if (!res.ok) {
          throw new Error(`Failed to fetch products data: ${res.status} ${res.statusText}`)
        }
        const rawData: any[] = await res.json()
        const assets = "https://assetsvilva.blr1.cdn.digitaloceanspaces.com/tamiltshirts/"
        const data: Product[] = rawData.map((item) => ({
          id: item.id?.toString() || "0",
          name: item.name || "Unknown",
          eng_name: item.eng_name || item.name || "Unknown",
          category: item.category_name || "Unknown",
          subcategory: item.category_subcat ? item.category_name : null,
          imageurl: item.imageurl
            ? item.imageurl.split(",").map((url: string) => `${assets}${url.trim()}`)
            : [],
          selling_price: item.sp?.toString() || item.mrp?.toString() || "0",
          mrp: item.mrp?.toString() || "0",
          discount:
            item.mrp && item.sp
              ? `${Math.round(((item.mrp - item.sp) / item.mrp) * 100)}%`
              : "0%",
          star_rating: item.star_rating || 0,
          description: item.descp || item.shrtdesc || "",
          color_options: item.colorcodes_id
            ? item.colorcodes_id.toString().split(",").map((id: string) => id.trim())
            : [],
          size_options: item.size_id
            ? item.size_id.split(",").map((id: string) => id.trim())
            : [],
          seo_url: item.seo_url ? item.seo_url.trim() : "",
        }))
        console.log("Search products loaded:", data.map((p) => p.seo_url))
        setAllProducts(data)
      } catch (error) {
        console.error("Error loading products:", error)
        setAllProducts([])
      }
    }
    fetchProducts()
  }, [])

  // Debounced search suggestions
  useEffect(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current)
    }

    if (searchTerm.length > 0) {
      debounceTimeoutRef.current = setTimeout(() => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase()
        const uniqueSuggestions = new Map<string, { name: string; seo_url: string }>()

        allProducts.forEach((product) => {
          const productNameLower = product.name.toLowerCase()
          const engNameLower = product.eng_name.toLowerCase()

          if (productNameLower.includes(lowerCaseSearchTerm) || engNameLower.includes(lowerCaseSearchTerm)) {
            const displayName = engNameLower.includes(lowerCaseSearchTerm) ? product.eng_name : product.name
            if (!uniqueSuggestions.has(displayName) && product.seo_url) {
              uniqueSuggestions.set(displayName, { name: displayName, seo_url: product.seo_url })
            }
          }
        })
        setSuggestions(Array.from(uniqueSuggestions.values()).slice(0, 10))
      }, SEARCH_SUGGESTION_DEBOUNCE_MS)
    } else {
      setSuggestions([])
    }

    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current)
      }
    }
  }, [searchTerm, allProducts])

  const addSearchTerm = (term: string) => {
    const normalizedTerm = term.trim().toLowerCase()
    if (!normalizedTerm) return

    setRecentSearches((prevSearches) => {
      const filteredSearches = prevSearches.filter((s) => s.toLowerCase() !== normalizedTerm)
      const newSearches = [term, ...filteredSearches]
      return newSearches.slice(0, MAX_RECENT_SEARCHES)
    })
  }

  const navigateToSearch = (term: string) => {
    const matchedProduct = allProducts.find(
      (p) =>
        p.name.toLowerCase().includes(term.toLowerCase()) ||
        p.eng_name.toLowerCase().includes(term.toLowerCase())
    )
    if (matchedProduct && matchedProduct.seo_url) {
      router.push(`/products/${encodeURIComponent(matchedProduct.seo_url)}`)
    } else {
      router.push(`/search?q=${encodeURIComponent(term)}`)
    }
    onClose()
  }

  const handleSearchSubmit = () => {
    if (searchTerm) {
      addSearchTerm(searchTerm)
      navigateToSearch(searchTerm)
      setSearchTerm("")
      setSuggestions([])
    }
  }

  const handlePopularSearchClick = (term: string) => {
    addSearchTerm(term)
    navigateToSearch(term)
    setSearchTerm(term)
    setSuggestions([])
  }

  const handleRecentSearchClick = (term: string) => {
    addSearchTerm(term)
    navigateToSearch(term)
    setSearchTerm(term)
    setSuggestions([])
  }

  const handleSuggestionClick = (suggestion: { name: string; seo_url: string }) => {
    addSearchTerm(suggestion.name)
    router.push(`/products/${encodeURIComponent(suggestion.seo_url)}`)
    setSearchTerm(suggestion.name)
    setSuggestions([])
    onClose()
  }

  const handleClearSearchInput = () => {
    setSearchTerm("")
    setSuggestions([])
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col h-screen overflow-y-auto">
      <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex flex-col shadow-sm">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={onClose} className="mr-2">
            <ChevronLeft className="h-6 w-6" />
            <span className="sr-only">Back</span>
          </Button>
          <div className="relative flex items-center flex-1 bg-gray-100 rounded-lg px-4 py-2">
            <Search className="h-5 w-5 text-gray_text mr-2 cursor-pointer" onClick={handleSearchSubmit} />
            <Input
              type="text"
              placeholder="Search by Keyword or Product ID"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearchSubmit()
                }
              }}
              className="flex-1 bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 p-0 h-auto text-base"
            />
            {searchTerm && (
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-gray_text hover:text-gray_text"
                onClick={handleClearSearchInput}
              >
                <CircleX className="h-4 w-4" />
                <span className="sr-only">Clear search input</span>
              </Button>
            )}
          </div>
        </div>
        {suggestions.length > 0 && searchTerm.length > 0 && (
          <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-b-lg shadow-lg z-50 max-h-60 overflow-y-auto">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-gray_text"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion.name}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex-1 p-4 md:p-6">
        {recentSearches.length > 0 && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Recent Searches</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearRecentSearches}
                className="text-blue-600 hover:text-blue-800"
              >
                Clear All
              </Button>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 whitespace-nowrap no-scrollbar">
              {recentSearches.map((term, index) => (
                <Button
                  key={index}
                  variant="outline"
                  onClick={() => handleRecentSearchClick(term)}
                  className="flex-shrink-0 rounded-full px-4 py-2 text-sm bg-gray-100 border-gray-200 text-gray_text hover:bg-gray-200 flex items-center gap-1"
                >
                  <History className="h-4 w-4" />
                  <span>{term}</span>
                </Button>
              ))}
            </div>
            <style jsx>{`
              .no-scrollbar::-webkit-scrollbar {
                display: none;
              }
              .no-scrollbar {
                -ms-overflow-style: none;
                scrollbar-width: none;
              }
            `}</style>
          </div>
        )}

        <div>
          <h3 className="text-lg font-semibold mb-4">Popular Searches</h3>
          <div className="flex flex-wrap gap-2">
            {popularSearches.map((term) => (
              <Button
                key={term}
                variant="outline"
                onClick={() => handlePopularSearchClick(term)}
                className="rounded-full px-4 py-2 text-sm bg-gray-100 border-gray-200 text-gray_text hover:bg-gray-200"
              >
                {term}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
