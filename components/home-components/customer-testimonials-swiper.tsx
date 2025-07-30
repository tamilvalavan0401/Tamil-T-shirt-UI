"use client"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Autoplay } from "swiper/modules"
import { Card, CardContent } from "@/components/ui/card"

// Dummy data for testimonials
const testimonials = [
  {
    id: 1,
    quote:
      "The quality of these T-shirts is amazing! So comfortable and the designs are truly unique. Highly recommend!",
    author: "Priya S.",
    location: "Chennai",
  },
  {
    id: 2,
    quote:
      "Finally, a brand that celebrates Tamil culture with such style. I love my new tee, it's a conversation starter!",
    author: "Arjun V.",
    location: "Coimbatore",
  },
  {
    id: 3,
    quote:
      "Fast shipping and excellent customer service. The T-shirt fits perfectly and the print is vibrant. Will definitely buy again.",
    author: "Meena K.",
    location: "Madurai",
  },
  {
    id: 4,
    quote:
      "I bought a couple tee for me and my partner, and we both adore it! The fabric is soft and the design is adorable.",
    author: "Suresh R.",
    location: "Bengaluru",
  },
]

export function CustomerTestimonialsSwiper() {
  return (
    <section className="container mx-auto px-4 md:px-6 py-8">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">What Our Customers Say</h2>
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          el: ".testimonials-pagination",
        }}
        breakpoints={{
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
        className="pb-10"
      >
        {testimonials.map((testimonial) => (
          <SwiperSlide key={testimonial.id}>
            <Card className="h-full flex flex-col justify-between shadow-lg">
              <CardContent className="p-6 text-center flex-1">
                <p className="text-lg italic text-gray_text mb-4">"{testimonial.quote}"</p>
                <p className="font-semibold text-gray_text">{testimonial.author}</p>
                <p className="text-sm text-gray_text">{testimonial.location}</p>
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
        {/* Custom Pagination Dots */}
        <div className="testimonials-pagination absolute bottom-0 left-0 right-0 flex justify-center space-x-2 z-10" />
      </Swiper>
    </section>
  )
}
