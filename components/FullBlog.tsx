"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

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

export default function FullBlog() {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams<{ slug: string }>();
  const slug = params?.slug;

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
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
        <p className="text-gray-600 text-sm mb-4">
          Published on: {blog.created_at}
        </p>
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>
      <Footer />
    </>
  );
}