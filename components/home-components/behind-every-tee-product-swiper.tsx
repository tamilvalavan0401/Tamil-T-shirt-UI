"use client"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper/modules"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

// Dummy data for products
const products = [
  {
    id: 1,
    name: "Product 1",
    description: "Description 1",
    price: "₹499",
    originalPrice: "₹999",
    discount: "50% Off",
    imageColor: "bg-red-300",
  },
  {
    id: 2,
    name: "Product 2",
    description: "Description 2",
    price: "₹599",
    originalPrice: "₹1199",
    discount: "50% Off",
    imageColor: "bg-primary-300",
  },
  {
    id: 3,
    name: "Product 3",
    description: "Description 3",
    price: "₹449",
    originalPrice: "₹899",
    discount: "50% Off",
    imageColor: "bg-green-300",
  },
  {
    id: 4,
    name: "Product 4",
    description: "Description 4",
    price: "₹549",
    originalPrice: "₹1099",
    discount: "50% Off",
    imageColor: "bg-yellow-300",
  },
  {
    id: 5,
    name: "Product 5",
    description: "Description 5",
    price: "₹799",
    originalPrice: "₹1599",
    discount: "50% Off",
    imageColor: "bg-purple-300",
  },
]

export function BehindEveryTeeProductSwiper() {
  return (
    <section className="container mx-auto px-4 md:px-6">
      <h2 className="text-[20px] md:text-[24px] font-bold mb-6 text-center">Behind Every Tee</h2>
      <div className="relative">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          navigation={{
            nextEl: ".product-swiper-next",
            prevEl: ".product-swiper-prev",
          }}
          pagination={{
            clickable: true,
            el: ".product-swiper-pagination",
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
          className="pb-10"
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div
                  className={`w-full h-64 ${product.imageColor} flex items-center justify-center text-gray_text text-xl font-bold`}
                >
                  {/* Placeholder for image */}
                  Image
                </div>
                <CardContent className="p-4 text-center">
                  <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
                  <p className="text-sm text-gray_text mb-2">{product.description}</p>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-xl font-bold text-black">{product.price}</span>
                    <span className="text-sm text-gray_text line-through">{product.originalPrice}</span>
                  </div>
                  <span className="text-xs font-medium text-offer_text">{product.discount}</span>
                </CardContent>
              </Card>
            </SwiperSlide>
          ))}
          {/* Custom Pagination Dots */}
          <div className="product-swiper-pagination absolute bottom-0 left-0 right-0 flex justify-center space-x-2 z-10" />
        </Swiper>
        {/* Custom Navigation Buttons */}
        <Button
          variant="ghost"
          size="icon"
          className="product-swiper-prev absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full h-10 w-10 hidden md:flex"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="product-swiper-next absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full h-10 w-10 hidden md:flex"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
    </section>
  )
}
