// components/CollapsibleSections.tsx
'use client';

import { useState, ReactNode } from 'react';
import RatingBox from './RatingBox';
import ViewAllComments from './ViewAllComments';

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

interface RatingData {
  rating: number;
  feedback: string;
  images: File[];
  timestamp: string; // store time as a string
}

export default function CollapsibleSections({ product }: { product: Product }) {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const [submittedRatings, setSubmittedRatings] = useState<RatingData[]>([]);

  const handleSubmitRating = (data: RatingData) => {
    setSubmittedRatings((prev) => [...prev, data]);
  };

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="">
      {/* Product Description Section */}
      <div className="border-b border-[#cacaca]">
        <button
          className="flex justify-between items-center p-[20px] w-full text-left"
          onClick={() => toggleSection('description')}
        >
          <div className="flex items-center gap-2">
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
              className="lucide lucide-clipboard-list-icon lucide-clipboard-list"
            >
              <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
              <path d="M12 11h4" />
              <path d="M12 16h4" />
              <path d="M8 11h.01" />
              <path d="M8 16h.01" />
            </svg>
            <div>
            <p className="text-[14px]">Product Description</p>
            <p className="text-[10px] text-[#878787]">Manufacture, Care and Fit</p>

            </div>
          </div>
          <div>
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
              className={`lucide lucide-plus-icon lucide-plus transition-transform ${
                openSection === 'description' ? 'rotate-45' : ''
              }`}
            >
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
          </div>
        </button>
        {openSection === 'description' && (
          <div className="p-[20px]">
            <div className="text-[14px] text-gray_text" dangerouslySetInnerHTML={{ __html: product.description }} />
          </div>
        )}
      </div>

      {/* Shipping & Returns Section */}
      <div className="border-b border-[#cacaca]">
        <button
          className="flex justify-between items-center p-[20px] w-full text-left"
          onClick={() => toggleSection('shipping')}
        >
          <div className="flex items-center gap-2">
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
              className="lucide lucide-package-check-icon lucide-package-check"
            >
              <path d="m16 16 2 2 4-4" />
              <path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14" />
              <path d="m7.5 4.27 9 5.15" />
              <polyline points="3.29 7 12 12 20.71 7" />
              <line x1="12" x2="12" y1="22" y2="12" />
            </svg>
            <div>
              <p className="text-[14px]">Shipping & Returns</p>
              <p className="text-[10px] text-[#878787]">Know about return & exchange policy</p>
            </div>
          </div>
          <div>
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
              className={`lucide lucide-plus-icon lucide-plus transition-transform ${
                openSection === 'shipping' ? 'rotate-45' : ''
              }`}
            >
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
          </div>
        </button>
        {openSection === 'shipping' && (
          <div className="p-[20px] text-gray_text">
            Welcome! This is the shipping and returns information. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </div>
        )}
      </div>

      {/* Customer Reviews Section */}
      <div className="border-b border-[#cacaca]">
        <button
          className="flex justify-between items-center p-[20px] w-full text-left"
          onClick={() => toggleSection('reviews')}
        >
          <div className="flex items-center gap-2">
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
              className="lucide lucide-star-icon lucide-star"
            >
              <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
            </svg>
            <p className="text-[14px]">Customer Reviews</p>
          </div>
          <div>
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
              className={`lucide lucide-plus-icon lucide-plus transition-transform ${
                openSection === 'reviews' ? 'rotate-45' : ''
              }`}
            >
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
          </div>
        </button>
        {openSection === 'reviews' && (
          <div className=" text-category_name">
            <div className='flex gap-x-1'>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-thumbs-up-icon lucide-thumbs-up"><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"/></svg>
                <p className='text-[11px] '>
                    91% of verified buyers recommend this brand
                </p>
            </div>

            <div className="">
      <div className="flex items-center my-[16px]">
        <div className="w-1/2 flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center space-y-[10px] bg-white shadow-md rounded-[8px] py-[20px] px-[30px] w-fit">
            <h1 className="text-7xl font-bold">4.3</h1>
            <p>188 ratings</p>
            <div className="flex gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-star-icon lucide-star"
              >
                <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-star-icon lucide-star"
              >
                <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-star-icon lucide-star"
              >
                <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-star-icon lucide-star"
              >
                <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-star-icon lucide-star"
              >
                <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
              </svg>
            </div>
            <div>
              <button className="border border-[#d1d1d1] px-4 font-semibold py-2 text-[#207BB4]">
                <RatingBox product={product} onSubmitRating={handleSubmitRating} />
                {/* <RatingSection product={product} /> */}
              </button>
            </div>
          </div>
        </div>
        <div className="w-1/2 px-[4px]">
          <div className="flex flex-col gap-y-[16px]">
            <div className="flex items-center justify-between gap-x-1">
              <p className="text-[12px] w-[10px]">5</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="black"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-star-icon lucide-star"
              >
                <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
              </svg>
              <div className="rang w-full h-[3px] rounded-full bg-[#d2d2d2]">
                <div className="w-[80%] h-[3px] rounded-full bg-primary"></div>
              </div>
              <p className="text-[12px]">0</p>
            </div>
            <div className="flex items-center justify-between gap-x-1">
              <p className="text-[12px] w-[10px]">4</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="black"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-star-icon lucide-star"
              >
                <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
              </svg>
              <div className="rang w-full h-[3px] rounded-full bg-[#d2d2d2]">
                {/* <div className='w-[80%] h-[3px] rounded-full bg-primary-500'></div> */}
              </div>
              <p className="text-[12px]">0</p>
            </div>
            <div className="flex items-center justify-between gap-x-1">
              <p className="text-[12px] w-[10px]">3</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="black"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-star-icon lucide-star"
              >
                <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
              </svg>
              <div className="rang w-full h-[3px] rounded-full bg-[#d2d2d2]">
                {/* <div className='w-[80%] h-[3px] rounded-full bg-primary-500'></div> */}
              </div>
              <p className="text-[12px]">0</p>
            </div>
            <div className="flex items-center justify-between gap-x-1">
              <p className="text-[12px] w-[10px]">2</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="black"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-star-icon lucide-star"
              >
                <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
              </svg>
              <div className="rang w-full h-[3px] rounded-full bg-[#d2d2d2]">
                <div className="w-[80%] h-[3px] rounded-full bg-primary"></div>
              </div>
              <p className="text-[12px]">0</p>
            </div>
            <div className="flex items-center justify-between gap-x-1">
              <p className="text-[12px] w-[10px]">1</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="black"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-star-icon lucide-star"
              >
                <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
              </svg>
              <div className="rang w-full h-[3px] rounded-full bg-[#d2d2d2]">
                {/* <div className='w-[80%] h-[3px] rounded-full bg-primary-500'></div> */}
              </div>
              <p className="text-[12px]">0</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        {submittedRatings.length > 0 && (
  <div className="mt-4 space-y-4">
    {submittedRatings.slice(0, 2).map((ratingData, index) => (
      <div
        key={index}
        className={`py-4 ${submittedRatings.length > 1 && index !== submittedRatings.slice(0, 2).length - 1 ? 'border-b-2 border-border_bg' : ''}`}
      >
        <div className="flex space-x-4">
          <div className="rounded-full">
            <div className="w-[40px] h-[40px] bg-gray-500 rounded-full"></div>
          </div>
          <div className="space-y-2 w-full">
            <div className="space-x-4 flex items-center">
              <p className="text-black text-[14px] font-semibold">User Name</p>
              <div className="bg-dash_menu_light px-2 py-1 space-x-1 rounded-[4px] flex items-center w-fit">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin text-primary">
                  <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <p className="text-primary text-[14px] font-medium">Chennai</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`lucide lucide-star-icon lucide-star w-5 h-5 ${ratingData.rating >= star ? 'fill-yellow-400 stroke-yellow-400' : 'fill-none stroke-gray_text'}`}
                  >
                    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>
                  </svg>
                ))}
              </div>
            </div>
            <p>Feedback: {ratingData.feedback}</p>
            <div className="flex gap-2 mt-2">
              {ratingData.images.map((file: File, idx: number) => (
                <img
                  key={idx}
                  src={URL.createObjectURL(file)}
                  alt={`submitted-${index}-${idx}`}
                  className="w-16 h-16 object-cover rounded"
                />
              ))}
            </div>
            <p className="text-xs text-gray_text">{ratingData.timestamp}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
)}

{submittedRatings.length > 2 && (
  <ViewAllComments product={product} onSubmitRating={handleSubmitRating} />
)} 

      </div>
    </div>
          </div>
        )}
      </div>

      

      

    </div>
  );
}