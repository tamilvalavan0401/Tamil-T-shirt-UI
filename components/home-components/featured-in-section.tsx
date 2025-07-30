"use client"

import Image from "next/image"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper/modules"
import { useRef } from "react"

// Dummy data for featured items, using placeholder images and specific background colors
const featuredItems = [
  {
    id: 1,
    imageUrl: "/images/featured-card-1.png", // Using the provided specific card image
    bgColor: "bg-[#FFFBEB]", // Light yellow (matches the image)
    alt: "Featured in Logo 1",
  },
  {
    id: 2,
    imageUrl: "/placeholder.svg?height=150&width=200", // Placeholder for "YOUR STORY"
    bgColor: "bg-[#FFF5F5]", // Light pink
    alt: "Your Story",
  },
  {
    id: 3,
    imageUrl: "/placeholder.svg?height=150&width=200", // Placeholder for Tamil logo
    bgColor: "bg-[#FFFBEB]", // Light yellow
    alt: "Featured in Logo 3",
  },
  {
    id: 4,
    imageUrl: "/placeholder.svg?height=150&width=200", // Placeholder for "THE HINDU"
    bgColor: "bg-[#F5FBFF]", // Light blue
    alt: "The Hindu",
  },
  {
    id: 5,
    imageUrl: "/placeholder.svg?height=150&width=200", // Placeholder for Tamil logo
    bgColor: "bg-[#FFF5F5]", // Light pink
    alt: "Featured in Logo 5",
  },
  {
    id: 6,
    imageUrl: "/placeholder.svg?height=150&width=200", // Placeholder for "हिंदुस्तान BYTES"
    bgColor: "bg-[#F5FBFF]", // Light blue
    alt: "Hindustan Bytes",
  },
  // Duplicate items to ensure continuous loop without visible breaks
  {
    id: 7,
    imageUrl: "/images/featured-card-1.png",
    bgColor: "bg-[#FFFBEB]",
    alt: "Featured in Logo 1 (duplicate)",
  },
  {
    id: 8,
    imageUrl: "/placeholder.svg?height=150&width=200",
    bgColor: "bg-[#FFF5F5]",
    alt: "Your Story (duplicate)",
  },
  {
    id: 9,
    imageUrl: "/placeholder.svg?height=150&width=200",
    bgColor: "bg-[#FFFBEB]",
    alt: "Featured in Logo 3 (duplicate)",
  },
  {
    id: 10,
    imageUrl: "/placeholder.svg?height=150&width=200",
    bgColor: "bg-[#F5FBFF]",
    alt: "The Hindu (duplicate)",
  },
  {
    id: 11,
    imageUrl: "/placeholder.svg?height=150&width=200",
    bgColor: "bg-[#FFF5F5]",
    alt: "Featured in Logo 5 (duplicate)",
  },
  {
    id: 12,
    imageUrl: "/placeholder.svg?height=150&width=200",
    bgColor: "bg-[#F5FBFF]",
    alt: "Hindustan Bytes (duplicate)",
  },
]

export function FeaturedInSection() {
  const swiperRef = useRef<any>(null)

  const handleMouseEnter = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.autoplay.stop()
    }
  }

  const handleMouseLeave = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.autoplay.start()
    }
  }

  return (
     <div className=" px-4 !bg-[#EDF0F1] md:!py-[40px] !py-[20px]">
          <h2 className="text-black !font-montserrat text-center text-[20px] md:!text-[24px] font-semibold leading-[24px] !mb-[40px]">WE ARE FEATURED IN</h2>

          <Swiper
            modules={[Autoplay]}
            spaceBetween={10}
            slidesPerView={2.5}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={true}
            navigation={false}
            breakpoints={{
              480: { slidesPerView: 2.5 },
              600: { slidesPerView: 4 },
              900: { slidesPerView: 5 },
              1200: { slidesPerView: 6 },
              
            }}
            className="!max-w-7xl"
          >
            <SwiperSlide>
              <div>
                <Image height={150} width={150} src="https://assetsvilva.blr1.cdn.digitaloceanspaces.com/tamiltshirts/uploads/AAowYkgGa8P34rUEr1BECX0WlllV6MHbyZUsKsom.webp" alt="featured_img1" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div>
                <Image height={150} width={150} src="https://assetsvilva.blr1.cdn.digitaloceanspaces.com/tamiltshirts/uploads/NoFT1SxOlmWYO4qvErvNhEh5MMlHwvqk46G6IKKG.webp" alt="featured_img1" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div>
                <Image height={150} width={150} src="https://assetsvilva.blr1.cdn.digitaloceanspaces.com/tamiltshirts/uploads/v4wxZIwQdgqL0hdpQaJj4ZQbVFe0wd8XB4U8jtkP.webp" alt="featured_img1" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div>
                <Image height={150} width={150} src="https://assetsvilva.blr1.cdn.digitaloceanspaces.com/tamiltshirts/uploads/BvrI21JxQYKIj77KnpkFR4ny7x5TwwIMnsfpArYn.webp" alt="featured_img1" />

              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div>
                <Image height={150} width={150} src="https://assetsvilva.blr1.cdn.digitaloceanspaces.com/tamiltshirts/uploads/0eHd20UVHyKBXaOrInD6HwWVyjaDovSxPaAF2fdP.webp" alt="featured_img1" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div>
                <Image height={150} width={150} src="https://assetsvilva.blr1.cdn.digitaloceanspaces.com/tamiltshirts/uploads/j5YlFFZamoLw2kFlV911lW3StwxoBpDCvIn8Ovdy.webp" alt="featured_img1" />
              </div>
            </SwiperSlide>


          </Swiper>
        </div>
  )
}
