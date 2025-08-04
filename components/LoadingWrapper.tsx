"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function LoadingWrapper({ children }: { children: React.ReactNode }) {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 300); // 1 second delay

    return () => clearTimeout(timer);
  }, []);

  if (!showContent) {
    return (
      <div className="flex my-[100px] justify-center min-h-screen bg-white">
  <div className="animate-pulse text-xl font-bold">
    <Image
      alt="Loading Logo"
      src="https://assetsvilva.blr1.cdn.digitaloceanspaces.com/tamiltshirts/uploads/pxRQdPAEVq1yxEVqlUt4jy8BYE2OL41fccnkSsNn.webp"
      width={150}   // adjust width as needed
      height={150}  // adjust height as needed
    />
  </div>
</div>
    );
  }

  return <>{children}</>;
}
