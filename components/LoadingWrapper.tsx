"use client";

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
      <div className="flex items-center justify-center min-h-screen bg-white">
        {/* Replace with your actual loader animation/logo */}
        <div className="animate-pulse text-xl font-bold">Loading...</div>
      </div>
    );
  }

  return <>{children}</>;
}
