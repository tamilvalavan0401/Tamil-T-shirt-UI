// components/SwiperWrapper.tsx
"use client"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"

interface SwiperWrapperProps {
  imageUrls: string[]
  productName: string
}

export function SwiperWrapper({ imageUrls, productName }: SwiperWrapperProps) {
  return (
    <Swiper
      spaceBetween={10}
      slidesPerView={3}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{ clickable: true }}
      modules={[Autoplay, Pagination]}
      className="absolute bottom-0 left-0 w-full h-24"
    >
      {imageUrls.map((url, index) => (
        <SwiperSlide key={index}>
          <img
            src={url || "/placeholder.svg"}
            alt={`${productName} - ${index + 1}`}
            className="h-full object-cover rounded-md"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}