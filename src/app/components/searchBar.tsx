"use client";

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { aiEnhancedSearch } from '@/services/mcpApi';
import { getAllProducts } from '@/services/wooService';
import OAuth from 'oauth-1.0a';
import crypto from 'crypto';


const consumerKey = process.env.NEXT_PUBLIC_WC_KEY as string;
const consumerSecret = process.env.NEXT_PUBLIC_WC_SECRET as string;
const BASE_URL = process.env.NEXT_PUBLIC_WC_URL;

const oauth = new OAuth({
  consumer: { key: consumerKey, secret: consumerSecret },
  signature_method: "HMAC-SHA1",
  hash_function(baseString, key) {
    return crypto.createHmac("sha1", key).update(baseString).digest("base64");
  },
});


const SearchBar = () => {
    const [loading, setLoading] = useState(false);
    const [productList, setProductList] = useState<any[]>([]);
    const router = useRouter();


    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productListUrl = `${BASE_URL}/products`;
                const productListRequest = { url: productListUrl, method: "GET" };
                const productHeaders = { ...oauth.toHeader(oauth.authorize(productListRequest)) };

                const productListRes = await axios.get(productListUrl, { headers: productHeaders });

                // Extract product names (or slugs, or both)
                const products = productListRes.data.map((p: any) => ({
                    name: p.name,
                    slug: p.slug,
                    category: p.categories?.[0]?.name || "", // or whatever fits your data
                }));
                setProductList(products);
            } catch (err) {
                setProductList([]);
            }
        };
        fetchProducts();
    }, []);

      

    const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const query = (formData.get("name") as string)?.trim();

        if (query) {
            setLoading(true);
            try {
                // Call your AI-enhanced search API
                const res = await aiEnhancedSearch(query, productList);

                if (res && typeof res === "object" && "type" in res && "slug" in res) {
                    if (res.type === "category") {
                        router.push(`/list?cat=${res.slug}`);
                    } else if (res.type === "product") {
                        router.push(`/product/${res.slug}`);
                    } else {
                        router.push(`/pages/list`);
                        // router.push(`/list?cat=${encodeURIComponent(query)}`);
                    }
                } else {
                    // Fallback: manual search by name includes query
                    const matchedProduct = productList.find(
                        (product) => product.name.toLowerCase().includes(query.toLowerCase())
                    );
                    if (matchedProduct) {
                        router.push(`/product/${matchedProduct.slug}`);
                    } else {
                        router.push(`/pages/list`);
                        // router.push(`/list?cat=${encodeURIComponent(query)}`);
                    }
                }
            } catch (err) {
                router.push(`/list?cat=${encodeURIComponent(query)}`);
            }
            setLoading(false);
        }
    };

    const [searchTerm, setSearchTerm] = useState("");

    // Filter products based on searchTerm
    const filteredProducts = searchTerm
        ? productList.filter((product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : [];

    return (
        <div className="w-full flex flex-col items-center relative">
            <form
            className="flex items-center justify-center gap-4 bg-gray-100 p-1 rounded-md w-full max-w-xl"
            onSubmit={handleSearch}
            style={{ position: "relative", zIndex: 20 }}
            >
            <input
                type="text"
                name="name"
                placeholder="Search for products..."
                className="flex-1 p-2 bg-transparent outline-none text-gray-700 placeholder-gray-500"
                disabled={loading}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoComplete="off"
            />
            <button className="cursor-pointer p-2" disabled={loading}>
                <Image src="/search.png" alt="" width={16} height={16} />
            </button>
            </form>
            {/* Suggestions dropdown under the search bar */}
            {searchTerm && filteredProducts.length > 0 && (
            <div className="absolute left-1/2 top-full mt-2 w-full max-w-xl -translate-x-1/2 z-10">
                <div className="bg-white rounded shadow p-2">
                <ul>
                    {filteredProducts.map((product) => (
                    <li
                        key={product.slug}
                        className="py-1 px-2 hover:bg-gray-100 rounded cursor-pointer"
                        onClick={() => {
                            setSearchTerm(""); // Clear input on selection
                            router.push(`/product/${product.slug}`);
                        }}
                    >
                        <span className="font-medium">{product.name}</span>
                        {product.category && (
                        <span className="ml-2 text-xs text-gray-500">({product.category})</span>
                        )}
                    </li>
                    ))}
                </ul>
                </div>
            </div>
            )}
        </div>
    );
};

export default SearchBar;