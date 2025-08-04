"use client"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Autoplay } from "swiper/modules"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Heart, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

// Dummy data for hot picks products
const hotPicks = [
  {
    id: 1,
    name: "Best Seller Tee",
    description: "Comfort Fit, Half Sleeve",
    price: "₹499",
    originalPrice: "₹999",
    discount: "50% Off",
    image: "/placeholder.svg?height=600&width=480", // Placeholder image (adjusted for 4:5)
    badgeTop: "Hot Pick",
    badgeBottom: "Best Seller | ⭐ 4.5",
  },
  {
    id: 2,
    name: "Popular Hoodie",
    description: "Warm & Stylish",
    price: "₹799",
    originalPrice: "₹1599",
    discount: "50% Off",
    image: "/placeholder.svg?height=600&width=480",
    badgeTop: "Hot Pick",
    badgeBottom: "Combo sale | ⭐ 4.5",
  },
  {
    id: 3,
    name: "Trendy Polo",
    description: "Smart Casual",
    price: "₹549",
    originalPrice: "₹1099",
    discount: "50% Off",
    image: "/placeholder.svg?height=600&width=480",
    badgeTop: "Hot Pick",
    badgeBottom: "New Arrival | ⭐ 4.5",
  },
  {
    id: 4,
    name: "Exclusive Design",
    description: "Limited Stock",
    price: "₹699",
    originalPrice: "₹1399",
    discount: "50% Off",
    image: "/placeholder.svg?height=600&width=480",
    badgeTop: "Hot Pick",
    badgeBottom: "Best Seller | ⭐ 4.5",
  },
  {
    id: 5,
    name: "Seasonal Favorite",
    description: "Must-Have",
    price: "₹599",
    originalPrice: "₹1199",
    discount: "50% Off",
    image: "/placeholder.svg?height=600&width=480",
    badgeTop: "Hot Pick",
    badgeBottom: "Combo sale | ⭐ 4.5",
  },
]

export function HotPicksSwiper() {
  return (
    <section className="container mx-auto px-4 md:px-6">
      <h2 className="text-[20px] md:text-[24px] font-bold mb-6 text-center">Hot Picks of the Week</h2>
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
            nextEl: ".hot-picks-next",
            prevEl: ".hot-picks-prev",
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
          }}
          className="pb-4"
        >
          {hotPicks.map((product) => (
            <SwiperSlide key={product.id}>
              <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg">
                <div className="relative w-full aspect-[4/5] bg-gray-100">
                  {" "}
                  {/* Changed to aspect-[4/5] */}
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                  />
                  {/* Top-left badge */}
                  {product.badgeTop && (
                    <span className="absolute top-3 left-3 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-full z-10">
                      {product.badgeTop}
                    </span>
                  )}
                  {/* Bottom-left badge */}
                  {product.badgeBottom && (
                    <span className="absolute bottom-3 left-3 bg-black/70 text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1 z-10">
                      {product.badgeBottom.includes("⭐") ? (
                        <>
                          {product.badgeBottom.split("⭐")[0]}
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          {product.badgeBottom.split("⭐")[1]}
                        </>
                      ) : (
                        product.badgeBottom
                      )}
                    </span>
                  )}
                </div>
                <CardContent className="p-4 text-left">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="text-base font-semibold text-gray_text">{product.name}</h3>
                      <p className="text-xs text-gray_text">{product.description}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="h-6 w-6 text-gray_text hover:text-error">
                      <Heart className="h-4 w-4" />
                      <span className="sr-only">Add to wishlist</span>
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-black">{product.price}</span>
                    <span className="text-sm text-gray_text line-through">{product.originalPrice}</span>
                    <span className="text-xs font-medium text-offer_text">{product.discount}</span>
                  </div>
                </CardContent>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
        <Button
          variant="ghost"
          size="icon"
          className="hot-picks-prev absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full h-10 w-10 shadow-md"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="hot-picks-next absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full h-10 w-10 shadow-md"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
    </section>
  )
}
