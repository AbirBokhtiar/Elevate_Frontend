'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProductImage from "@/app/components/productImage";
import CustomizeProducts from "@/app/components/customizeProducts";
import Add from "@/app/components/add";
import { Suspense } from "react";
import OAuth from "oauth-1.0a";
import crypto from "crypto";
import axios from "axios";
import ProductReview from "@/app/components/productReviews";
import SubmitReviewForm from "@/app/components/reviewForm";
import SimilarProducts from "@/app/components/recommendation";

const ProductPage = () => {
  const params = useParams();
  const slug = typeof params?.slug === "string" ? params.slug : Array.isArray(params?.slug) ? params?.slug[0] : "";
  const [product, setProduct] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [productList, setProductList] = useState<any[]>([]);

  useEffect(() => {
    const fetchProduct = async () => {
      // const url = `${BASE_URL}/woocommerce/product/${slug}&_fields=id,name,description,regular_price,sale_price,images`;
      // const request_data = { url, method: "GET" };
      // const headers = { ...oauth.toHeader(oauth.authorize(request_data)) };

      try {
        // const res = await axios.get(url, { headers });
        // if (res.data.length > 0) {
          //   setProduct(res.data[0]);
          // }
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/woocommerce/product/${slug}`);
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };

    fetchProduct();
  }, [slug]);


  useEffect(() => {
      const fetchAllProducts = async () => {
          try {
              // const productListUrl = `${BASE_URL}/products`;
              // const productListRequest = { url: productListUrl, method: "GET" };
              // const productHeaders = { ...oauth.toHeader(oauth.authorize(productListRequest)) };

              // const productListRes = await axios.get(productListUrl, { headers: productHeaders });

              // // Extract product names (or slugs, or both)
              // const products = productListRes.data.map((p: any) => ({
              //   name: p.name,
              //   slug: p.slug,
              //   category: p.categories?.[0]?.name || "",
              // }));
              // setProductList(products);

              const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/woocommerce/products`);
              if (!res.ok) throw new Error('Failed to fetch products');
              const data = await res.json();

              const products = data.map((p: any) => ({
                name: p.name,
                slug: p.slug,
                category: p.categories?.[0]?.name || "",
              }));
              setProductList(products);

          } catch (err) {
              setProductList([]);
          }
      };
      fetchAllProducts();
  }, []);


  useEffect(() => {
    const fetchReviews = async () => {
      // const url = `${BASE_URL2}/products/${product.id}/reviews`;
      // const request_data = { url, method: "GET" };
      // const headers = { ...oauth.toHeader(oauth.authorize(request_data)) };
      
      try {
        // const res = await axios.get(url, { headers });
        // setReviews(res.data);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/woocommerce/reviews/${product.id}`);
        const data = await res.json();
        setReviews(data);

      } catch (err) {
        console.error("Failed to load reviews", err);
      }
    };

    if (product?.id) {
      fetchReviews();
    }
  }, [product]);


  if (!product) return <p className="p-8">Loading product...</p>;


  return (
    <div className="px-4 py-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16">
      {/* IMG */}
      {/* <div className="p-2 w-full lg:w-1/2 lg:sticky top-20 h-max">
        <img
          src={product.images?.[0]?.src}
          alt={product.name}
          className="w-full object-cover rounded-lg"
        />
      </div> */}
      <div className="p-2 w-full lg:w-1/2 lg:sticky top-20 h-max object-cover rounded-lg">
        {/* <ProductInfo items={product.media?.items} /> */}
        <ProductImage product = {product} />
        <SimilarProducts
          productName={product.name}
          category={product.categories?.[0]?.name || ""}
          productList={productList}
        />
      </div>

      {/* TEXTS */}
      <div className="p-2 w-full lg:w-1/2 flex flex-col gap-6">
        <h1 className="text-4xl font-medium">{product.name}</h1>
        <p>
            <span className="font-medium text-2xl line-through mr-2 text-red-400">Tk. {product.regular_price}</span>
            <span className="font-medium text-2xl">Tk. {product.sale_price}</span>
        </p>
        
        <p
          className="text-gray-500"
          dangerouslySetInnerHTML={{ __html: product.description }}
        />
        <div className="h-[2px] bg-gray-100" />

        <div className="h-[2px] bg-gray-100" />

        <CustomizeProducts />
        <Add products={product} />

        <div className="h-[2px] bg-gray-100" />
        <h1 className="text-2xl">User Reviews</h1>
        <Suspense fallback="Loading reviews...">
          <ProductReview reviews={reviews} />
        </Suspense>
        
        <div>
        {/* <h1 className="text-2xl">Drop a review</h1> */}
        <SubmitReviewForm productId={product.id} />
      </div>
      </div>
      
    </div>
  );
};

export default ProductPage;
