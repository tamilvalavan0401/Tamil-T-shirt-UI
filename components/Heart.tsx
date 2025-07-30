"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { toggleWishlist, isInWishlist, WishlistItem } from "@/utils/wishlist";

interface HeartProps {
  product: {
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
  };
}

const Heart: React.FC<HeartProps> = ({ product }) => {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (product?.id) {
      setLiked(isInWishlist(product.id));
    }
  }, [product.id]);

  const handleToggle = () => {
    const wishlistItem: WishlistItem = {
        id: product.id,
        name: product.name,
        eng_name: product.eng_name,
        imageurl: product.imageurl,
        selling_price: product.selling_price,
        seo_url: product.seo_url,
        mrp: product.mrp,
        discount: product.discount,
        category: "",
        subcategory: null,
        star_rating: 0,
        description: "",
        color_options: [],
        size_options: []
    };
    toggleWishlist(wishlistItem);
    setLiked(!liked);
  };

  return (
    <Button
      onClick={handleToggle}
    //   className="flex-1 w-full py-[22px] rounded-[8px] border-2 border-[#909090]"
    >
      {liked ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="red"
          stroke="red"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-heart-icon lucide-heart !p-[0px] !m-[0px]"
        >
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-heart-icon lucide-heart !p-[0px] !m-[0px]"
        >
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
      )}
    </Button>
  );
};

export default Heart;
