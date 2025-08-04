import React from "react";

interface BlogViewCardProps {
  imageUrl: string;
  category: string;
  title: string;
  date: string;
  description: string;
}

const BlogViewCard: React.FC<BlogViewCardProps> = ({
  imageUrl,
  category,
  title,
  date,
  description,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
      <div className="relative">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-48 object-cover"
        />
        <span className="absolute top-2 left-2 bg-primary text-white text-xs font-semibold px-2 py-1 rounded">
          {category}
        </span>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        <p className="text-gray-600 text-sm mt-1">{description}</p>
        <p className="text-gray-500 text-xs mt-2">{date}</p>
      </div>
    </div>
  );
};

export default BlogViewCard;
