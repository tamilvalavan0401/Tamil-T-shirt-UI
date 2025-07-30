
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

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

interface Post {
  imageUrl: string;
  category: string;
  title: string;
  date: string;
  description: string;
  slug: string;
}

export default function FullBlog() {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);
  const [displayedPosts, setDisplayedPosts] = useState<Post[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams<{ slug: string }>();
  const slug = params?.slug;
  const router = useRouter();

  useEffect(() => {
    if (!slug) {
      setError("No blog slug provided");
      setLoading(false);
      return;
    }

    fetch(
      "https://assetsvilva.blr1.cdn.digitaloceanspaces.com/ecomsaas/redisapi/hq2Tam171123/blogs.json"
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch blog data");
        }
        return res.json();
      })
      .then((data: Blog[]) => {
        const selectedBlog = data.find((b) => b.slug === slug);
        if (selectedBlog) {
          setBlog(selectedBlog);

          let related = data
            .filter((b) => b.slug !== slug && b.category_id === selectedBlog.category_id)
            .map((blog) => ({
              imageUrl:
                blog.content.match(/<img[^>]*src="([^"]*)"[^>]*>/)?.[1] ||
                "/images/fallback.jpg",
              category: "General",
              title: blog.title,
              date: blog.created_at || "Unknown date",
              description: blog.short_content.replace(/<\/?[^>]+(>|$)/g, ""),
              slug: blog.slug,
            }));

          if (related.length === 0) {
            related = data
              .filter((b) => b.slug !== slug)
              .map((blog) => ({
                imageUrl:
                  blog.content.match(/<img[^>]*src="([^"]*)"[^>]*>/)?.[1] ||
                  "/images/fallback.jpg",
                category: "General",
                title: blog.title,
                date: blog.created_at || "Unknown date",
                description: blog.short_content.replace(/<\/?[^>]+(>|$)/g, ""),
                slug: blog.slug,
              }));
          }

          const shuffled = related.sort(() => Math.random() - 0.5);
          setRelatedPosts(shuffled);
          setDisplayedPosts(shuffled.slice(0, 3));
        } else {
          setError("Blog not found");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load blog");
        setLoading(false);
        console.error(err);
      });
  }, [slug]);

  const handleShowMore = () => {
    const nextIndex = currentIndex + 3;
    const nextPosts = relatedPosts.slice(nextIndex, nextIndex + 3);
    setDisplayedPosts(nextPosts);
    setCurrentIndex(nextIndex);
  };

  const handleShowLess = () => {
    const prevIndex = Math.max(0, currentIndex - 3);
    const prevPosts = relatedPosts.slice(prevIndex, prevIndex + 3);
    setDisplayedPosts(prevPosts);
    setCurrentIndex(prevIndex);
  };

  const handleRelatedPostClick = (slug: string) => {
    router.push(`/blog/${encodeURIComponent(slug)}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>{error || "Blog not found"}</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-8/12">
            <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
            <p className="text-gray-600 text-sm mb-4">
              Published on: {blog.created_at}
            </p>
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </div>
          <div className="w-full lg:w-4/12 ">
            <div className="sticky top-[70px]">
                <h2 className="text-xl font-bold mb-4">Related Posts</h2>
                {/* Medium screens: Swiper.js */}
                <div className="block md:block lg:hidden">
  {relatedPosts.length > 0 ? (
    <>
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={16}
        slidesPerView={1}
        breakpoints={{
          500: {
            slidesPerView: 2,
            spaceBetween: 16,
          },
        }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        pagination={{ clickable: true }}
        className="mySwiper"
      >
        {relatedPosts.map((post, index) => (
          <SwiperSlide key={index}>
            <div
              className="bg-white rounded-[8px] shadow-md overflow-hidden group p-[16px] cursor-pointer"
              onClick={() => handleRelatedPostClick(post.slug)}
            >
              <div className="relative overflow-hidden rounded-[8px]">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full rounded-[8px] h-44 object-cover transform transition-transform duration-300 group-hover:scale-110"
                />
                <span className="absolute top-2 left-2 bg-blog_primary text-white text-xs font-semibold px-2 py-1 rounded">
                  {post.category}
                </span>
              </div>
              <div>
                <h3 className="md:text-[18px] text-[16px] font-bold text-gray-900 mt-4">
                  {post.title}
                </h3>
                <p className="text-gray_text md:text-[14px] text-[12px] mt-1">
                  {post.description.split(" ").slice(0, 20).join(" ") +
                    (post.description.split(" ").length > 20 ? "..." : "")}
                </p>
                <p className="text-blog_primary text-[12px] font-medium mt-2">
                  {post.date}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <style jsx>{`
        .swiper-pagination-bullet {
          background-color: #4a5568; /* gray-600, for inactive bullets */
          opacity: 0.5;
        }
        .swiper-pagination-bullet-active {
          background-color: #EE4E89; /* Active bullet color */
          opacity: 1;
        }
      `}</style>
    </>
  ) : (
    <p className="text-gray-600">No related posts available.</p>
  )}
</div>
                {/* Large screens: Scrollable related posts */}
                <div className="hidden lg:block">
                <div className="max-h-[80vh] overflow-y-auto pr-4">
                    {displayedPosts.length > 0 ? (
                    <div className="flex flex-col gap-6">
                        {displayedPosts.map((post, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-[8px] shadow-md overflow-hidden group p-[16px] cursor-pointer"
                            onClick={() => handleRelatedPostClick(post.slug)}
                        >
                            <div className="relative overflow-hidden rounded-[8px]">
                            <img
                                src={post.imageUrl}
                                alt={post.title}
                                className="w-full rounded-[8px] h-48 object-cover transform transition-transform duration-300 group-hover:scale-110"
                            />
                            <span className="absolute top-2 left-2 bg-blog_primary text-white text-xs font-semibold px-2 py-1 rounded">
                                {post.category}
                            </span>
                            </div>
                            <div>
                            <h3 className="md:text-[18px] text-[16px] font-bold text-gray-900 mt-4">
                                {post.title}
                            </h3>
                            <p className="text-gray_text md:text-[14px] text-[12px] mt-1">
                                {post.description.split(" ").slice(0, 20).join(" ") +
                                (post.description.split(" ").length > 20 ? "..." : "")}
                            </p>
                            <p className="text-blog_primary text-[12px] font-medium mt-2">
                                {post.date}
                            </p>
                            </div>
                        </div>
                        ))}
                        {/* <div className="flex justify-between mt-4">
                        {currentIndex > 0 && (
                            <button
                            onClick={handleShowLess}
                            className="bg-blog_primary text-white px-4 py-2 rounded-[8px] hover:bg-opacity-80"
                            >
                            Show Less
                            </button>
                        )}
                        {currentIndex + 3 < relatedPosts.length && (
                            <button
                            onClick={handleShowMore}
                            className="bg-blog_primary text-white px-4 py-2 rounded-[8px] hover:bg-opacity-80"
                            >
                            Show More
                            </button>
                        )}
                        </div> */}
                    </div>
                    ) : (
                    <p className="text-gray-600">No related posts available.</p>
                    )}
                </div>
                </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}