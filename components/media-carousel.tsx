"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Image from "next/image"

interface MediaItem {
  type: "image" // Only image type is supported now
  src: string
  alt?: string
  query?: string // For placeholder images
}

interface MediaCarouselProps {
  media: MediaItem[]
  interval?: number // Interval for image slides in ms
}

export function MediaCarousel({ media, interval = 3000 }: MediaCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const slideIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const goToNextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % media.length)
  }, [media.length])

  const startAutoSlide = useCallback(() => {
    if (slideIntervalRef.current) {
      clearInterval(slideIntervalRef.current)
    }
    slideIntervalRef.current = setInterval(goToNextSlide, interval)
  }, [goToNextSlide, interval])

  useEffect(() => {
    startAutoSlide() // Always auto-slide for images

    return () => {
      if (slideIntervalRef.current) {
        clearInterval(slideIntervalRef.current)
      }
    }
  }, [currentIndex, media, startAutoSlide])

  const handleImageClick = () => {
    goToNextSlide()
  }

  return (
    <div className="relative h-full w-full overflow-hidden">
      {media.map((item, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
          onClick={handleImageClick} // Click to advance
        >
          <Image
            src={item.src || "/placeholder.svg"}
            alt={item.alt || "Carousel image"}
            width={1000}
            height={1000}
            className="h-full w-full object-cover cursor-pointer"
          />
        </div>
      ))}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2">
        {media.map((_, index) => (
          <button
            key={index}
            className={`transition-all duration-300 ${
              index === currentIndex
                ? "h-1.5 w-4 bg-primary rounded-full"
                : "h-1.5 w-1.5 rounded-full bg-white opacity-50"
            }`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
