"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import OAuth from "oauth-1.0a";
import crypto from "crypto";
import axios from "axios";

const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';

const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
  e.currentTarget.scrollLeft += e.deltaY;
  e.preventDefault();
};

const CategoryList = () => {
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${BACKEND_BASE_URL}/woocommerce/categories`);

        const childCategories = res.data.filter(
          (cat: any) =>
            cat.parent > 0 &&
            cat.slug.toLowerCase() !== "uncategorized" &&
            cat.count >= 0
        );

        setCategories(childCategories);
      } catch (err) {
        console.error("Failed to fetch categories", err);
        setCategories([]);
      }
    };

    fetchCategories();
  }, []);


  return (
    <div className="px-4 overflow-x-scroll scroll-smooth" onWheel={handleWheel}>
      <div className="flex gap-4 md:gap-8">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/pages/list?cat=${cat.slug}`}
            className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 xl:w-1/6"
          >
            <div className="relative bg-slate-100 w-full h-96">
              <Image
                src={
                  cat.image?.src ||
                  "https://via.placeholder.com/400x400?text=No+Image"
                }
                alt={cat.name}
                fill
                sizes="20vw"
                className="object-cover"
              />
            </div>
            <h1 className="mt-8 font-light text-xl tracking-wide text-center">
              {cat.name}
            </h1>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
