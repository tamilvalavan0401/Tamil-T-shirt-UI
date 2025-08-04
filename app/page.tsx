"use client";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/navbar";
import MainHomePage from "@/components/MainHomePage";
import { Footer } from "@/components/footer";

// Define the Product interface
interface Product {
  id: number;
  name: string;
  eng_name: string;
  descp: string;
  sp: number;
  mrp: number;
  imageurl: string;
  seo_url: string;
  category_name: string;
  created_at: string;
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        // const response = await fetch("/products.json");
        const response = await fetch(
      "https://assetsvilva.blr1.cdn.digitaloceanspaces.com/ecomsaas/redisapi/hq2Tam171123/products.json"
    );
        const data = await response.json();

        if (Array.isArray(data)) {
          setProducts(data);
          localStorage.setItem("products", JSON.stringify(data));
        } else {
          console.error("products.json is not an array");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchProducts();
  }, []);

  // Categorize products
  const styleComboProducts = products.filter(product => 
    product.category_name === "Printed Couple T-Shirts"
  );
  const coupleTeesProducts = products.filter(product => 
    product.category_name === "Round Neck Half Sleeve Tshirts" && 
    product.name.includes("காதல")
  );
  const newArrivalsProducts = products
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 8);

  return (
    <div className="flex flex-col">
      <Navbar />
      <MainHomePage 
        styleComboProducts={styleComboProducts}
        coupleTeesProducts={coupleTeesProducts}
        newArrivalsProducts={newArrivalsProducts}
      />
      <Footer/>
    </div>
  );
}