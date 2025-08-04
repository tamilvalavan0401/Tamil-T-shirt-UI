"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Link from "next/link";

interface Category {
  id: number;
  name: string;
  seo_url: string;
  banner: string | null;
  sortorder: number;
}

const CatageryHomeSwiper = () => {
  const [mainCategories, setMainCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          "https://assetsvilva.blr1.cdn.digitaloceanspaces.com/ecomsaas/redisapi/hq2Tam171123/category.json"
        );
        const data = await res.json();
        const filteredData = data.filter((cat: any) => cat.parent_id === 0);
        setMainCategories(filteredData);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section>
      <div className="mobile-src !my-[24px] lg:!px-20 md:!px-[80px] sm:!px-[20px] !px-[10px] sm:!pl-0 !pl-4 ">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={10}
          loop={true}
          navigation={false}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            0: { slidesPerView: 4.5 },
            468: { slidesPerView: 5 },
            500: { slidesPerView: 6 },
          }}
        >
          {mainCategories
            .sort((a, b) => a.sortorder - b.sortorder)
            .map((mainCategory) => (
              <SwiperSlide key={mainCategory.id}>
                <Link
                  href={`/category/${mainCategory.seo_url}`}
                  className="!w-fit !flex !flex-col !mx-auto !justify-center !items-center"
                >
                  {mainCategory.banner ? (
                    <img
                      loading="lazy"
                      className="!rounded-[6px] !mb-[6px] !h-[80px] !w-[80px] !object-cover !object-top"
                      src={`https://assetsvilva.blr1.cdn.digitaloceanspaces.com/tamiltshirts/${mainCategory.banner}`}
                      alt={mainCategory.name || "Category Image"}
                    />
                  ) : (
                    <div className="!h-[80px] !w-[80px] !rounded-[6px] !mb-[6px] !bg-[#CFE8D4] flex items-center justify-center text-center border-4 border-gray-800" />
                  )}
                  <p className="text-black !text-center !text-[10px] font-medium leading-[100%] font-[Montserrat] block">
                    {mainCategory.name}
                  </p>
                </Link>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </section>
  );
};

export default CatageryHomeSwiper;
