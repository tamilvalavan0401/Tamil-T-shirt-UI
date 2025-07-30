"use client"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Autoplay } from "swiper/modules"
import { Button } from "@/components/ui/button"
import Image from "next/image"

// Dummy data for banners (now 5 items)
const banners = [
  {
    id: 1,
    title: "Summer Collection",
    description: "Explore our new arrivals for the perfect summer look.",
    bgColor: "bg-[#F5F5EB]",
    textColor: "text-gray_text",
    linkur:"/products/matching-couple-tee-shirts-i-love-you-navy-blue",
    imgsrc:"https://assetsvilva.blr1.cdn.digitaloceanspaces.com/tamiltshirts/homepage/CouplesT-ShirtsRaja-Rani.webp"
  },
  {
    id: 2,
    title: "Limited Edition",
    description: "Grab your exclusive Tamil T-shirts before they run out!",
    bgColor: "bg-[#F5FBFF]",
    textColor: "text-gray_text",
    imgsrc:"https://assetsvilva.blr1.cdn.digitaloceanspaces.com/tamiltshirts/homepage/CouplesT-ShirtsMudhalNee-MudivumNee.webp"
  },
  {
    id: 3,
    title: "New Designs",
    description: "Fresh styles added daily. Find your unique expression.",
    bgColor: "bg-[#F5FBF5]",
    textColor: "text-gray_text",
    imgsrc:"https://assetsvilva.blr1.cdn.digitaloceanspaces.com/tamiltshirts/homepage/Couples-T-ShirtsI-Love-You.webp"
  },
  {
    id: 4,
    title: "Exclusive Offers",
    description: "Don't miss out on our special discounts!",
    bgColor: "bg-[#F5F5EB]",
    textColor: "text-gray_text",
    imgsrc:"https://assetsvilva.blr1.cdn.digitaloceanspaces.com/tamiltshirts/homepage/Couples-T-Shirts-En-Uyir-Nee-Un-Uyir-Naan.webp"
  },
  {
    id: 5,
    title: "Shop Local",
    description: "Support local artisans and unique designs.",
    bgColor: "bg-[#F5FBFF]",
    textColor: "text-gray_text",
    imgsrc:"https://assetsvilva.blr1.cdn.digitaloceanspaces.com/tamiltshirts/homepage/CouplesT-ShirtsMudhalNee-MudivumNee.webp"
  },
]

export function MainBanner() {
  return (
    <section className="relative w-full overflow-hidden !bg-transparent">
      <Swiper
        modules={[Pagination, Autoplay]}
        slidesPerView={1}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          el: ".main-banner-pagination",
        }}
        breakpoints={{
          768: { slidesPerView: 1 },
          1024: { slidesPerView: 3 },
        }}
        className="w-full"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            {({ isActive }) => (
              <div
                className={`relative flex items-center justify-center !bg-transparent w-full ${banner.bgColor} text-center transition-all duration-300 ease-in-out ${isActive ? "scale-100" : "scale-100"}`}
              >
                <Image
                  src={banner.imgsrc}
                  alt={banner.title}
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-full h-auto object-contain px-2"
                  priority
                />
              </div>
            )}
          </SwiperSlide>
        ))}
        <div className="main-banner-pagination absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-10" />
      </Swiper>
    </section>
  )
}
