import React, { useState, useEffect } from 'react';
import RatingBox from './RatingBox';

interface Product {
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

interface RatingBoxProps {
    product: Product;
    onSubmitRating?: (data: {
        rating: number;
        feedback: string;
        images: File[];
        timestamp: string;
    }) => void;
}

interface RatingData {
    rating: number;
    feedback: string;
    images: File[];
    timestamp: string;
}

export default function ViewAllComments({ product, onSubmitRating }: RatingBoxProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [images, setImages] = useState<File[]>([]);
    const [error, setError] = useState<string>("");
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState("");
    const [submittedRatings, setSubmittedRatings] = useState<RatingData[]>([]);

    // Handle scroll lock when overlay is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        // Cleanup on component unmount
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    const handleSubmitRating = (data: RatingData) => {
        setSubmittedRatings((prev) => [...prev, data]);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        let newImages: File[] = [...images];
        let errorMsg = "";

        files.forEach((file) => {
            if (!file.type.startsWith("image/")) {
                errorMsg = "Only image files are allowed.";
                return;
            }
            if (file.size > 40 * 1024 * 1024) {
                errorMsg = "File size must be less than 40MB.";
                return;
            }
            if (newImages.length < 10) {
                newImages.push(file);
            } else {
                errorMsg = "You can upload up to 10 images only.";
            }
        });

        if (errorMsg) {
            setError(errorMsg);
        } else {
            setError("");
            setImages(newImages);
        }
    };

    const handleRemove = (index: number) => {
        const updatedImages = images.filter((_, i) => i !== index);
        setImages(updatedImages);
    };

    const handleSubmit = () => {
        const data = {
            rating,
            feedback,
            images,
            timestamp: new Date().toLocaleString(),
        };

        if (onSubmitRating) {
            onSubmitRating(data);
        }
        handleSubmitRating(data);

        // Reset form data and close popup
        setRating(0);
        setFeedback("");
        setImages([]);
        setError("");
        togglePopup();
    };

    return (
        <div>
            <div className='w-full flex justify-center my-4'>
                <a
                    href="#"
                    className="text-primary text-[14px] font-bold border-b-2 border-primary text-center w-fit"
                    onClick={(e) => {
                        e.preventDefault();
                        togglePopup();
                    }}
                >
                    View All Comments
                </a>
            </div>

            {isOpen && (
                <div
                    className="fixed inset-0 top-0 bg-black/50 flex items-center justify-end z-50"
                    onClick={togglePopup}
                >
                    <div
                        className="bg-white md:!rounded-tl-[8px] !rounded-tl-[8px] !rounded-tr-[8px] md:!rounded-tb-[8px] max-w-[500px] w-full h-[90vh] overflow-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className='flex items-center justify-between sticky top-0 bg-white p-4'>

                            <h2 className="text-[16px] font-bold">{product.name}</h2>

                            <button
                                className="flex flex-end text-black hover:text-gray_text text-2xl"
                                onClick={togglePopup}
                            >
                                ×
                            </button>
                        
                        </div>

                        <div className="border-b border-border_bg p-6">
                            <div className="text-category_name">
                                <div className='flex gap-x-1'>
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
                                        className="lucide lucide-thumbs-up"
                                    >
                                        <path d="M7 10v12" />
                                        <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
                                    </svg>
                                    <p className='text-[11px]'>
                                        91% of verified buyers recommend this brand
                                    </p>
                                </div>

                                <div className="flex items-center my-[16px]">
                                    <div className="w-1/2 flex flex-col px-2 justify-center items-center">
                                        <div className="flex flex-col justify-center items-center space-y-[10px] bg-white shadow-md rounded-[8px] py-[20px] px-[30px] w-fit">
                                            <h1 className="text-7xl font-bold">4.3</h1>
                                            <p>188 ratings</p>
                                            <div className="flex gap-1">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <svg
                                                        key={star}
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="16"
                                                        height="16"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        className="lucide lucide-star"
                                                    >
                                                        <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                                                    </svg>
                                                ))}
                                            </div>
                                            <div>
                                                <button className="border border-[#d1d1d1] px-4 font-semibold py-2 text-[#207BB4]">
                                                    <RatingBox product={product} onSubmitRating={handleSubmitRating} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-1/2 px-[4px]">
                                        <div className="flex flex-col gap-y-[16px]">
                                            {[5, 4, 3, 2, 1].map((star) => (
                                                <div key={star} className="flex items-center justify-between gap-x-1">
                                                    <p className="text-[12px] w-[10px]">{star}</p>
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
                                                        className="lucide lucide-star"
                                                    >
                                                        <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                                                    </svg>
                                                    <div className="rang w-full h-[3px] rounded-full bg-[#d2d2d2]">
                                                        <div
                                                            className={`h-[3px] rounded-full bg-primary ${star === 5 || star === 2 ? 'w-[80%]' : 'w-0'}`}
                                                        ></div>
                                                    </div>
                                                    <p className="text-[12px]">0</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 space-y-6">
                                    {submittedRatings.map((ratingData, index) => (
                                        <div key={index} className="border-b-2 border-border_bg py-4">
                                            <div className="flex space-x-4">
                                                <div className="rounded-full">
                                                    <div className="w-[40px] h-[40px] bg-gray-500 rounded-full"></div>
                                                </div>
                                                <div className="space-y-2 w-full">
                                                    <div className="space-x-4 flex items-center">
                                                        <p className="text-black text-[14px] font-semibold">User Name</p>
                                                        <div className="bg-dash_menu_light px-2 py-1 space-x-1 rounded-[4px] flex items-center w-fit">
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
                                                                className="lucide lucide-map-pin text-primary"
                                                            >
                                                                <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                                                                <circle cx="12" cy="10" r="3" />
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
                                                                    className={`lucide lucide-star w-5 h-5 ${
                                                                        ratingData.rating >= star
                                                                            ? 'fill-yellow-400 stroke-yellow-400'
                                                                            : 'fill-none stroke-gray_text'
                                                                    }`}
                                                                >
                                                                    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
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
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}