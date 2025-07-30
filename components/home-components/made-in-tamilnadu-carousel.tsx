"use client"
import { motion, Variants } from 'framer-motion';


export function MadeInTamilNaduCarousel() {
    const textItems = Array(6).fill('MADE IN TAMILNADU');

  // Define parent variants with explicit type
  const scrollVariants: Variants = {
    initial: { x: 0 },
    animate: {
      x: -1000, // Adjust based on content width
      transition: {
        x: {
          repeat: Infinity,
          repeatType: 'loop',
          duration: 20,
          ease: 'linear',
        },
        delayChildren: 0.5,
        staggerChildren: 0.2,
      },
    },
  };

  // Define child variants with explicit type
  const textVariants: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <>
    <section className="!py-[40px]">
          <div className="!py-[11px] relative !gap-[12px] flex items-center justify-center border !bg-[#FFBE3C] !border-y-[2px] !border-y-[#F9B937]">
            <div className="w-full absolute top-0 !h-[60px] !rotate-[-2deg] md:!rotate-[-1deg] flex-shrink-0 !opacity-50 !bg-[#FFBB32]"></div>
            <div className="overflow-hidden w-full">

              <div className="overflow-hidden w-full">
                <motion.div
                  className="flex gap-[12px]"
                  variants={scrollVariants}
                  initial="initial"
                  animate="animate"
                  style={{ width: '200%' }} // Double width for seamless looping
                >
                  {[...textItems, ...textItems].map((text, index) => (
                    <motion.div
                      key={index}
                      className={`whitespace-nowrap z-30 relative ${index % 2 === 0
                          ? '!text-[#FFBE3C] !font-["Montserrat"] !text-[40px] !font-[700] !leading-[100%] !tracking-[4px] !uppercase ![text-shadow:_-1px_-1px_0_#000,_1px_-1px_0_#000,_-1px_1px_0_#000,_1px_1px_0_#000]'
                          : 'text-black !text-[27.003px] md:!text-[40px] font-bold leading-[100%] uppercase font-[Montserrat]'
                        }`}
                        role="presentation"
                      variants={textVariants}
                    >
                      {text}
                    </motion.div>
                  ))}
                </motion.div>
              </div>
              
            </div>
          </div>
        </section>
    </>
  )
}
