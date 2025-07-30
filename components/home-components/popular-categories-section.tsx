"use client"

import { useState, useEffect } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Autoplay } from "swiper/modules"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Heart, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { cn } from "@/lib/utils"
import Link from "next/link"

export function PopularCategoriesSection() {
  const [products, setProducts] = useState<any[]>([])
  const [activeFilter, setActiveFilter] = useState("Thaithingal  - Polo Tshirt") // Default category

  useEffect(() => {
    fetch("/products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error loading products:", err))
  }, [])

  const filteredProducts = products.filter(
    (product) => product.category_name === activeFilter
  )

  const assets = "https://assetsvilva.blr1.cdn.digitaloceanspaces.com/tamiltshirts/";

  const filters = [
    "Printed Couple T-Shirts",
    "Tamil Pride",
    "Thaithingal  - Polo Tshirt",
  ]

  return (
    <section className="container mx-auto px-4 md:px-6">
      <h2 className="text-[20px] md:text-[24px] font-bold mb-6 text-center">
        POPULAR CATEGORIES
      </h2>

      {/* Filter Buttons */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2 justify-start">
        {filters.map((filter) => (
          <Button
            key={filter}
            variant="outline"
            onClick={() => setActiveFilter(filter)}
            className={cn(
              "flex-shrink-0 rounded-md px-4 py-2 text-sm font-medium transition-colors",
              activeFilter === filter
                ? "bg-black text-white hover:bg-gray-800"
                : "border border-gray-300 bg-white text-gray_text hover:bg-gray-50"
            )}
          >
            {filter}
          </Button>
        ))}
      </div>

      {/* Product Slider */}
      <div className="relative">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          navigation={{
            nextEl: ".popular-categories-next",
            prevEl: ".popular-categories-prev",
          }}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 3, spaceBetween: 30 },
            1024: { slidesPerView: 4, spaceBetween: 30 },
          }}
          className="pb-4"
        >
          {filteredProducts.map((product) => (
            <SwiperSlide key={product.id}>
            <Link href={`/products/${encodeURIComponent(product.seo_url)}`}>

              <SwiperSlide key={product.id}>
                  <Link href={`/products/${encodeURIComponent(product.seo_url)}`} className="block">
                    <div className="overflow-hidden border-none duration-300 !rounded-[8px]">
                      <div className="relative w-full aspect-[4/5] bg-gray-100">
                        <Image
                          src={`${assets}${product.imageurl.split(',')[0]}`}
                          alt={product.name}
                          layout="fill"
                          objectFit="cover"
                          className="rounded-[8px]"
                        />
                        <span className="absolute top-3 left-3 bg-pr_cart_buy3_bg text-white text-xs px-2 py-1 rounded-full z-10">
                          Buy 3 @ 999
                        </span>
                        <span className="absolute bottom-3 left-3 text-pr_combo_text bg-pr_combo_bg text-xs px-2 py-1 rounded-full flex items-center gap-1 z-10">
                          Best Seller | <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" /> 4.5
                        </span>
                      </div>
                      <CardContent className="text-left p-2">
                        <div className="flex justify-between items-start  mb-1">
                          <div className="!w-[90%]">
                            <div className="w-[90%]">
                              <h3 className="w-full truncate whitespace-nowrap overflow-hidden text-base text-pr_name">
                                {product.name}
                              </h3>
                            </div>
                            <div className="w-[90%]">
                              <p className="w-full truncate whitespace-nowrap overflow-hidden text-xs text-pr_eng_name">
                                {product.eng_name}
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 !z-50 w-6 text-gray_text hover:text-red-500"
                          >
                            <Heart product={product} />
                          </Button>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-pr_name">₹{product.sp}</span>
                          <span className="text-sm text-gray_text line-through">₹{product.mrp}</span>
                          <span className="text-xs font-medium text-offer_text">
                            {Math.round(((product.mrp - product.sp) / product.mrp) * 100)}% Off
                          </span>
                        </div>
                      </CardContent>
                    </div>
                  </Link>
                </SwiperSlide>
            </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Buttons */}
        <Button
          variant="ghost"
          size="icon"
          className="popular-categories-prev absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full h-10 w-10 shadow-md"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="popular-categories-next absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full h-10 w-10 shadow-md"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
    </section>
  )
}
