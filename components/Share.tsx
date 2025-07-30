"use client";

import React from "react";
import { Button } from "@/components/ui/button";

const Share: React.FC = () => {
  const handleShare = async () => {
    try {
      const title = document.title;
      const url = window.location.href;
      const metaImage =
        document.querySelector('meta[property="og:image"]')?.getAttribute("content") || "";

      if (navigator.share) {
        await navigator.share({
          title,
          text: "Check this out!",
          url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        alert("Link copied to clipboard!");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  return (
    <div>
      <Button
        onClick={handleShare}
        // className="flex-1 w-full py-[22px] rounded-[8px] border-2 border-[#909090]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-share2-icon lucide-share-2"
        >
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
          <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
        </svg>
      </Button>
    </div>
  );
};

export default Share;
