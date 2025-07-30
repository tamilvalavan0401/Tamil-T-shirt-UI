"use client";

import { CoupleTeesSwiper } from '@/components/home-components/couple-tees-swiper';
import { FeaturedInSection } from '@/components/home-components/featured-in-section';
import { MadeInTamilNaduCarousel } from '@/components/home-components/made-in-tamilnadu-carousel';
import { MainBanner } from '@/components/home-components/main-banner';
import EnhancedVideoReelSlider from '@/components/home-components/Mobilevideoreelslider';
import { NewArrivalsSwiper } from '@/components/home-components/new-arrivals-swiper';
import { PopularCategoriesSection } from '@/components/home-components/popular-categories-section';
import { ShopByCategory } from '@/components/home-components/shop-by-category';
import { StyleComboSwiper } from '@/components/home-components/style-combo-swiper';
import { useEffect, useState } from 'react';

const Page = () => {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("/products.json"); // Ensure products.json is in public/
        const data = await response.json();

        if (Array.isArray(data)) {
          setProducts(data);
          localStorage.setItem("products", JSON.stringify(data));
        } else {
          console.error("products.json is not an array");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div>
      <div className="h-screen">
        <MainBanner/>
        <StyleComboSwiper products={products} />
        <ShopByCategory/>
        <MadeInTamilNaduCarousel/>
        <CoupleTeesSwiper products={products} />
        <NewArrivalsSwiper products={products} />
        <FeaturedInSection/>
        <PopularCategoriesSection/>

        <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-200 flex items-center justify-center text-gray_text text-xl font-bold rounded-lg">
            <img src="https://assetsvilva.blr1.cdn.digitaloceanspaces.com/tamiltshirts/uploads/Tamil%20tshirt%20banner%202.webp" alt="" />
            </div>
            <div className="bg-gray-200 flex items-center justify-center text-gray_text text-xl font-bold rounded-lg">
            <img src="https://assetsvilva.blr1.cdn.digitaloceanspaces.com/tamiltshirts/uploads/Tamil%20Tshit%20banner%201.webp" alt="" />
            </div>
        </div>

        <EnhancedVideoReelSlider/>

       
      </div>
    </div>
  );
};

export default Page;
