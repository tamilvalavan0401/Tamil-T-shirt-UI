"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import Heart from "./Heart";
// import { Heart } from "lucide-react";

interface Product {
   id: string;
  name: string;
  eng_name: string;
  category: string;
  subcategory: string | null;
  imageurl: string[];
  selling_price: string;
  mrp: string;
  discount: string;
  star_rating: number;
  description: string;
  color_options: string[];
  size_options: string[];
  seo_url: string;
  meta_tag_title?: string;
  meta_tag_desc?: string;
}

interface RelatedProductsProps {
  allProducts: Product[];
  currentCategory: string;
  currentProductId: string;
}

const assets = "https://assetsvilva.blr1.cdn.digitaloceanspaces.com/tamiltshirts/";


export default function RelatedProducts({ allProducts, currentCategory, currentProductId }: RelatedProductsProps) {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  // Filter products by same category, excluding the current product
  const relatedProducts = allProducts.filter(
    (p) => p.category === currentCategory && p.id !== currentProductId
  );

  if (!relatedProducts || relatedProducts.length === 0) return null;

  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;

  return (
    <div className="mt-12 relative">
      <h2 className="text-2xl font-semibold mb-6">Related Products</h2>

      {/* Navigation buttons */}
      <button
        ref={prevRef}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-100"
      >
        {/* Left arrow SVG */}
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>
      <button
        ref={nextRef}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-100"
      >
        {/* Right arrow SVG */}
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>

      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={16}
        loop={true}
        slidesPerView={1}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
        onInit={(swiper) => {
          if (swiper.params.navigation && typeof swiper.params.navigation !== "boolean") {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }
        }}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        className="w-full"
      >
        {relatedProducts.map((product) => (
          <SwiperSlide key={product.id}>
            <Link href={`/products/${encodeURIComponent(product.seo_url)}`}>
                <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg">
                <div className="relative w-full aspect-[4/5] bg-gray-100">
                  {" "}
                  {/* Changed to aspect-[4/5] */}
                  <Image
                    src={product.imageurl[0] || "/placeholder.svg"}
                    alt={product.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                  />
                  {/* Top-left badge */}
                  {/* {product.badgeTop && ( */}
                    <span className="absolute top-3 left-3 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-full z-10">
                      {/* {product.badgeTop} */}
                      Buy 3 @ 799
                    </span>
                  {/* )} */}
                  
                </div>
                <CardContent className="p-4 text-left">
                  <div className="flex justify-between items-start mb-1">
                    <div className="truncate">
                      <h3 className="text-[14px] font-semibold text-category_name truncate">
                        {product.eng_name}
                      </h3>

                      <h3 className="text-[14px] font-semibold text-pr_eng_name truncate">
                         {product.name}
                      </h3>
                    </div>
                    <Button variant="ghost" size="icon" className="h-6 w-6 text-gray_text hover:text-error">
                      {/* <Heart className="h-4 w-4" />
                      <span className="sr-only">Add to wishlist</span> */}
                      <Heart product={product} />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="space-x-[6px]">
                        <span className="text-[16px] font-bold text-black">₹{product.selling_price}</span>
                        <span className="text-[14px] text-[#737E93] line-through">₹{product.mrp}</span>
                        <span className="text-[14px] font-medium text-offer_text">{product.discount}OFF</span>
                    </div>
                  </div>
                </CardContent>
              </Card>


            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
