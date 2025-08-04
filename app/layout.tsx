import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// import LoadingWrapper from "@/components/Loadi ngWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tamil T-Shirts - Home",
  description: "Your one-stop shop for unique Tamil T-Shirts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <LoadingWrapper> */}
          {children}
          {/* </LoadingWrapper> */}
      </body>
    </html>
  );
}
