"use client";

import { useEffect, useState } from "react";
import {
  getWishlist,
  removeFromWishlist,
  WishlistItem,
} from "@/utils/wishlist";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [removedItems, setRemovedItems] = useState<string[]>([]);

  useEffect(() => {
    setWishlist(getWishlist());
  }, []);

  // Toggle product marked for removal
  const toggleRemove = (id: string) => {
    setRemovedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Actually remove items from storage only on refresh/leave
  useEffect(() => {
    const handleBeforeUnload = () => {
      removedItems.forEach((id) => removeFromWishlist(id));
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [removedItems]);

  if (wishlist.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] p-4">
        <h1 className="text-2xl font-bold mb-2">Your Wishlist is Empty</h1>
        <Link href="/" className="text-blue-500 underline">
          Continue Shopping
        </Link>
      </div>
    );
  }

  const isMobile = typeof window !== "undefined" && window.innerWidth < 840;

  return (
    <>
      <Navbar/>
        <div className="max-w-7xl mx-auto p-4">
          <h1 className="md:text-[26px] text-[22px] font-bold md:mb-6 mb-4">My Wishlist</h1>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlist.map((product) => {
              const isRemoved = removedItems.includes(product.id);

              return (
                <div
                  key={product.id}
                  className="bg-white shadow-md rounded-[8px] overflow-hidden"
                >
                  <Link
                    href={`/products/${encodeURIComponent(
                      product.seo_url ?? product.id
                    )}`}
                  >
                    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg">
                      <div className="relative w-full aspect-[4/5]">
                        <Image
                          src={product.imageurl?.[0] || "/placeholder.svg"}
                          alt={product.name || "Product Image"}
                          fill
                          className="object-cover rounded-t-lg"
                        />
                        <span className="absolute top-3 left-3 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-full z-10">
                          Buy 3 @ 799
                        </span>
                      </div>
                      <CardContent className="md:p-4 p-2 text-left">
                        <div className="flex justify-between items-start mb-1">
                          <div className="truncate">
                            <h3 className="text-[14px] font-semibold text-[#292D35] truncate">
                              {product.eng_name}
                            </h3>
                            <h3 className="text-[14px] font-semibold text-[#4E5664] truncate">
                              {product.name}
                            </h3>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-gray_text hover:text-red-500"
                            onClick={(e) => {
                              e.preventDefault();
                              toggleRemove(product.id);
                            }}
                          >
                            {isRemoved ? (
                              // Black outline heart (marked for removal)
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="black"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                              </svg>
                            ) : (
                              // Red filled heart (in wishlist)
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
                              >
                                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                              </svg>
                            )}
                          </Button>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="space-x-[6px]">
                            <span className="text-[16px] font-bold text-black">
                              ₹{product.selling_price ?? "0"}
                            </span>
                            <span className="text-[14px] text-[#737E93] line-through">
                              ₹{product.mrp ?? "0"}
                            </span>
                            <span className="text-[14px] font-medium text-[#008C2D]">
                              {product.discount ?? "0%"} OFF
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      <Footer/>
    </>
  );
}
