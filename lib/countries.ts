import type { StaticImageData } from "next/image"

// Placeholder images for flags
const indiaFlag = "/placeholder.svg?height=20&width=20"
const uaeFlag = "/placeholder.svg?height=20&width=20"
const usaFlag = "/placeholder.svg?height=20&width=20"
const ukFlag = "/placeholder.svg?height=20&width=20"
const canadaFlag = "/placeholder.svg?height=20&width=20"
const franceFlag = "/placeholder.svg?height=20&width=20"

export interface Country {
  name: string
  code: string
  flag: string | StaticImageData
}

export const countries: Country[] = [
  { name: "India", code: "+91", flag: 'https://assetsvilva.blr1.cdn.digitaloceanspaces.com/tamiltshirts/uploads/Et7X0TdAvbaHvLMOXttSZ5M5sMnrrSwGVwTKGVBI.webp' },
  { name: "United Arab Emirates", code: "+971", flag: 'https://assetsvilva.blr1.cdn.digitaloceanspaces.com/tamiltshirts/uploads/zrSbRAwRchM1rldPI5Kz7IXJC87qZIkLCInYqbpO.webp' },
  { name: "USA", code: "+1", flag: 'https://assetsvilva.blr1.cdn.digitaloceanspaces.com/tamiltshirts/uploads/vVDrjbOcNdowKlndtbT0t7qoMYJQCyo3DKRJXkaK.webp' },
  { name: "United Kingdom", code: "+44", flag: 'https://assetsvilva.blr1.cdn.digitaloceanspaces.com/tamiltshirts/uploads/6ODjW8s1P5nlowr0binu3AK4ysgjYdxrmFyVQQKY.webp' },
  { name: "Canada", code: "+1", flag: 'https://assetsvilva.blr1.cdn.digitaloceanspaces.com/tamiltshirts/uploads/WKQNDknAMJfQWZ0oBBJLnx1yFZoVJRfVMq75iAVa.webp' },
]
