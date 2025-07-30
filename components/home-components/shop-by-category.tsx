import Link from "next/link"
import { Card } from "@/components/ui/card"
import Image from "next/image"

const categories = [
  { name: "TAMIL PRIDE", href: "#", imageUrl: "/placeholder.svg?height=260&width=260" },
  { name: "POLO TSHIRTS", href: "#", imageUrl: "/placeholder.svg?height=260&width=260" },
  { name: "ROUND NECK HALF SLEEVE", href: "#", imageUrl: "/placeholder.svg?height=260&width=260" },
  { name: "ZIPPER HOODIES", href: "#", imageUrl: "/placeholder.svg?height=260&width=260" },
  { name: "SWEATED TSHIRTS", href: "#", imageUrl: "/placeholder.svg?height=260&width=260" },
  { name: "APPARELS", href: "#", imageUrl: "/placeholder.svg?height=260&width=260" },
  { name: "CROP TOPS", href: "#", imageUrl: "/placeholder.svg?height=260&width=260" },
  { name: "ROUND NECK FULL SLEEVE", href: "#", imageUrl: "/placeholder.svg?height=260&width=260" },
]

export function ShopByCategory() {
  return (
    <section className="max-w-5xl mx-auto px-4 md:px-6 py-8 md:mt-[40px] mt-[20px]">
      <h2 className="text-[20px] md:text-[24px] font-bold mb-8 text-center">SHOP BY CATEGORY</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category) => (
          <Link href={category.href} key={category.name} className="block w-full">
            <Card
              className="relative aspect-square w-full
                         rounded-[8px] shadow-sm
                         transition-all duration-300 ease-in-out
                         group hover:scale-[1.02] overflow-hidden
                         flex flex-col items-center justify-start"
            >
              {/* Background Image */}
              <div className="absolute inset-0 overflow-hidden rounded-lg">
                <Image
                  src={category.imageUrl || "/placeholder.svg?height=260&width=260"}
                  alt={category.name}
                  fill
                  className="!object-cover transition-transform duration-300 ease-in-out group-hover:scale-[1.01]"
                />
                <div className="absolute inset-0 bg-black/30 rounded-lg transition-opacity duration-300 group-hover:bg-black/20" />
              </div>

              {/* Text Overlay */}
              <div className="relative z-10 flex flex-col items-center justify-start p-4 h-full">
                <div className="text-[14px] font-semibold text-white text-center mt-4">{category.name}</div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}
