"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, Search, ShoppingCart, User, ChevronDown, X, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Image from "next/image"
import { SearchOverlay } from "./search-overlay" // Import the new component
import { useCart } from "./ui/cart-provider"

const navItems = [
  {
    name: "MEN",
    href: "/men",
    dropdown: [
      { name: "T-Shirts", href: "/men/tshirts" },
      { name: "Hoodies", href: "/men/hoodies" },
      { name: "Polo Shirts", href: "/men/polo" },
      { name: "Apparels", href: "/men/apparels" },
    ],
  },
  {
    name: "WOMEN",
    href: "/women",
    dropdown: [
      { name: "T-Shirts", href: "/women/tshirts" },
      { name: "Dresses", href: "/women/dresses" },
      { name: "Apparels", href: "/women/apparels" },
    ],
  },
  {
    name: "KIDS",
    href: "/kids",
    dropdown: [
      { name: "T-Shirts", href: "/kids/tshirts" },
      { name: "Apparels", href: "/kids/apparels" },
    ],
  },
  { name: "COUPLE TSHIRTS COMBO", href: "/couple-tshirts" },
  // { name: "COMBO", href: "/combo" },
  {
    name: "APPARELS",
    href: "/apparels",
    dropdown: [
      { name: "Caps", href: "/apparels/caps" },
      { name: "Bags", href: "/apparels/bags" },
      { name: "Accessories", href: "/apparels/accessories" },
    ],
  },
]

export function Navbar() {
  const { itemCount } = useCart()
  const [isSheetOpen, setIsSheetOpen] = React.useState(false)
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null)
  const [showSearchOverlay, setShowSearchOverlay] = React.useState(false) // New state for search overlay
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = (itemName: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setActiveDropdown(itemName)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 100) // Small delay to allow moving between trigger and content
  }

  // Clear timeout on unmount
  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      {/* Desktop Navbar (visible on md and larger screens) */}
      <div className="max-w-7xl mx-auto h-16 items-center justify-between px-4 md:px-6 hidden md:flex desktopnav">

        <div className="flex items-center">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image className="w-[150px]" src="https://assetsvilva.blr1.cdn.digitaloceanspaces.com/tamiltshirts/uploads/pxRQdPAEVq1yxEVqlUt4jy8BYE2OL41fccnkSsNn.webp" alt="தமிழ் டி-ஷர்ட் Logo" width={80} height={32} />
        </Link>

        {/* Center: Desktop Navigation */}
        <nav className="flex items-center">
          {navItems.map((item) => (
            <React.Fragment key={item.name}>
              {item.dropdown ? (
                <DropdownMenu
                  open={activeDropdown === item.name}
                  onOpenChange={(isOpen) => {
                    if (!isOpen) {
                      setActiveDropdown(null)
                    }
                  }}
                >
                  <DropdownMenuTrigger asChild>
                    <Button
                      // variant="ghost"
                      className="group text-[12px] font-medium transition-colors w-fit  md:!px-2 !px-1"
                      onMouseEnter={() => handleMouseEnter(item.name)}
                      onMouseLeave={handleMouseLeave}
                    >
                      {item.name}
                      <ChevronDown className=" h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="start"
                    className="min-w-[160px] bg-white"
                    onMouseEnter={() => handleMouseEnter(item.name)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {item.dropdown.map((subItem) => (
                      <DropdownMenuItem key={subItem.name} asChild>
                        <Link href={subItem.href}>{subItem.name}</Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  href={item.href}
                  className="text-[12px] font-medium transition-colors "
                  onMouseEnter={handleMouseLeave}
                >
                  {item.name}
                </Link>
              )}
            </React.Fragment>
          ))}
        </nav>
        </div>

        {/* Right: Search and Icons */}
        <div className="flex items-center md:space-x-4 !space-x-[0px]">
          {/* Search Box Trigger */}
          <div>
            <div className="block md:hidden">
              <div
                className="relative flex items-center rounded-full cursor-pointer "
                onClick={() => setShowSearchOverlay(true)} // Open overlay on click
              >
                <Search className="h-5 w-5 text-gray_text mr-2" />
                {/* <input type="text" className="bg-transparent" placeholder="Search Tamizh Tshirt w-auto" /> */}
                {/* <span className="flex-1 text-sm text-gray_text">Search "Tamizh Tshirt"</span> */}
              </div>
            </div>
            <div className=" hidden md:block">
              <div
                className="relative flex items-center bg-gray-100 rounded-full px-4 py-2  cursor-pointer "
                onClick={() => setShowSearchOverlay(true)} // Open overlay on click
              >
                <Search className="h-5 w-5 text-gray_text mr-2" />
                <input type="text" className="bg-transparent" placeholder="Search Tamizh Tshirt w-auto" />
                
              </div>
            </div>
          </div>
          

          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Link href="/wishlist">
              <Heart className="h-5 w-5" />
              <span className="sr-only">Wishlist</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Link href="/cart">
            {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-xs text-primary-foreground">
                  {itemCount}
                </span>
              )}
            <ShoppingCart className="h-5 w-5" />
            <span className="sr-only">Cart</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Link href="/loginmobile">
            <User className="h-5 w-5" />
            <span className="sr-only">User Account</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Mobile Navbar (visible on screens smaller than md) */}
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6 md:hidden mobilenav">
        {/* Left: Hamburger */}
        <div className="w-4/12">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[250px] sm:w-[300px] p-0">
              <div className="flex h-16 items-center justify-between border-b px-4">
                <Link href="/" className="flex items-center gap-2">
                  <Image src="https://assetsvilva.blr1.cdn.digitaloceanspaces.com/tamiltshirts/uploads/pxRQdPAEVq1yxEVqlUt4jy8BYE2OL41fccnkSsNn.webp" alt="தமிழ் டி-ஷர்ட் Logo" width={80} height={32} />
                </Link>
                <Button variant="ghost" size="icon" onClick={() => setIsSheetOpen(false)}>
                  <X className="h-5 w-5" />
                  <span className="sr-only">Close menu</span>
                </Button>
              </div>
              <nav className="flex flex-col gap-2 p-4">
                {navItems.map((item) => (
                  <React.Fragment key={item.name}>
                    {item.dropdown ? (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="w-full justify-between text-left">
                            {item.name}{" "}
                            <ChevronDown className="ml-2 h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-[calc(100%-2rem)] ml-4">
                          {item.dropdown.map((subItem) => (
                            <DropdownMenuItem key={subItem.name} asChild>
                              <Link href={subItem.href} onClick={() => setIsSheetOpen(false)}>
                                {subItem.name}
                              </Link>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ) : (
                      <Button variant="ghost" asChild className="w-full justify-start">
                        <Link href={item.href} onClick={() => setIsSheetOpen(false)}>
                          {item.name}
                        </Link>
                      </Button>
                    )}
                  </React.Fragment>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Center: Mobile Logo */}
        <Link href="/" className="flex-1 flex justify-center items-center w-4/12">
          <Image className="w-[120px]" src="https://assetsvilva.blr1.cdn.digitaloceanspaces.com/tamiltshirts/uploads/pxRQdPAEVq1yxEVqlUt4jy8BYE2OL41fccnkSsNn.webp" alt="தமிழ் டி-ஷர்ட் Logo" width={80} height={32} />
        </Link>

        {/* Right: Mobile Icons (including search icon to open overlay) */}
        <div className="flex justify-end items-center space-x-2 w-4/12">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setShowSearchOverlay(true)}>
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
          {/* <Button variant="ghost" size="icon" className="h-8 w-8">
            <Heart className="h-5 w-5" />
            <span className="sr-only">Wishlist</span>
          </Button> */}
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ShoppingCart className="h-5 w-5" />
            <span className="sr-only">Cart</span>
          </Button>
          {/* <Button variant="ghost" size="icon" className="h-8 w-8">
            <User className="h-5 w-5" />
            <span className="sr-only">User Account</span>
          </Button> */}
        </div>
      </div>

      {/* Search Overlay */}
      <SearchOverlay isOpen={showSearchOverlay} onClose={() => setShowSearchOverlay(false)} />
    </header>
  )
}
