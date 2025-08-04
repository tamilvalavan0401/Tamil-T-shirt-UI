"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import Heart from "./Heart";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ShopByCategory } from "./home-components/shop-by-category";
import { MadeInTamilNaduCarousel } from "./home-components/made-in-tamilnadu-carousel";
import { FeaturedInSection } from "./home-components/featured-in-section";
import { PopularCategoriesSection } from "./home-components/popular-categories-section";
import EnhancedVideoReelSlider from "./home-components/Mobilevideoreelslider";
import { LovedBySection } from "./home-components/loved-by-section";
import OurBlogSwiper from "./home-components/our-blog-swiper";
import CatageryHomeSwiper from "./CatageryHomeSwiper";

// Define the Product interface
interface Product {
  id: number;
  name: string;
  category: string;
  eng_name: string;
  descp: string;
  sp: number;
  mrp: number;
  imageurl: string;
  seo_url: string;
  category_name: string;
}

// Define props interface
interface MainHomePageProps {
  styleComboProducts: Product[];
  coupleTeesProducts: Product[];
  newArrivalsProducts: Product[];
}

// const banners = [
//   { title: "Banner 1", imageUrl: "https://assetsvilva.blr1.cdn.digitaloceanspaces.com/tamiltshirts/uploads/pVWIOSTZ44ss2JRHpq238pw42pvHGTD5qtwOBZ8v.webp" },
//   { title: "Banner 2", imageUrl: "https://assetsvilva.blr1.cdn.digitaloceanspaces.com/tamiltshirts/uploads/gZcnpuD0nM4fIT9rQMRBS7FPk3mRDTBCf2r80nAR.webp" },
//   { title: "Banner 3", imageUrl: "/images/banner3.jpg" },
// ];

// Dummy data for banners
const banners = [
  {
    id: 1,
    title: "Summer Collection",
    description: "Explore our new arrivals for the perfect summer look.",
    bgColor: "bg-[#F5F5EB]",
    textColor: "text-gray_text",
    linkur: "/products/matching-couple-tee-shirts-i-love-you-navy-blue",
    imgsrc:
      "https://assetsvilva.blr1.cdn.digitaloceanspaces.com/tamiltshirts/homepage/CouplesT-ShirtsRaja-Rani.webp",
  },
  {
    id: 2,
    title: "Limited Edition",
    description: "Grab your exclusive Tamil T-shirts before they run out!",
    bgColor: "bg-[#F5FBFF]",
    textColor: "text-gray_text",
    imgsrc:
      "https://assetsvilva.blr1.cdn.digitaloceanspaces.com/tamiltshirts/homepage/CouplesT-ShirtsMudhalNee-MudivumNee.webp",
  },
  {
    id: 3,
    title: "New Designs",
    description: "Fresh styles added daily. Find your unique expression.",
    bgColor: "bg-[#F5FBF5]",
    textColor: "text-gray_text",
    imgsrc:
      "https://assetsvilva.blr1.cdn.digitaloceanspaces.com/tamiltshirts/homepage/Couples-T-ShirtsI-Love-You.webp",
  },
  {
    id: 4,
    title: "Exclusive Offers",
    description: "Don't miss out on our special discounts!",
    bgColor: "bg-[#F5F5EB]",
    textColor: "text-gray_text",
    imgsrc:
      "https://assetsvilva.blr1.cdn.digitaloceanspaces.com/tamiltshirts/homepage/Couples-T-Shirts-En-Uyir-Nee-Un-Uyir-Naan.webp",
  },
  {
    id: 5,
    title: "Shop Local",
    description: "Support local artisans and unique designs.",
    bgColor: "bg-[#F5FBFF]",
    textColor: "text-gray_text",
    imgsrc:
      "https://assetsvilva.blr1.cdn.digitaloceanspaces.com/tamiltshirts/homepage/CouplesT-ShirtsMudhalNee-MudivumNee.webp",
  },
];

const assets = "https://assetsvilva.blr1.cdn.digitaloceanspaces.com/tamiltshirts/";



export default function MainHomePage({
  styleComboProducts,
  coupleTeesProducts,
  newArrivalsProducts,
}: MainHomePageProps) {
  console.log(coupleTeesProducts.map(product => product.category_name),"filtercatagery");
  return (
    
    <main className="min-h-screen">

      <div className="md:hidden block">
        <CatageryHomeSwiper />
      </div>

      {/* Main Banner Section */}
      <section className="relative w-full overflow-hidden !bg-transparent ">
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
                  className={`relative flex items-center justify-center !bg-transparent w-full ${banner.bgColor} text-center transition-all duration-300 ease-in-out ${
                    isActive ? "scale-100" : "scale-100"
                  }`}
                >
                  {/* <Link href={banner.linkur}> */}
                    <Image
                      src={banner.imgsrc}
                      alt={banner.title}
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="w-full h-auto object-contain px-2"
                      priority
                    />
                  {/* </Link> */}
                </div>
              )}
            </SwiperSlide>
          ))}
          <div className="main-banner-pagination absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-10" />
        </Swiper>
      </section>
      

      {/* <div className="!w-full !h-[400px]">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        slidesPerView={1}
        pagination={{ clickable: true }}
        className="!h-full custom-swiper"
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={index}>
            <div className="relative !w-full !h-full">
              <img
                src={banner.imageUrl}
                alt={banner.title}
                className="!w-full !h-full !object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded">
                {banner.title}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .custom-swiper .swiper-pagination-bullet {
          background: #ddd;
          opacity: 1;
          width: 10px;
          height: 10px;
        }
        .custom-swiper .swiper-pagination-bullet-active {
          background: #F556F4;
        }
      `}</style>
    </div> */}

      {/* Style Combo Section */}
      <section className="container mx-auto px-4 md:py-[40px] py-[20px] md:px-6 bg-pr_section_bg space-y-0">
        <h2 className="text-[20px] md:text-[24px] font-bold mb-6 text-center">STYLE COMBO</h2>
        <div className="relative">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            loop
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 20 },
              768: { slidesPerView: 3, spaceBetween: 30 },
              1024: { slidesPerView: 4, spaceBetween: 30 },
            }}
            className="pb-10"
            onBeforeInit={(swiper) => {
              // @ts-ignore
              swiper.params.navigation.prevEl = ".style-combo-prev";
              // @ts-ignore
              swiper.params.navigation.nextEl = ".style-combo-next";
              swiper.navigation.init();
              swiper.navigation.update();
            }}
          >
            {styleComboProducts.length > 0 ? (
              styleComboProducts.map((product) => (
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
                      <div className="text-left mt-[16px] px-1">
                        <div className="flex justify-between items-start mb-1">
                          <div className="flex flex-col">
                            <div className="truncate">
                              <h3 className="w-full truncate whitespace-nowrap overflow-hidden text-base text-category_name">
                                 {product.category_name}
                              </h3>
                            </div>
                            <div className="w-[90%] truncate">
                              <p className="w-full truncate whitespace-nowrap overflow-hidden text-xs text-pr_eng_name">
                                {product.name}
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 !z-50 w-6 text-gray_text hover:text-error"
                          >
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
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))
            ) : (
              <p className="text-center">Loading products...</p>
            )}
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

      <div className="space-y-[50px]">

      <ShopByCategory/>

      <MadeInTamilNaduCarousel/>

      {/* Couple Tees Section */}
      <section className="container mx-auto px-4 md:px-6 md:my-[40px] my-[20px]">
  <h2 className="text-[20px] md:text-[24px] font-bold mb-6 text-center">COUPLE TEES 💖</h2>
  <div className="relative">
    <Swiper
      modules={[Navigation, Autoplay]}
      spaceBetween={20}
      slidesPerView={1}
      loop
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      navigation={{ nextEl: ".couple-tees-next", prevEl: ".couple-tees-prev" }}
      breakpoints={{
        640: { slidesPerView: 2, spaceBetween: 20 },
        768: { slidesPerView: 3, spaceBetween: 30 },
        1024: { slidesPerView: 4, spaceBetween: 30 },
      }}
      className="pb-10"
    >
      {coupleTeesProducts.length > 0 ? (
        coupleTeesProducts
          // .filter((product) => product.category_name === "Printed Couple T-Shirts")
          .map((product) => (
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
                  <CardContent className="p-4 text-left">
                    <div className="flex justify-between items-start mb-1">
                      <div className="!w-[90%]">
                        <div className="w-[90%]">
                          <h3 className="w-full truncate whitespace-nowrap overflow-hidden text-base text-category_name">
                            {product.category_name}
                          </h3>
                        </div>
                        <div className="w-[90%]">
                          <p className="w-full truncate whitespace-nowrap overflow-hidden text-xs text-pr_eng_name">
                            {product.name}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 !z-50 w-6 text-gray_text hover:text-error"
                      >
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
          ))
      ) : (
        <p className="text-center">Loading products...</p>
      )}
    </Swiper>
    <Button
      variant="ghost"
      size="icon"
      className="couple-tees-prev absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full h-10 w-10 shadow-md"
    >
      <ChevronLeft className="h-6 w-6" />
    </Button>
    <Button
      variant="ghost"
      size="icon"
      className="couple-tees-next absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full h-10 w-10 shadow-md"
    >
      <ChevronRight className="h-6 w-6" />
    </Button>
  </div>
</section>

      {/* New Arrivals Section */}
      <section className="container mx-auto px-4 md:px-6 md:my-[40px] my-[20px]">
        <h2 className="text-[20px] md:text-[24px] font-bold mb-6 text-center">NEW ARRIVALS</h2>
        <div className="relative">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            loop
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            navigation={{ nextEl: ".new-arrivals-next", prevEl: ".new-arrivals-prev" }}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 20 },
              768: { slidesPerView: 3, spaceBetween: 30 },
              1024: { slidesPerView: 4, spaceBetween: 30 },
            }}
            className="pb-10"
          >
            {newArrivalsProducts.length > 0 ? (
              newArrivalsProducts.map((product) => (
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
                      <CardContent className="text-left">
                        <div className="flex justify-between items-start mb-1">
                          <div className="!w-[90%]">
                            <div className="w-[90%]">
                              <h3 className="w-full truncate whitespace-nowrap overflow-hidden text-base text-category_name">
                                {product.category_name}
                              </h3>
                            </div>
                            <div className="w-[90%]">
                              <p className="w-full truncate whitespace-nowrap overflow-hidden text-xs text-pr_eng_name">
                                {product.name}
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 !z-50 w-6 text-gray_text hover:text-error"
                          >
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
              ))
            ) : (
              <p className="text-center">Loading products...</p>
            )}
          </Swiper>
          <Button
            variant="ghost"
            size="icon"
            className="new-arrivals-prev absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full h-10 w-10 shadow-md"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="new-arrivals-next absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full h-10 w-10 shadow-md"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </section>

      <FeaturedInSection/>

      <PopularCategoriesSection/>

      <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className=" flex items-center justify-center text-xl font-bold">
          <img className=" rounded-[8px]" src="https://assetsvilva.blr1.cdn.digitaloceanspaces.com/tamiltshirts/uploads/skPU6xoYsb5VDuOF24oXzHRZeoQEusvwvyH8JQnn.webp" alt="" />
        </div>
        <div className=" flex items-center justify-center text-xl font-bold ">
          <img className=" rounded-[8px]" src="https://assetsvilva.blr1.cdn.digitaloceanspaces.com/tamiltshirts/uploads/lg049hCeSYepyagdBuTZ6yC8qh9tuYKAmt8Vl8R5.webp" alt="" />
        </div>
      </div>

      <EnhancedVideoReelSlider/>

      {/* Hot Picks Section */}
      <section className="container mx-auto px-4 md:py-[40px] py-[20px] md:px-6 bg-pr_section_bg">
        <h2 className="text-[20px] md:text-[24px] font-bold mb-6 text-center uppercase">Hot Picks of the Week</h2>
        <div className="relative">
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            loop
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 20 },
              768: { slidesPerView: 3, spaceBetween: 30 },
              1024: { slidesPerView: 4, spaceBetween: 30 },
            }}
            className="pb-10"
            onBeforeInit={(swiper) => {
              // @ts-ignore
              swiper.params.navigation.prevEl = ".style-combo-prev";
              // @ts-ignore
              swiper.params.navigation.nextEl = ".style-combo-next";
              swiper.navigation.init();
              swiper.navigation.update();
            }}
          >
            {styleComboProducts.length > 0 ? (
              styleComboProducts.map((product) => (
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
                      <div className="text-left mt-[16px] px-1">
                        <div className="flex justify-between items-start mb-1">
                          <div className="flex flex-col">
                            <div className="truncate">
                              <h3 className="w-full truncate whitespace-nowrap overflow-hidden text-base text-category_name">
                                 {product.category_name}
                              </h3>
                            </div>
                            <div className="w-[90%] truncate">
                              <p className="w-full truncate whitespace-nowrap overflow-hidden text-xs text-pr_eng_name">
                                {product.name}
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 !z-50 w-6 text-gray_text hover:text-error"
                          >
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
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))
            ) : (
              <p className="text-center">Loading products...</p>
            )}
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


      {/* What Our Customers Say */}
          <section className="container px-4 mx-auto relative !py-[40px]">
              {/* Decorative Icons */}
              <div className="absolute top-0 left-5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="192" height="136" viewBox="0 0 192 136" fill="none">
                      <path d="M0 40.0002V122.286H82.2859V40.0002H27.4288C27.4288 9.75261 52.0382 -14.8569 82.2859 -14.8569V-42.2856C36.9107 -42.2856 0 -5.37494 0 40.0002Z" fill="#F1FAF2" />
                      <path d="M192 -14.8569V-42.2856C146.625 -42.2856 109.714 -5.37494 109.714 40.0002V122.286H192V40.0002H137.143C137.143 9.75261 161.752 -14.8569 192 -14.8569Z" fill="#F1FAF2" />
                  </svg>
              </div>
              <div className="absolute bottom-0 right-5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="244" height="187" viewBox="0 0 244 187" fill="none">
                      <g opacity="0.1">
                          <path d="M37.2939 122C49.0306 117.25 60.2877 111.391 70.9125 104.504C85.7202 94.4203 97.6 83.6309 101.855 65.8876C106.109 48.1442 97.4513 34.1104 82.8189 30.5838C78.4401 29.6102 73.8949 29.6675 69.542 30.7513C65.1891 31.835 61.1476 33.9156 57.7365 36.8287C56.0212 32.6815 53.3668 28.989 49.9823 26.0417C46.5977 23.0944 42.5754 20.9729 38.2317 19.844C23.5955 16.3174 9.53123 24.8689 5.25742 42.6122C0.983604 60.3556 6.68329 75.3769 15.2957 91.1187C21.634 102.086 28.9998 112.426 37.2939 122Z" fill="#F28277" />
                          <path d="M175.28 151.417C179.475 146.06 183.15 140.315 186.256 134.261C190.45 125.607 193.118 117.41 190.343 108.023C187.567 98.6371 179.794 94.4319 172.043 96.7156C169.74 97.4375 167.636 98.6855 165.898 100.361C164.161 102.036 162.837 104.093 162.031 106.369C160.121 104.901 157.896 103.895 155.532 103.432C153.168 102.969 150.728 103.061 148.405 103.7C140.647 105.988 136.377 113.731 139.137 123.117C141.897 132.504 148.562 137.963 156.778 142.965C162.663 146.362 168.859 149.192 175.28 151.417Z" fill="#F28277" />
                          <path d="M170.884 217.053C174.318 213.619 177.419 209.868 180.144 205.848C184.195 200.678 186.043 194.118 185.287 187.594C185.188 186.153 184.79 184.748 184.119 183.469C183.449 182.189 182.52 181.063 181.391 180.161C180.262 179.26 178.959 178.602 177.563 178.23C176.167 177.859 174.709 177.781 173.282 178.002C171.59 178.314 169.993 179.015 168.618 180.049C167.243 181.083 166.126 182.422 165.356 183.961C164.127 182.757 162.636 181.856 161 181.327C159.364 180.797 157.628 180.655 155.927 180.911C154.506 181.165 153.153 181.712 151.954 182.516C150.755 183.32 149.735 184.364 148.96 185.583C148.185 186.801 147.671 188.167 147.451 189.594C147.231 191.021 147.309 192.478 147.681 193.873C149.088 200.289 152.968 205.891 158.478 209.466C162.363 212.383 166.517 214.923 170.884 217.053Z" fill="#F28277" />
                          <path d="M78.6633 196.679C85.208 194.833 91.5618 192.367 97.6381 189.314C106.132 184.803 113.105 179.748 116.411 170.537C119.716 161.326 115.911 153.343 108.302 150.609C106.021 149.834 103.592 149.599 101.205 149.923C98.8176 150.246 96.5383 151.119 94.5462 152.473C93.8699 150.161 92.6664 148.038 91.0304 146.269C89.3944 144.501 87.3705 143.136 85.1179 142.283C77.4929 139.549 69.4866 143.285 66.1812 152.492C62.8758 161.7 65.0374 170.03 68.7165 178.925C71.4619 185.145 74.7924 191.09 78.6633 196.679Z" fill="#EDB6B1" />
                      </g>
                  </svg>
              </div>

              {/* Title and Subtitle */}
              <h2 className="text-black relative !font-montserrat text-center text-[20px] md:!text-[24px] font-semibold leading-[24px] !mb-[12px] uppercase">
                  What Our Customers Say
              </h2>
              <p className="text-[#86969B] relative text-center text-[13px] font-normal leading-[100%] capitalize font-[Montserrat] !mb-[40px]">
                  “Because nothing speaks louder than honest feedback”
              </p>

              {/* Swiper Slider */}
              <div className="md:!container overflow-hidden relative">
                  <Swiper
                      modules={[Autoplay, Pagination]}
                      spaceBetween={15}
                      slidesPerView={1}
                      autoplay={{ delay: 3000, disableOnInteraction: false }}
                      loop={true}

                      pagination={{
                          el: '.firstpagination6',
                          clickable: true,
                          bulletClass: 'firstpagination-bullet6',
                          bulletActiveClass: 'firstpagination-bullet-active6',
                      }}

                  >
                      {[1, 2, 3].map((_, index) => (
                          <SwiperSlide key={index}>
                              <div className="w-full md:!w-[550px] mx-auto">
                                  <p className="text-[#21343E] text-center !text-[22px] md:!text-[24px] font-semibold italic leading-[150%] font-[Montserrat]">
                                      “The fabric quality is outstanding. I've washed it multiple times and it still feels brand new. Finally, a brand that delivers what it promises.”
                                  </p>
                                  <p className="text-black text-center text-[14px] font-semibold leading-[100%] font-[Montserrat] !mt-[10px] !mb-[16px]">
                                      -Vigneshwaran
                                  </p>
                              </div>
                          </SwiperSlide>
                      ))}
                  </Swiper>


                  <div className="firstpagination6 flex justify-center mt-4 "></div>


              </div>

          </section>


      <div className="max-w-7xl mx-auto px-4">
        <div className=" flex items-center justify-center text-gray-600 text-xl font-bold rounded-lg">
          <img className="rounded-[8px]" src="https://assetsvilva.blr1.cdn.digitaloceanspaces.com/tamiltshirts/uploads/Tamil%20Tshit%20banner%201.webp" alt="" />
        </div>
      </div>

      
        
      </div>

      <OurBlogSwiper />

       <LovedBySection/>


    </main>
  );
}