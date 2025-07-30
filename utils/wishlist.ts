// utils/wishlist.ts

export interface WishlistItem {
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

const WISHLIST_KEY = "wishlist";

export function getWishlist(): WishlistItem[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(WISHLIST_KEY);
  return data ? JSON.parse(data) : [];
}

export function addToWishlist(item: WishlistItem): void {
  if (typeof window === "undefined") return;
  const wishlist = getWishlist();
  if (!wishlist.find((p) => p.id === item.id)) {
    wishlist.push(item);
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  }
}

export function removeFromWishlist(id: string): void {
  if (typeof window === "undefined") return;
  const wishlist = getWishlist().filter((p) => p.id !== id);
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
}

export function isInWishlist(id: string): boolean {
  return getWishlist().some((p) => p.id === id);
}

export function toggleWishlist(item: WishlistItem): void {
  if (isInWishlist(item.id)) {
    removeFromWishlist(item.id);
  } else {
    addToWishlist(item);
  }
}
