"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/components/ui/cart-provider";

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

interface BuyNowButtonProps {
  product: Product;
}

export default function BuyNowButton({ product }: BuyNowButtonProps) {
  const { addToCart } = useCart();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSize, setSelectedSize] = useState(product.size_options[0] || "M"); // Default to first size or "M"
  const [selectedColor, setSelectedColor] = useState(product.color_options[0] || "Black"); // Default to first color or "Black"

  const handleBuyNow = () => {
    setIsLoading(true);
    try {
      // Prepare cart item with required fields for CartItemCard
      const cartItem = {
        id: product.id,
        sp: parseFloat(product.selling_price),
        mrp: parseFloat(product.mrp),
        cartQuantity: 1,
        selectedSize,
        selectedColor,
        eng_name: product.eng_name,
        imageurl: product.imageurl[0], // Use first image
      };
      addToCart(cartItem);
      router.push("/cart");
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      className="flex-1 py-[22px] w-full bg-primary border-2 border-primary text-white hover:bg-primary_hover hover:text-white text-[16px]"
      onClick={handleBuyNow}
      disabled={isLoading}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-shopping-cart-icon lucide-shopping-cart"
      >
        <circle cx="8" cy="21" r="1" />
        <circle cx="19" cy="21" r="1" />
        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
      </svg>
      {isLoading ? "Processing..." : "BUY NOW"}
    </Button>
  );
}