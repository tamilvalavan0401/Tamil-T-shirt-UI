"use client";

import { useEffect, useState } from "react";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { useRouter } from "next/navigation";

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

export default function Page() {
  const [posts, setPosts] = useState<Post[]>([]);
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

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Banner Section */}
        <div className="flex gap-2 md:flex-row flex-col">
          <div>
            <img
              src="https://assetsvilva.blr1.cdn.digitaloceanspaces.com/tamiltshirts/uploads/cgHkaxjBVzWWnQusr1yAi06rC9qs7zvK5sSW48Rx.webp"
              alt="Banner 1"
            />
          </div>
          <div className="md:w-auto w-full md:block flex">
            <img
              className="md:w-auto w-1/2"
              src="https://assetsvilva.blr1.cdn.digitaloceanspaces.com/tamiltshirts/uploads/oL3Yu6RLaHCkZp3Yjx6C48EOyOl2tCa3AVxSb9Xw.webp"
              alt="Banner 2"
            />
            <img
              className="md:w-auto w-1/2"
              src="https://assetsvilva.blr1.cdn.digitaloceanspaces.com/tamiltshirts/uploads/RM0HrAjfRjnMjEKNMjOCbTg5Wm7k9ya8YDBmRQJ9.webp"
              alt="Banner 3"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex justify-between mb-6 overflow-x-auto my-[20px]">
          <div className="flex space-x-4 rounded-[8px] border-2 border-border_bg p-[6px]">
            <button className="bg-blog_primary text-white px-4 py-2 rounded-[8px]">
              Latest
            </button>
            <button className="text-gray_text px-4 py-2 rounded">Featured</button>
            <button className="text-gray_text px-4 py-2 rounded">
              Entertainment
            </button>
            <button className="text-gray_text px-4 py-2 rounded">Fashion</button>
            <button className="text-gray_text px-4 py-2 rounded">General</button>
            <button className="text-gray_text px-4 py-2 rounded">Education</button>
          </div>
          <div className="flex space-x-4 rounded-[8px] border-2 border-border_bg p-[6px]">
            <button className="bg-blog_primary text-white px-4 py-2 rounded-[8px]">
              Tamil
            </button>
            <button className="text-gray_text px-4 py-2 rounded">English</button>
          </div>
        </div>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <div
              key={index}
              className="bg-white rounded-[8px] shadow-md mb-4 overflow-hidden group p-[16px] cursor-pointer"
              onClick={() => handleBlogClick(post.slug)}
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
                <h3 className="md:text-[18px] text-[16px] font-bold text-gray-900">
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
        </div>
      </div>
      <Footer />
    </>
  );
}