"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";

// Sample product data
const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    image: "https://via.placeholder.com/300x300?text=Headphones",
    price: 59.99,
    mrp: 79.99,
    offer: "25% OFF",
  },
  {
    id: 2,
    name: "Smart Watch",
    image: "https://via.placeholder.com/300x300?text=Smart+Watch",
    price: 89.99,
    mrp: 119.99,
    offer: "20% OFF",
  },
  {
    id: 3,
    name: "Bluetooth Speaker",
    image: "https://via.placeholder.com/300x300?text=Speaker",
    price: 39.99,
    mrp: 49.99,
    offer: "15% OFF",
  },
  {
    id: 4,
    name: "USB-C Cable",
    image: "https://via.placeholder.com/300x300?text=USB+Cable",
    price: 14.99,
    mrp: 19.99,
    offer: "25% OFF",
  },
  {
    id: 5,
    name: "Laptop Stand",
    image: "https://via.placeholder.com/300x300?text=Laptop+Stand",
    price: 29.99,
    mrp: 39.99,
    offer: "30% OFF",
  },
];

const Demosetup = () => {
  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold text-center mb-6">Featured Products</h2>
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        navigation
        pagination={{ clickable: true }}
        className="mySwiper"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative h-48">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover w-full h-full"
                />
                <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                  {product.offer}
                </span>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold truncate">{product.name}</h3>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xl font-bold text-green-600">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-sm text-gray-500 line-through">
                    ${product.mrp.toFixed(2)}
                  </span>
                </div>
                <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                  Add to Cart
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Demosetup;
