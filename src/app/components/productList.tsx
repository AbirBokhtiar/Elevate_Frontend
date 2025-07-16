"use client";

import React, { useEffect, useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from 'next/navigation';
import { useCart } from '../cart/cart';

const ProductList = ({ limit }: { limit?: number }) => {
  const searchParams = useSearchParams();
  const categorySlug = searchParams?.get("cat");
  const type = searchParams?.get("type");
  const min = searchParams?.get("min");
  const max = searchParams?.get("max");
  const orderby = searchParams?.get("orderby");
  const order = searchParams?.get("order");
  const { addToCart } = useCart();

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      try {
        const params = new URLSearchParams();

        if (categorySlug) {
          // Send category slug/name as is. Your backend can handle resolving category ID.
          params.append("category", categorySlug);
        }

        if (type) params.append("type", type);
        if (min) params.append("min_price", min);
        if (max) params.append("max_price", max);
        if (orderby) params.append("orderby", orderby);
        if (order) params.append("order", order);

        const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
        const url = `${apiBaseUrl}/woocommerce/products${params.toString() ? `?${params.toString()}` : ''}`;

        const res = await fetch(url);
        if (!res.ok) throw new Error(`Failed to fetch products: ${res.statusText}`);
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setProducts([]);
      }
      setLoading(false);
    };

    fetchProducts();
  }, [categorySlug, type, min, max, orderby, order]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {(limit ? products.slice(0, limit) : products).map((product: any) => (
        <div
          key={product.id}
          className="bg-white border border-gray-200 shadow-lg rounded-2xl overflow-hidden flex flex-col transition-transform hover:-translate-y-1 hover:shadow-xl duration-200"
        >
          <Link href={`/product/${product.slug}`} className="block group">
            <div className="mt-4 mx-auto rounded-lg relative w-65 h-56 bg-gray-100">
              <Image
                src={product.images[0]?.src || "/placeholder.png"}
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
                    image: product.images[0]?.src || "/placeholder.png",
                    quantity: 1,
                    stock_status: product.stock_status,
                    short_description:
                      typeof product.short_description === "string"
                        ? product.short_description.replace(/<[^>]+>/g, "")
                        : "",
                  })
                }
                className="flex items-center justify-center rounded-full bg-black text-white w-10 h-10 transition-all duration-200 hover:bg-red-600 group/addtocart overflow-hidden"
                title="Add to Cart"
                style={{ minWidth: '2.5rem', minHeight: '2.5rem' }}
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








// // /src/app/components/ProductList.tsx
// "use client";

// import React, { useEffect, useState } from 'react';
// import Image from "next/image";
// import Link from "next/link";
// import { useSearchParams } from 'next/navigation';
// import axios from 'axios';
// import OAuth from 'oauth-1.0a';
// import crypto from "crypto";
// import { useCart } from '../cart/cart';


// const ProductList = ({ limit }: { limit?: number }) => {
//   const searchParams = useSearchParams();
//   const categorySlug = searchParams?.get("cat");
//   const type = searchParams?.get("type");
//   const min = searchParams?.get("min");
//   const max = searchParams?.get("max");
//   const orderby = searchParams?.get("orderby");
//   const order = searchParams?.get("order");
//   const { addToCart } = useCart();

//   const [products, setProducts] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       setLoading(true);
//       try {
//         const params = new URLSearchParams();

//         if (categorySlug) {
//           const categoryUrl = `${BASE_URL}/products/categories?name=${categorySlug}`;
//           const categoryRequest = { url: categoryUrl, method: "GET" };
//           const categoryHeaders = { ...oauth.toHeader(oauth.authorize(categoryRequest)) };
//           const categoryRes = await axios.get(categoryUrl, { headers: categoryHeaders });

//           const foundCategory = categoryRes.data.find(
//             (cat: any) => cat.name.toLowerCase() === categorySlug.toLowerCase()
//           );

//           if (foundCategory?.id) {
//             params.append("category", String(foundCategory.id));
//           }
//         }

//         if (type) params.append("type", type);
//         if (min) params.append("min_price", min);
//         if (max) params.append("max_price", max);
//         if (orderby) params.append("orderby", orderby);
//         if (order) params.append("order", order);

//         const productUrl = params.toString()
//           ? `${BASE_URL}/products?${params.toString()}`
//           : `${BASE_URL}/products`;
//         const productRequest = { url: productUrl, method: "GET" };
//         const productHeaders = { ...oauth.toHeader(oauth.authorize(productRequest)) };

//         const res = await axios.get(productUrl, { headers: productHeaders });
//         setProducts(res.data);
//       } catch (err) {
//         console.error("Error fetching products:", err);
//         setProducts([]);
//       }
//       setLoading(false);
//     };

//     fetchProducts();
//   }, [categorySlug, type, min, max, orderby, order]);

//   if (loading) return <div>Loading...</div>;

//   return (
//     <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//       {(limit ? products.slice(0, limit) : products).map((product: any) => (
//         <div
//           key={product.id}
//           className="bg-white border border-gray-200 shadow-lg rounded-2xl overflow-hidden flex flex-col transition-transform hover:-translate-y-1 hover:shadow-xl duration-200"
//         >
//           <Link href={`/product/${product.slug}`} className="block group">
//             <div className="mt-4 mx-auto rounded-lg relative w-65 h-56 bg-gray-100">
//               <Image
//                 src={product.images[0]?.src || "/placeholder.png"}
//                 alt={product.name}
//                 fill
//                 sizes="20vw"
//                 className="object-cover rounded-2xl transition-transform duration-200 group-hover:scale-105"
//               >
//               </Image>
//             </div>
//           </Link>
//           <div className="flex flex-col flex-1 p-5">
//             <div className="flex items-center justify-between mb-2">
//               <h3 className="text-lg font-semibold text-gray-900 truncate">{product.name}</h3>
//               <button
//                 onClick={() =>
//                   addToCart({
//                     id: product.id,
//                     name: product.name,
//                     price: product.price,
//                     image: product.images[0]?.src || "/placeholder.png",
//                     quantity: 1,
//                     stock_status: product.stock_status,
//                     short_description:
//                       typeof product.short_description === "string"
//                         ? product.short_description.replace(/<[^>]+>/g, "")
//                         : "",
//                   })
//                 }
//                 className="flex items-center justify-center rounded-full bg-black text-white w-10 h-10 transition-all duration-200 hover:bg-red-600 group/addtocart overflow-hidden"
//                 title="Add to Cart"
//                 style={{ minWidth: '2.5rem', minHeight: '2.5rem' }}
//               >
//                 <span className="block text-xl font-bold">+</span>
//               </button>
//             </div>

//             <p className="text-gray-500 text-sm mb-4 line-clamp-2">
//               {product.short_description?.replace(/<[^>]+>/g, '') || 'No description available.'}
//             </p>
//             <div className="flex items-center justify-between mb-4">
//               <span className="text-xl font-bold text-black-500">${product.price}</span>
//               <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">{product.type}</span>
//             </div>
//             <div className="flex gap-3 mt-auto">
//               <Link
//                 href={`/product/${product.slug}`}
//                 className="flex-1 inline-block text-center rounded-lg border border-black-500 text-black-500 py-2 px-4 text-sm font-medium hover:bg-red-500 hover:text-white transition-colors"
//               >
//                 View Details
//               </Link>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ProductList;


