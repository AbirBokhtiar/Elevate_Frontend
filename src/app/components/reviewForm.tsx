'use client';

import { useState } from 'react';
import axios from 'axios';
import OAuth from 'oauth-1.0a';
import crypto from 'crypto';

const consumerKey = process.env.NEXT_PUBLIC_WC_KEY as string;
const consumerSecret = process.env.NEXT_PUBLIC_WC_SECRET as string;
const BASE_URL = process.env.NEXT_PUBLIC_WC_URL2;

const oauth = new OAuth({
  consumer: { key: consumerKey, secret: consumerSecret },
  signature_method: "HMAC-SHA1",
  hash_function(baseString, key) {
    return crypto.createHmac("sha1", key).update(baseString).digest("base64");
  },
});

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

    const url = `${BASE_URL}/products/${productId}/reviews`;
    const request_data = { url, method: 'POST' };
    const headers = {
      ...oauth.toHeader(oauth.authorize(request_data)),
      'Content-Type': 'application/json',
    };

    try {
      const res = await axios.post(
        url,
        {
          product_id: productId,
          review,
          name: name,
          email: email,
          rating,
        },
        { headers }
      );

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
