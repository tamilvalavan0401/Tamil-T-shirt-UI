"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, type PanInfo } from "framer-motion"
import { ChevronLeft, ChevronRight, X, Volume2, VolumeX } from "lucide-react"

interface VideoReel {
  id: string
  src: string
  title: string
  price: string
  originalPrice: string
  thumbnail?: string
}

const sampleReels: VideoReel[] = [
  {
    id: "0",
    src: "https://assetsvilva.blr1.cdn.digitaloceanspaces.com/tamiltshirts/uploads/S2ONh93nJWHC9sVFMYCoII2CE7NszBHa7uG5uyYi.mp4",
    title: "Classic Design Tee",
    price: "₹499",
    originalPrice: "₹699",
  },
  {
    id: "1",
    src: "https://assetsvilva.blr1.cdn.digitaloceanspaces.com/tamiltshirts/uploads/S2ONh93nJWHC9sVFMYCoII2CE7NszBHa7uG5uyYi.mp4",
    title: "Vintage Collection",
    price: "₹599",
    originalPrice: "₹799",
  },
  {
    id: "2",
    src: "https://assetsvilva.blr1.cdn.digitaloceanspaces.com/tamiltshirts/uploads/S2ONh93nJWHC9sVFMYCoII2CE7NszBHa7uG5uyYi.mp4",
    title: "Premium Cotton",
    price: "₹799",
    originalPrice: "₹999",
  },
  {
    id: "3",
    src: "https://assetsvilva.blr1.cdn.digitaloceanspaces.com/tamiltshirts/uploads/S2ONh93nJWHC9sVFMYCoII2CE7NszBHa7uG5uyYi.mp4",
    title: "Limited Edition",
    price: "₹899",
    originalPrice: "₹1199",
  },
  {
    id: "4",
    src: "https://assetsvilva.blr1.cdn.digitaloceanspaces.com/tamiltshirts/uploads/S2ONh93nJWHC9sVFMYCoII2CE7NszBHa7uG5uyYi.mp4",
    title: "Summer Special",
    price: "₹649",
    originalPrice: "₹849",
  },
]

export default function EnhancedVideoReelSlider() {
  const [currentIndex, setCurrentIndex] = useState(2)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [progress, setProgress] = useState(0)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const modalVideoRef = useRef<HTMLVideoElement>(null)

  // Lock/unlock body scroll
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden"
      document.body.style.paddingRight = "0px"
    } else {
      document.body.style.overflow = "unset"
      document.body.style.paddingRight = "0px"
    }

    return () => {
      document.body.style.overflow = "unset"
      document.body.style.paddingRight = "0px"
    }
  }, [isModalOpen])

  // Handle modal video autoplay and progress
  useEffect(() => {
    if (isModalOpen && modalVideoRef.current) {
      const video = modalVideoRef.current
      video.currentTime = 0
      video.muted = isMuted
      video.play().catch(() => {
        // Handle autoplay restrictions
      })
      const updateProgress = () => {
        if (video.duration) {
          setProgress((video.currentTime / video.duration) * 100)
        }
      }
      video.addEventListener("timeupdate", updateProgress)
      return () => {
        video.removeEventListener("timeupdate", updateProgress)
      }
    } else {
      setProgress(0)
    }
  }, [isModalOpen, currentIndex, isMuted])

  // Play only the center video (muted) and handle progress
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentIndex) {
          video.muted = true
          video.currentTime = 0
          video.play().catch(() => {
            // Handle autoplay restrictions
          })
          const updateProgress = () => {
            if (video.duration) {
              setProgress((video.currentTime / video.duration) * 100)
            }
          }
          video.addEventListener("timeupdate", updateProgress)
          return () => {
            video.removeEventListener("timeupdate", updateProgress)
          }
        } else {
          video.pause()
          video.currentTime = 0 // Reset non-current videos
        }
      }
    })
  }, [currentIndex])

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isModalOpen) {
        if (event.key === "Escape") {
          handleCloseModal()
        } else if (event.key === "ArrowLeft") {
          handlePrevious()
        } else if (event.key === "ArrowRight") {
          handleNext()
        } else if (event.key === " ") {
          event.preventDefault()
          toggleMute()
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isModalOpen, currentIndex])

  const handlePrevious = () => {
    setCurrentIndex(currentIndex === 0 ? sampleReels.length - 1 : currentIndex - 1)
  }

  const handleNext = () => {
    setCurrentIndex(currentIndex === sampleReels.length - 1 ? 0 : currentIndex + 1)
  }

  const handleReelClick = (index: number) => {
    if (index === currentIndex) {
      setIsModalOpen(true)
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    if (modalVideoRef.current) {
      modalVideoRef.current.pause()
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const handlePanEnd = (event: any, info: PanInfo) => {
    const threshold = 50
    if (info.offset.x > threshold) {
      handlePrevious()
    } else if (info.offset.x < -threshold) {
      handleNext()
    }
  }

  const getReelStyle = (index: number) => {
    const diff = index - currentIndex
    const isCenter = diff === 0
    const isAdjacent = Math.abs(diff) === 1
    const isVisible = Math.abs(diff) <= 2

    if (!isVisible) return { display: "none" }

    return {
      transform: `translateX(${diff * 85}%) scale(${isCenter ? 1 : 0.85})`,
      opacity: isCenter ? 1 : isAdjacent ? 0.6 : 0.3,
      filter: isCenter ? "none" : "blur(1px)",
      zIndex: isCenter ? 10 : isAdjacent ? 5 : 1,
    }
  }

  const handleBuyNow = () => {
    console.log(`Purchasing: ${sampleReels[currentIndex].title}`)
  }

  return (
    <div className="w-full !bg-white overflow-hidden">
      <h2 className="text-[20px] md:text-[24px] font-bold mb-6 text-center uppercase">Behind Every Tee Is a Story</h2>
      <div className="relative w-full h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden px-4">
        <div className="!relative w-full max-w-sm h-full">
          {sampleReels.map((reel, index) => (
            <motion.div
              key={reel.id}
              className="absolute inset-0 cursor-pointer"
              style={getReelStyle(index)}
              animate={getReelStyle(index)}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
              drag={index === currentIndex ? "x" : false}
              dragConstraints={{ left: -50, right: 50 }}
              dragElastic={0.2}
              onDragEnd={handlePanEnd}
              onClick={() => handleReelClick(index)}
            >
              <div className="w-full !h-full !p-3 bg-white rounded-[8px] shadow-lg">
                <div className="relative w-full h-full">
                  <video
                    ref={(el) => {
                      videoRefs.current[index] = el
                    }}
                    className="w-full h-full object-cover !rounded-[8px]"
                    loop={true}
                    muted
                    playsInline
                    preload="metadata"
                  >
                    <source src={reel.src} type="video/mp4" />
                  </video>
                  <div className="!w-full !h-8 !flex !justify-center">
                    {index === currentIndex && (
                      <div className="absolute !top-4 !left-0 !ml-2 !w-[96%] h-[2px] !rounded-full !bg-[#0000006f]">
                        <div
                          className="!bg-white h-full transition-all duration-100 !rounded-full"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    )}
                  </div>
                </div>

                {index === currentIndex && (
                  <>
                    <button
                      aria-label="handle Prev Button"
                      className="absolute !left-5 top-1/2 flex justify-center items-center -translate-y-1/2 !bg-white/80 hover:!bg-white text-black rounded-full w-8 h-8 transition-all duration-200"
                      onClick={(e) => {
                        e.stopPropagation()
                        handlePrevious()
                      }}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    <button
                      aria-label="handle Next Button"
                      className="absolute !right-5 top-1/2 flex justify-center items-center -translate-y-1/2 !bg-white/80 hover:!bg-white text-black rounded-full w-8 h-8 transition-all duration-200"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleNext()
                      }}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>

                    <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
                      {currentIndex + 1}
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          ))}

          <div className="absolute bottom-3 w-full z-10">
            <div className="!p-6">
              <div className="w-full flex items-center justify-between h-[56px] !p-[6px] flex-shrink-0 rounded-[4px] !bg-white/15 !backdrop-blur-[10px] !backdrop-saturate-[200%]">
                <div className="flex items-center gap-[10px]">
                  <img
                    className="!w-[45px] !object-cover !h-[45px] !rounded-[4px]"
                    src="https://assetsvilva.blr1.cdn.digitaloceanspaces.com/tamiltshirts/uploads/1oiwKoEOLK040mafRxYPgpCbB69ez0oOJ9ZudM0f.webp"
                    alt={sampleReels[currentIndex].title}
                  />
                  <div>
                    <p className="text-white text-[14px] font-medium leading-[100%]">{sampleReels[currentIndex].title}</p>
                    <div className="flex mt-[6px] items-center gap-[8px]">
                      <p className="text-white text-[14px] font-semibold leading-none font-[Montserrat]">
                        {sampleReels[currentIndex].price}
                      </p>
                      <p className="text-[#272727] text-[14px] font-medium line-through font-[Montserrat]">
                        {sampleReels[currentIndex].originalPrice}
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleBuyNow()
                  }}
                  className="inline-flex h-[38px] !px-[16px] !py-[10px] justify-center items-center gap-[10px] flex-shrink-0 rounded-[2px] !bg-white !backdrop-blur-[20px] text-black text-[14px] font-semibold leading-[120%] font-[Montserrat] hover:bg-gray-100 transition-colors duration-200"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="relative w-full h-full max-w-md mx-auto flex flex-col"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <button
                className="absolute top-4 !bg-white/15 !backdrop-blur-[10px] !backdrop-saturate-[200%] right-4 z-20 !text-white hover:!bg-white/20 rounded-full p-2 transition-all duration-200 flex items-center justify-center"
                onClick={handleCloseModal}
              >
                <X className="w-6 h-6" />
              </button>

              <button
                className="absolute left-4 top-1/2 !bg-white/15 !backdrop-blur-[10px] !backdrop-saturate-[200%] -translate-y-1/2 z-20 text-white hover:!bg-white/20 rounded-full p-2 transition-all duration-200 flex items-center justify-center"
                onClick={handlePrevious}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                className="absolute z-50 right-4 top-1/2 !bg-white/15 !backdrop-blur-[10px] !backdrop-saturate-[200%] -translate-y-1/2 text-white hover:!bg-white/20 rounded-full p-2 transition-all duration-200 flex items-center justify-center"
                onClick={handleNext}
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              <button
                className="absolute !bg-white/15 !backdrop-blur-[10px] !backdrop-saturate-[200%] top-4 left-4 z-50 text-white hover:!bg-white/20 rounded-full p-2 transition-all duration-200 flex items-center justify-center"
                onClick={toggleMute}
              >
                {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
              </button>

              <div className="flex-1 relative">
                <div className="relative w-full h-full">
                  <video
                    ref={modalVideoRef}
                    className="w-full h-full object-cover"
                    autoPlay
                    loop={true}
                    muted={isMuted}
                    playsInline
                    onClick={handleCloseModal}
                  >
                    <source src={sampleReels[currentIndex].src} type="video/mp4" />
                  </video>
                  <div className="absolute top-0 left-0 w-full h-[4px] !bg-gray-300">
                    <div
                      className="!bg-white h-full transition-all duration-100"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
                <div className="absolute inset-0 !bg-gradient-to-t !from-black/80 !to-transparent" onClick={handleCloseModal} />
              </div>

              <motion.div
                className="absolute bottom-0 left-0 right-0 z-10"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                <div className="bg-gradient-to-t from-black/80 to-transparent p-6 pt-12">
                  <div className="">
                    <div className="w-full flex items-center justify-between h-[56px] !p-[6px] flex-shrink-0 rounded-[4px] !bg-white/15 !backdrop-blur-[10px] !backdrop-saturate-[200%]">
                      <div className="flex items-center gap-[10px]">
                        <img
                          className="!w-[45px] !object-cover !h-[45px] !rounded-[4px]"
                          src="https://assetsvilva.blr1.cdn.digitaloceanspaces.com/tamiltshirts/uploads/1oiwKoEOLK040mafRxYPgpCbB69ez0oOJ9ZudM0f.webp"
                          alt={sampleReels[currentIndex].title}
                        />
                        <div>
                          <p className="text-white text-[14px] font-medium leading-[100%]">{sampleReels[currentIndex].title}</p>
                          <div className="flex mt-[6px] items-center gap-[8px]">
                            <p className="text-white text-[14px] font-semibold leading-none font-[Montserrat]">
                              {sampleReels[currentIndex].price}
                            </p>
                            <p className="text-[#171717] text-[14px] font-medium line-through font-[Montserrat]">
                              {sampleReels[currentIndex].originalPrice}
                            </p>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleBuyNow()
                        }}
                        className="inline-flex h-[38px] !px-[16px] !py-[10px] justify-center items-center gap-[10px] flex-shrink-0 rounded-[2px] !bg-white !backdrop-blur-[10px] !backdrop-saturate-[200%] text-black text-[14px] font-semibold leading-[120%] font-[Montserrat] hover:bg-gray-100 transition-colors duration-200"
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}