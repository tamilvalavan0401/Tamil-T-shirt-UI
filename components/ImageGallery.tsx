"use client"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Autoplay, Thumbs } from "swiper/modules"
import Image from "next/image"
import { useState } from "react"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/thumbs"

interface ImageGallerySwiperProps {
  imageUrls: string[]
  alt: string
}

export default function ImageGallerySwiper({ imageUrls, alt }: ImageGallerySwiperProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null)
  const [mainSwiper, setMainSwiper] = useState<any>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [mobileactiveIndex, setMobileActiveIndex] = useState(0)

  const handleThumbClick = (index: number) => {
    if (mainSwiper) {
      mainSwiper.slideToLoop(index)
    }
    setActiveIndex(index)
    setMobileActiveIndex(index)
  }

  return (
    <div className="flex flex-col md:flex-row w-full gap-4">
      {/* Left Side Thumbnails */}
      <div className="w-full md:w-2/12 hidden md:block">
        <Swiper
          onSwiper={setThumbsSwiper}
          direction="vertical"
          spaceBetween={10}
          slidesPerView={4}
          watchSlidesProgress
          className="h-full"
        >
          {imageUrls.map((url, index) => (
            <SwiperSlide
              key={index}
              className="cursor-pointer"
              onClick={() => handleThumbClick(index)}
            >
              <div className={`relative w-full aspect-square rounded-[6px] border-4 ${activeIndex === index ? "border-blue-500" : "border-transparent"}`}>
                <Image
                  src={url || "/placeholder.svg"}
                  alt={`${alt} - Thumbnail ${index + 1}`}
                  fill
                  className="object-cover rounded-[2px]"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Right Side Main Image */}
      <div className="w-full md:w-10/12 rounded-md">
        <Swiper
          modules={[Navigation, Autoplay, Thumbs]}
          onSwiper={setMainSwiper}
          thumbs={{ swiper: thumbsSwiper }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop
          onSlideChange={(swiper) => {
            setActiveIndex(swiper.realIndex)
            setMobileActiveIndex(swiper.realIndex)
          }}
          className="!w-full !h-auto"
        >
          {imageUrls.map((url, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-auto">
                <Image
                  src={url || "/placeholder.svg"}
                  alt={`${alt} - Image ${index + 1}`}
                  width={1200}
                  height={800}
                  className="w-full h-auto object-contain"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Mobile Thumbnails */}
      <div className="block md:hidden mt-4 w-full">
        <Swiper
          spaceBetween={10}
          slidesPerView={3}
          watchSlidesProgress
          className="w-full"
        >
          {imageUrls.map((url, index) => (
            <SwiperSlide
              key={index}
              className="cursor-pointer"
              onClick={() => handleThumbClick(index)}
            >
              <div className={`relative w-full aspect-square rounded-[6px] border-4 ${mobileactiveIndex === index ? "border-blue-500" : "border-transparent"}`}>
                <Image
                  src={url || "/placeholder.svg"}
                  alt={`${alt} - Thumbnail ${index + 1}`}
                  fill
                  className="object-cover rounded-[2px]"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}
