import React, { useEffect, useState } from 'react';

interface Product {
  [x: string]: React.ReactNode;
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
    timestamp: string; // add timestamp
  }) => void;
}

export default function RatingBox({ product, onSubmitRating }: RatingBoxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [error, setError] = useState<string>("");
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [ratingData, setRatingData] = useState<any | null>(null);

  const togglePopup = () => {
    setIsOpen(!isOpen);
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


//   useEffect(() => {
//           if (isOpen) {
//               document.body.style.overflow = 'hidden';
//           } else {
//               document.body.style.overflow = '';
//           }
//           // Cleanup on component unmount
//           return () => {
//               document.body.style.overflow = '';
//           };
//       }, [isOpen]);


  const handleRemove = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

  const handleSubmit = () => {
  // Reset any old errors
  setError("");

  // 1. Check if a star rating was selected
  if (rating === 0) {
    setError("Please give me a star rating.");
    return;
  }

  // 2. Check if feedback has at least 10 words
  const wordCount = feedback.trim().split(/\s+/).filter(Boolean).length;
  if (feedback.trim().length < 10) {
  setError("Please provide at least 10 characters in your feedback.");
  return;
}

  const data = {
    rating,
    feedback,
    images,
    timestamp: new Date().toLocaleString(),
  };
  setRatingData(data);

  if (onSubmitRating) {
    onSubmitRating(data);
  }

  // Reset form data and close popup
  setRating(0);
  setFeedback("");
  setImages([]);
  setError("");
  setRatingData(null);
  togglePopup();
};

  return (
    <div>
      <a
        href="#"
        className="text-rating_text text-[12px] font-bold"
        onClick={(e) => {
          e.preventDefault();
          togglePopup();
        }}
      >
        RATE
      </a>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={togglePopup}
        >
          <div
            className="bg-white rounded-[8px] p-6 max-w-[500px] mx-[16px] w-full max-h-[90vh] overflow-auto relative md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-gray_text hover:text-gray_text text-2xl"
              onClick={togglePopup}
            >
              ×
            </button>

            <div className="space-y-5">
              <div className="flex gap-2">
                <div>
                  {product.imageurl?.length > 0 && (
                    <img
                      src={product.imageurl[0] as string}
                      alt={product.name as string}
                      className="w-[70px] rounded-[4px] image-cover"
                    />
                  )}
                </div>

                <div>
                  <h2 className="text-[16px] text-start font-bold">{product.name}</h2>
                  <p className="text-gray_text text-start text-[12px] font-semibold">{product.eng_name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg xmlns="http://www.w3.org/2000/svg" key={star} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        className={`w-5 h-5 cursor-pointer transition-all duration-300 lucide lucide-star-icon lucide-star ${
                            rating >= star
                              ? 'fill-yellow-400 stroke-yellow-400'
                              : 'fill-none stroke-gray_text'
                          }`}
                          onMouseEnter={() => setRating(star)}
                        ><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/></svg>

                      ))}
                    </div>
                    {rating > 0 && (
                      <span className="text-sm text-gray-600 font-medium">{rating} / 5</span>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <textarea
                  className="w-full h-[140px] text-gray_text shadow-inner rounded-[8px] p-2 border focus:outline-none"
                  placeholder="Enter your text here..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                />
              </div>

              {images.length > 0 && (
                <div
                  className="flex gap-4 mt-4 w-full overflow-x-auto scrollbar-hide"
                  style={{ scrollbarWidth: "none" }}
                >
                  {images.map((img, index) => (
                    <div
                      key={index}
                      className="relative flex-shrink-0"
                      style={{
                        width: 'calc(100% / 3 - 0.5rem)',
                      }}
                    >
                      <div className="relative">
                        <img
                          src={URL.createObjectURL(img)}
                          alt={`Uploaded-${index}`}
                          className="w-full h-24 image-cover rounded-md border"
                        />

                        <button
                          onClick={() => handleRemove(index)}
                          className="absolute top-0 right-0 bg-gray_text text-white rounded-full p-[2px] transition"
                        >
                          ×
                        </button>

                        <p className="text-xs text-gray-700 mt-1 text-center truncate">
                          {img.name}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex flex-col items-center">
                <label className="w-full border-2 border-dashed border-rating_light p-4 rounded-md cursor-pointer hover:bg-gray-50 text-center">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <p className="text-gray-600 text-sm">Attach your files here (max 10)</p>
                </label>

                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                <div className="w-full mt-4">
                  <button
                    className="text-white bg-rating_text w-full py-2 rounded-[4px] hover:rating_light"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}