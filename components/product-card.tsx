import Image from "next/image"
import { Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Heart from "./Heart"
import Link from "next/link"

type ProductCardProps = {
  product: {
    id: number
    name: string
    eng_name: string
    mrp: number
    sp: number
    seo_url: string
    imageurl: string
    product_tags: string | null
  }
}

const assets = "https://assetsvilva.blr1.cdn.digitaloceanspaces.com/tamiltshirts/"

export default function ProductCard({ product }: ProductCardProps) {
  const discount = Math.round(((product.mrp - product.sp) / product.mrp) * 100)
  const hasGlowInDark = product.product_tags?.includes("GLOW IN DARK")
  const isOversizedFit = product.product_tags?.includes("OVERSIZED FIT")

  // Select the first image URL if multiple are provided
  const firstImageUrl = product.imageurl.split(",")[0].trim()

  return (
    <div className="relative group border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <Link href={`/products/${encodeURIComponent(product.seo_url)}`}>
        <div className="relative w-full aspect-[4/5] bg-gray-100">
          <Image
            src={`${assets}${firstImageUrl}`}
            alt={product.name}
            width={400}
            height={500}
            className="object-cover w-full h-full"
          />
          {hasGlowInDark && (
            <Badge className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded-sm">GLOW IN DARK</Badge>
          )}
          {isOversizedFit && (
            <Badge className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded-sm">
              OVERSIZED FIT
            </Badge>
          )}
          <div className="absolute bottom-2 left-2 flex items-center bg-white/90 px-2 py-1 rounded-full text-xs font-medium">
            <Star className="w-3 h-3 fill-yellow-500 text-yellow-500 mr-1" />
            4.4
          </div>
        </div>
        <div className="p-3">
          <div className="flex justify-between">
            <div className="truncate">
              <h3 className="text-sm font-medium text-category_name truncate">{product.name}</h3>
              <h3 className="text-sm font-medium text-gray_text truncate">{product.eng_name}</h3>
            </div>
            <Heart product={product} />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-base font-semibold text-category_name">₹{product.sp}</span>
            <span className="text-xs text-gray_text line-through">₹{product.mrp}</span>
            <span className="text-xs text-green-600 font-medium">{discount}% OFF</span>
          </div>
        </div>
      </Link>
    </div>
  )
}