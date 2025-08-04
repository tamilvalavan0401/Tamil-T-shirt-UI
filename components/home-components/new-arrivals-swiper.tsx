"use client"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Autoplay } from "swiper/modules"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import Heart from "../Heart"

const assets = "https://assetsvilva.blr1.cdn.digitaloceanspaces.com/tamiltshirts/";

interface Product {
  id: number
  name: string
  eng_name: string
  descp: string
  sp: number
  mrp: number
  imageurl: string
  seo_url: string
}

interface NewArrivalsSwiperProps {
  products: Product[]
}

export function NewArrivalsSwiper({ products }: NewArrivalsSwiperProps) {
  if (!products || products.length === 0) {
    return <p className="text-center">Loading products...</p>
  }

  return (
    <section className="container mx-auto px-4 md:px-6">
      <h2 className="text-[20px] md:text-[24px] font-bold mb-6 text-center">NEW ARRIVALS</h2>
      <div className="relative">

        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          loop
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          navigation={{ nextEl: ".style-combo-next", prevEl: ".style-combo-prev" }}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 3, spaceBetween: 30 },
            1024: { slidesPerView: 4, spaceBetween: 30 },
          }}
          className="pb-10"
        >
          {products.map((product) => (
           <SwiperSlide key={product.id}>
            <Link href={`/products/${encodeURIComponent(product.seo_url)}`} className="block">
              <div className="overflow-hidden border-none duration-300 !rounded-[8px]">
                <div className="relative w-full aspect-[4/5] bg-gray-100">
                  <Image
                    src={`${assets}${product.imageurl}`}
                    alt={product.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-[8px]"
                  />
                  
                    <span className="absolute top-3 left-3 bg-pr_cart_buy3_bg text-white text-xs px-2 py-1 rounded-full z-10">
                      Buy 3 @ 999
                    </span>
                  
                    <span className="absolute bottom-3 left-3 text-pr_combo_text bg-pr_combo_bg text-xs  px-2 py-1 rounded-full flex items-center gap-1 z-10">
                      Best Seller | ⭐ 4.5
                    </span>

                </div>
                <CardContent className="text-left">
                  <div className="flex justify-between items-start mb-1">
                      <div className="!w-[90%]">
                      <div className="w-[90%] ">
                        <h3 className="w-full truncate whitespace-nowrap overflow-hidden text-base text-category_name ">
                          {product.name}
                        </h3>
                      </div>

                      <div className="w-[90%] ">
                        <p className="w-full truncate whitespace-nowrap overflow-hidden text-xs text-pr_eng_name">{product.eng_name}</p>
                      </div>
                      </div>
                      
                    <Button variant="ghost" size="icon" className="h-6 !z-50 w-6 text-gray_text hover:text-error">
                      <Heart product={product} />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-category_name">₹{product.sp}</span>
                    <span className="text-sm text-gray_text line-through">₹{product.mrp}</span>
                    <span className="text-xs font-medium text-offer_text">
                      {Math.round(((product.mrp - product.sp) / product.mrp) * 100)}% Off
                    </span>
                  </div>
                </CardContent>
              </div>
            </Link>
          </SwiperSlide>


          ))}
        </Swiper>
        <Button
          variant="ghost"
          size="icon"
          className="style-combo-prev absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full h-10 w-10 shadow-md"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="style-combo-next absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full h-10 w-10 shadow-md"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
    </section>
  )
}