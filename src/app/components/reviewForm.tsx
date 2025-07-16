'use client';

import { useState } from 'react';
import axios from 'axios';
import OAuth from 'oauth-1.0a';
import crypto from 'crypto';

const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';

type Props = {
  productId: number;
};

const SubmitReviewForm: React.FC<Props> = ({ productId }) => {
  const [review, setReview] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${BACKEND_BASE_URL}/woocommerce/reviews/${productId}`, {
        review,
        name,
        email,
        rating,
      });


      if (res.status === 201) {
        setMessage("Review submitted successfully! Awaiting moderation.");
        setReview('');
        setName('');
        setEmail('');
        setRating(5);
      }
    } catch (err) {
      console.error("Review error:", err);
      setMessage("Failed to submit review.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-8">
      <h2 className="text-xl font-semibold">Write a Review</h2>
      <textarea
        className="w-full p-2 border rounded"
        placeholder="Your review..."
        value={review}
        onChange={(e) => setReview(e.target.value)}
        required
      />
      <input
        className="w-full p-2 border rounded"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        className="w-full p-2 border rounded"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <select
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        className="p-2 border rounded"
      >
        {[5, 4, 3, 2, 1].map((r) => (
          <option key={r} value={r}>
            {r} Star{r !== 1 ? 's' : ''}
          </option>
        ))}
      </select>
      <button type="submit" className="bg-black text-white ml-2 px-4 py-2 rounded">
        Submit Review
      </button>
      {message && <p className="mt-2 text-sm">{message}</p>}
    </form>
  );
};

export default SubmitReviewForm;
