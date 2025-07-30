// app/products/[productName]/page.tsx
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Head from "next/head";
import ImageGallery from "@/components/ImageGallery";
import Image from "next/image"; // Explicitly import Image from next/image
import { ReactNode } from "react";
import CollapsibleSections from "@/components/CollapsibleSections";
import SizeChart from "@/components/SizeChart";
import { MdShoppingCart } from "react-icons/md";
import RelatedProducts from "@/components/RelatedProducts";
import Heart from "@/components/Heart";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import Share from "@/components/Share";
import ProdutinfomobileNav from "@/components/ProdutinfomobileNav";

interface Product {
  [x: string]: ReactNode;
  id: string;
  name: string;
  eng_name: string;
  category: string;
  subcategory: string | null;
  imageurl: string[];
  selling_price: string;
  mrp: string;
  discount: string;
  star_rating: number;
  description: string;
  color_options: string[];
  size_options: string[];
  seo_url: string;
  meta_tag_title?: string;
  meta_tag_desc?: string;
}

async function getProductData(): Promise<Product[]> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const assets = "https://assetsvilva.blr1.cdn.digitaloceanspaces.com/tamiltshirts/";
  const url = `${baseUrl}/products.json`;

  try {
    console.log("Attempting to fetch from:", url);
const res = await fetch(
      "https://assetsvilva.blr1.cdn.digitaloceanspaces.com/ecomsaas/redisapi/hq2Tam171123/products.json"
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch products data: ${res.statusText}`);
    }
    const rawData: any[] = await res.json();
    const products = rawData.map((item) => {
      console.log("Processing product with seo_url:", item.seo_url);
      return {
        id: item.id?.toString() || "0",
        name: item.name || "Unknown",
        eng_name: item.eng_name || item.name || "Unknown",
        category: item.category_name || "Unknown",
        subcategory: item.category_subcat ? item.category_name : null,
        imageurl: item.imageurl
          ? item.imageurl.split(",").map((url: string) => `${assets}${url.trim()}`)
          : [],
        selling_price: item.sp?.toString() || item.mrp?.toString() || "0",
        mrp: item.mrp?.toString() || "0",
        discount: item.mrp && item.sp ? `${Math.round(((item.mrp - item.sp) / item.mrp) * 100)}%` : "0%",
        star_rating: item.star_rating || 0,
        description: item.descp || item.shrtdesc || "",
        color_options: item.colorcodes_id ? item.colorcodes_id.toString().split(",").map((id: string) => id.trim()) : [],
        size_options: item.size_id ? item.size_id.split(",").map((id: string) => id.trim()) : [],
        seo_url: item.seo_url ? item.seo_url.trim() : "",
        meta_tag_title: item.meta_tag_title,
        meta_tag_desc: item.meta_tag_desc,
      };
    });
    console.log("Loaded products:", products.map((p) => p.seo_url));
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export default async function ProductDetailsPage(props: { params: Promise<{ productName: string }> }) {
  // Fix: await params before using
  const { productName } = await props.params;
  const decodedProductName = decodeURIComponent(productName).toLowerCase().trim();
  console.log("URL parameter (decoded):", decodedProductName);

  const allProducts: Product[] = await getProductData();
  console.log("Available seo_urls:", allProducts.map((p) => p.seo_url));

  if (!allProducts.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] p-4 text-center">
        <h1 className="text-3xl font-bold">Error Loading Products</h1>
        <p className="text-gray-600 mb-6">Unable to load product data. Please try again later.</p>
        <Link href="/">
          <Button>Go to Homepage</Button>
        </Link>
      </div>
    );
  }

  // Find exact match
  let product = allProducts.find((p) => p.seo_url.toLowerCase().trim() === decodedProductName);
  console.log("Matched product:", product ? product.seo_url : "None");

  // Fallback: Find similar URL if no exact match
  if (!product) {
    console.log("No exact match found, attempting to find similar seo_url...");
    const similarProduct = allProducts.find((p) =>
      p.seo_url.toLowerCase().trim().includes(decodedProductName.replace("ids", "kids"))
    );
    if (similarProduct) {
      console.log("Found similar product:", similarProduct.seo_url);
      product = similarProduct;
    }
  }

  if (!product) {
    // Log all seo_urls that are close matches for debugging
    const closeMatches = allProducts
      .filter((p) => p.seo_url.toLowerCase().includes(decodedProductName.slice(0, 5)))
      .map((p) => p.seo_url);
    console.log("Close matches for debugging:", closeMatches);

    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] p-4 text-center">
        <h1 className="text-3xl font-bold">Product Not Found</h1>
        <p className="text-gray-600 mb-6">
          The product "{decodedProductName}" could not be found.
          {closeMatches.length > 0 && (
            <>
              Did you mean one of these?
              <ul className="list-disc mt-2">
                {closeMatches.map((url) => (
                  <li key={url}>
                    <Link href={`/products/${encodeURIComponent(url)}`} className="text-blue-500 underline">
                      {url}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </p>
        <Link href="/">
          <Button>Go to Homepage</Button>
        </Link>
      </div>
    );
  }

  const starRating = product.star_rating ?? 0;
  const colorOptions = Array.isArray(product.color_options) ? product.color_options : [];
  const sizeOptions = Array.isArray(product.size_options) ? product.size_options : [];
  const sellingPrice = product.selling_price;
  const imageUrls = product.imageurl || [];

  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 5);

  return (
    <>
      <div className="hidden md:block !sticky !top-0 z-50">
        <Navbar />
      </div>
      <ProdutinfomobileNav />
      <Head>
        <title>{product.meta_tag_title || product.eng_name}</title>
        <meta name="description" content={product.meta_tag_desc || product.description} />
      </Head>
      <div className="max-w-7xl mx-auto px-4 py-8 md:px-6 lg:py-12">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Image - Left Side */}
          <div className="relative w-full h-fit rounded-lg overflow-hidden md:sticky md:top-[80px]">
            <ImageGallery imageUrls={imageUrls} alt={product.name} />
          </div>

          {/* Product Details - Right Side */}
          <div className="flex flex-col justify-center md:space-y-[16px] space-y-[10px] !relative">
            <div>
              <p className="text-[14px] text-[#737E93] font-medium">{product.category}</p>
              <div className="flex">
                <h1 className="text-[18px] text-black font-bold">{product.eng_name}</h1>
              </div>
            </div>

            <div className="flex justify-between">
              <div className="">
                <div className="space-x-[6px]">
                  <span className="text-[24px] font-bold text-black">₹{sellingPrice}</span>
                  <span className="text-[16px] text-[#737E93] line-through">₹{product.mrp}</span>
                  <span className="text-[16px] font-medium text-[#008C2D]">{product.discount}OFF</span>
                </div>
                <p className="text-[#737E93] text-[12px]">Inclusive of all taxes</p>
              </div>
              <div className="flex space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="yellow"
                  stroke="yellow"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-star-icon lucide-star"
                >
                  <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                </svg>
                <p className="text-[#676767] text-[16px]">{Number(product.star_rating).toFixed(1)}</p>
                <p className="text-[#494949] text-[16px] sm:block hidden">|</p>
                <p className="text-[#207BB4] text-[16px] sm:block hidden">Reviews</p>
              </div>
            </div>

            <div>
              <div
                className="flex items-center space-x-2 p-1 rounded-[8px]"
                style={{ backgroundImage: "linear-gradient(90deg, rgb(185, 228, 255) 0%, rgba(185, 228, 255, 0) 60%)" }}
              >
                <MdShoppingCart className="text-[#1C6C9E]" />
                <p className="text-[#1C6C9E] text-[14px]">378 people bought this in the last 7 days</p>
              </div>
            </div>

            <div>
              <div>
                <p className="text-[#737373] text-[11px] w-fit border border-[#969696] py-[4px] px-[8px]">100% COTTON</p>
              </div>
            </div>

            {colorOptions.length > 0 && (
              <div className="">
                <h3 className="text-[14px] text-[#121212] font-semibold mb-[6px]">COLOR OPTIONS</h3>
                <div className="flex gap-2">
                  {colorOptions.map((color) => (
                    <span
                      key={color}
                      className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center cursor-pointer hover:border-gray-500"
                      style={{ backgroundColor: color === "Black" ? "#000" : "#333" }}
                    >
                      {color === "Black" && <span className="text-white text-xs">●</span>}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <hr className="" />

            {sizeOptions.length > 0 && (
              <div className="mb-6 flex justify-between">
                <div>
                  <h3 className="text-[14px] text-[#121212] font-semibold mb-[6px]">SELECT SIZE</h3>
                  <div className="flex flex-wrap space-x-4">
                    {["XS", "S", "M", "L"].map((size) => (
                      <span
                        key={size}
                        className="h-[40px] w-[48px] border border-black flex justify-center items-center border-gray-3 rounded-[8px] text-[14px] text-center cursor-pointer hover:bg-gray-100"
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <SizeChart />
                </div>
              </div>
            )}

            <div className="flex space-x-[10px] !py-[20px] md:!relative !sticky md:!top-[0px] !bottom-[0px] bg-white">
              <div className="flex flex-col space-y-[10px] md:w-1/2 w-full">
                <div className="">
                  <Button
                    className="flex-1 py-[22px] w-full rounded-[8px] bg-[#457DFF] border-2 border-[#457DFF] text-white hover:bg-[#6996ff] hover:text-white text-[16px]"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-shopping-bag-icon lucide-shopping-bag"
                    >
                      <path d="M16 10a4 4 0 0 1-8 0" />
                      <path d="M3.103 6.034h17.794" />
                      <path d="M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z" />
                    </svg>
                    ADD TO BAG
                  </Button>
                </div>
              </div>

              <div className="">
                <div className="flex space-x-[10px]">
                  <div className="">
                    <Button className="flex-1 w-full py-[22px] px-0 rounded-[8px] border-2 border-[#909090]">
                      <Heart product={product} />
                    </Button>
                  </div>
                  <div className="">
                    <Button className="flex-1 w-full py-[22px] px-0 rounded-[8px] border-2 border-[#909090]">
                      <Share />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <CollapsibleSections product={product} />
          </div>
        </div>

        {/* Related Products */}
        <RelatedProducts allProducts={allProducts} currentCategory={product.category} currentProductId={product.id} />
      </div>

      <Footer />
    </>
  );
}