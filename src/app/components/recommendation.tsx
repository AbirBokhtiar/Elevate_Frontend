import React, { useState } from "react";
import { suggestSimilarProducts } from "@/services/mcpApi";
import Link from "next/link";

type ProductContext = {
  name: string;
  slug: string;
  category: string;
};


const SimilarProducts = ({
  productName,
  category,
  productList,
}: {
  productName: string;
  category: string;
  productList: ProductContext[];
}) => {
  const [suggestions, setSuggestions] = useState<ProductContext[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getSuggestions = async () => {
    setLoading(true);
    setError(null);
    try {
      // Pass the full product context array
      const res = await suggestSimilarProducts(productName, category, productList);
      setSuggestions(res.suggestions || []);
      if (!res.suggestions || res.suggestions.length === 0) {
        setError("No similar products found.");
      }
    } catch {
      setSuggestions([]);
      setError("Failed to get recommendations. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mt-6 max-w-md">
      <h2 className="text-lg font-semibold mb-4">Similar Products</h2>
      <button
        onClick={getSuggestions}
        disabled={loading}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        {loading ? "Loading..." : "Show Similar Products"}
      </button>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <ul className="space-y-2">
        {suggestions.map((s, i) => (
          <li key={i}>
            <Link
              href={`/product/${s.slug}`}
              className="text-blue-600 hover:underline"
            >
              {s.name} <span className="text-xs text-gray-500">({s.category})</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SimilarProducts;