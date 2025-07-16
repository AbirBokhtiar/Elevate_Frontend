'use client';

import { FC } from 'react';

type Review = {
  id: number;
  name: string;
  review: string;
  rating?: number;
  date_created: string;
};

type Props = {
  reviews: Review[];
};

const ProductReview: FC<Props> = ({ reviews }) => {
  if (!reviews?.length) {
    return <p className="text-gray-500">No reviews yet.</p>;
  }

  return (
    <div className="space-y-6">
      {reviews.map((r) => (
          <div key={r.id} className="p-4 border rounded-lg shadow bg-white">
          {/* // <div key={r.id} className="space-y-4"> */}
          {/* Header */}
          <div className="flex justify-between items-center mb-2">
            <p className="font-semibold">{r.name}</p>
            <p className="text-sm text-gray-400">
              {new Date(r.date_created).toLocaleDateString()}
            </p>
          </div>

          {/* Review Content Split by Line */}
          <div className="text-gray-700 text-sm leading-relaxed space-y-2">
            {r.review
              .split(/<br\s*\/?>|\n/g)
              .filter(Boolean)
              .map((line, index) => {
                const trimmed = line.trim();

                // Check if it's an <img> tag line
                if (/^<img.*?>$/i.test(trimmed)) {
                  const srcMatch = trimmed.match(/src=["'](.*?)["']/);
                  const altMatch = trimmed.match(/alt=["'](.*?)["']/);
                  return (
                    <img
                      key={index}
                      src={srcMatch?.[1]}
                      alt={altMatch?.[1] || "Review image"}
                      className="w-32 h-32 object-cover rounded-md"
                    />
                  );
                }

                // Else render as paragraph
                return (
                  <p key={index} dangerouslySetInnerHTML={{ __html: trimmed }} />
                );
              })}
          </div>

          {/* Optional: Rating */}
          {typeof r.rating === 'number' && r.rating > 0 && (
            <div className="text-yellow-500 mt-2">
              {'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}
            </div>
          )}

          {/* Optional: Show more logic (uncomment to use) */}
          {/*
          <button onClick={() => setShowMore(!showMore)} className="text-blue-500 text-sm mt-2">
            {showMore ? "Show less" : "Show more"}
          </button>
          */}
        </div>
      ))}
      <div className="h-[2px] bg-gray-100" />
    </div>
  );
};

export default ProductReview;
