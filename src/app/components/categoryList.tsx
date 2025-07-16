"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import OAuth from "oauth-1.0a";
import crypto from "crypto";
import axios from "axios";

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

const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
  e.currentTarget.scrollLeft += e.deltaY;
  e.preventDefault();
};

const CategoryList = () => {
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const url = `${BASE_URL}/products/categories`;
      const request_data = { url, method: "GET" };
      const headers = { ...oauth.toHeader(oauth.authorize(request_data)) };

      try {
        const res = await axios.get(url, { headers });

        const childCategories = res.data.filter(
          (cat: any) =>
            cat.parent > 0 && 
            cat.slug.toLowerCase() !== "uncategorized" &&
            cat.count >= 0
        );

        setCategories(childCategories);
      } catch (err) {
        // console.error("Failed to fetch categories", err);
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
