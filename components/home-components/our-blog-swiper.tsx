
"use client";

import { useEffect, useState } from "react";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

// Interface for Blog (matching your JSON structure)
interface Blog {
  id: number;
  storeid: number;
  sort_order: number;
  category_id: number | null;
  status: number;
  title: string;
  short_content: string;
  content: string;
  slug: string;
  meta_title: string;
  tags: string;
  published_by: string;
  updatedby: string | null;
  meta_description: string;
  meta_keywords: string;
  image: string;
  video: string | null;
  published_at: string;
  created_at: string;
  updated_at: string;
  migrated: string | null;
}

// Interface for Post (for blog card display)
interface Post {
  imageUrl: string;
  category: string;
  title: string;
  date: string;
  description: string;
  slug: string;
}

export default function OurBlogSwiper() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [swiper, setSwiper] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetch(
      "https://assetsvilva.blr1.cdn.digitaloceanspaces.com/ecomsaas/redisapi/hq2Tam171123/blogs.json"
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch blogs");
        }
        return res.json();
      })
      .then((data: Blog[]) => {
        const formattedPosts: Post[] = data.map((blog) => ({
          imageUrl:
            blog.content.match(/<img[^>]*src="([^"]*)"[^>]*>/)?.[1] ||
            "/images/fallback.jpg",
          category: "General",
          title: blog.title,
          date: blog.created_at || "Unknown date",
          description: blog.short_content.replace(/<\/?[^>]+(>|$)/g, ""),
          slug: blog.slug,
        }));
        setPosts(formattedPosts);
      })
      .catch((error) => console.error("Failed to fetch blogs:", error));
  }, []);

  // Handle blog card click to navigate to /blog/slug=[slug]
  const handleBlogClick = (slug: string) => {
    router.push(`/blog/${encodeURIComponent(slug)}`);
  };

  // Navigate to previous slide
  const goPrev = () => {
    if (swiper) swiper.slidePrev();
  };

  // Navigate to next slide
  const goNext = () => {
    if (swiper) swiper.slideNext();
  };

  return (
    <>
    <div>
      <h2 className="text-[20px] md:text-[24px] font-bold mb-6 text-center">Our Blog</h2>
    </div>
      <div className="max-w-7xl mx-auto px-4 py-8 relative">
        {/* Swiper Carousel */}
        <Swiper
          modules={[Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 16,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 24,
            },
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          onSwiper={setSwiper}
          className="mySwiper"
        >
          {posts.map((post, index) => (
            <SwiperSlide key={index}>
              <div
                className=" overflow-hidden group  cursor-pointer"
                onClick={() => handleBlogClick(post.slug)}
              >
                <div className="relative overflow-hidden rounded-[8px]">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full rounded-[8px] h-48 object-cover transform transition-transform duration-300 group-hover:scale-110"
                  />
                  {/* <span className="absolute top-2 left-2 bg-blog_primary text-white text-xs font-semibold px-2 py-1 rounded">
                    {post.category}
                  </span> */}
                </div>
                <div className="truncate my-2">
                  <h3 className="md:text-[14px] text-[12px] font-bold text-black truncate">
                    {post.title}
                  </h3>
                  <p className="text-gray_text md:text-[12px] text-[10px] mt-1 truncate">
                    {post.description.split(" ").slice(0, 10).join(" ") +
                      (post.description.split(" ").length > 10 ? "..." : "")}
                  </p>
                  <p className="text-blog_primary text-[12px] font-medium mt-2 ">
                    {post.date}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <button
          onClick={goPrev}
          className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-blog_primary text-white p-2 rounded-full z-10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={goNext}
          className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-blog_primary text-white p-2 rounded-full z-10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </>
  );
}