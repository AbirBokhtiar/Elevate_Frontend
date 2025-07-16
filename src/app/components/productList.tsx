"use client";

import React, { useEffect, useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import { useCart } from '../cart/cart';

const ProductList = ({ limit }: { limit?: number }) => {
    const searchParams = useSearchParams();
    const { addToCart } = useCart();

    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const queryParams = new URLSearchParams();
                if (searchParams) { // Add a null check here
                    ["cat", "type", "min", "max", "orderby", "order"].forEach(key => {
                        const value = searchParams.get(key);
                        if (value) {
                            queryParams.append(key, value);
                        }
                    });
                }

                const res = await axios.get(`/api/products?${queryParams.toString()}`);
                setProducts(res.data);
            } catch (err) {
                console.error("Error fetching products:", err);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [searchParams]); // Add searchParams as a dependency

    if (loading) return <div>Loading...</div>;

    return (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {(limit ? products.slice(0, limit) : products).map((product: any) => (
                <div key={product.id} className="bg-white border border-gray-200 shadow-lg rounded-2xl overflow-hidden flex flex-col transition-transform hover:-translate-y-1 hover:shadow-xl duration-200">
                    <Link href={`/product/${product.slug}`} className="block group">
                        <div className="mt-4 mx-auto rounded-lg relative w-65 h-56 bg-gray-100">
                            <Image
                                src={product.images[0]?.src || "https://via.placeholder.com/400x400?text=No+Image"}
                                alt={product.name}
                                fill
                                sizes="20vw"
                                className="object-cover rounded-2xl transition-transform duration-200 group-hover:scale-105"
                            />
                        </div>
                    </Link>
                    <div className="flex flex-col flex-1 p-5">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg font-semibold text-gray-900 truncate">{product.name}</h3>
                            <button
                                onClick={() =>
                                    addToCart({
                                        id: product.id,
                                        name: product.name,
                                        price: product.price,
                                        image: product.images[0]?.src || "",
                                        quantity: 1,
                                        stock_status: product.stock_status,
                                        short_description:
                                            typeof product.short_description === "string"
                                                ? product.short_description.replace(/<[^>]+>/g, "")
                                                : "",
                                    })
                                }
                                className="flex items-center justify-center rounded-full bg-black text-white w-10 h-10 hover:bg-red-600 transition"
                                title="Add to Cart"
                            >
                                <span className="block text-xl font-bold">+</span>
                            </button>
                        </div>

                        <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                            {product.short_description?.replace(/<[^>]+>/g, '') || 'No description available.'}
                        </p>
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-xl font-bold text-black-500">${product.price}</span>
                            <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">{product.type}</span>
                        </div>
                        <div className="flex gap-3 mt-auto">
                            <Link
                                href={`/product/${product.slug}`}
                                className="flex-1 inline-block text-center rounded-lg border border-black-500 text-black-500 py-2 px-4 text-sm font-medium hover:bg-red-500 hover:text-white transition-colors"
                            >
                                View Details
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductList;
