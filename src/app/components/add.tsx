"use client";

import React, { useEffect, useState } from 'react';
import { useCart } from '../cart/cart';
import { useParams } from "next/navigation";
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

const Add = ({ products }: { products: any[] }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [addCartDisable, setAddCartDisable] = useState(false);
  const [cart_State, setCartState] = useState(false);

  useEffect(() => {
    const updateCartButtonState = () => {
      const cartRaw = localStorage.getItem("cart-storage");
      if (!cartRaw || !product) {
        setAddCartDisable(false);
        return;
      }

      const cart = JSON.parse(cartRaw);
      const items = cart?.state?.items || [];

      const currentProductInCart = items.find((item: any) => item.id === product.id);
      const quantityInCart = currentProductInCart?.quantity || 0;
      const stock = product?.stock_quantity ?? 5;

      // Disable button if stock is depleted in cart
      setAddCartDisable(quantityInCart >= stock);
    };

    updateCartButtonState();

    // Listen for storage updates (multi-tab safety and cart changes)
    window.addEventListener("storage", updateCartButtonState);

    // Listen for custom event in case cart is updated in this tab
    const handleCartUpdate = () => updateCartButtonState();
    window.addEventListener("cart-updated", handleCartUpdate);

    return () => {
      window.removeEventListener("storage", updateCartButtonState);
      window.removeEventListener("cart-updated", handleCartUpdate);
    };
  }, [product]);



  const params = useParams();
  const slug = typeof params?.slug === "string"
    ? params.slug
    : Array.isArray(params?.slug)
    ? params?.slug[0]
    : "";

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const url = `${BASE_URL}/products?slug=${slug}`;
      const request_data = { url, method: "GET" };
      const headers = { ...oauth.toHeader(oauth.authorize(request_data)) };

      try {
        const res = await axios.get(url, { headers });
        if (res.data.length > 0) {
          setProduct(res.data[0]);
        }
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  if (loading) return <p className="p-8">Loading product...</p>;
  if (!product) return <p className="p-8 text-red-600">Product not found</p>;

  const stock = product.stock_quantity ?? 5; // Fallback to 5 if not available
  const cartRaw = typeof window !== "undefined" ? localStorage.getItem("cart-storage") : null;
  const cart = cartRaw ? JSON.parse(cartRaw) : null;
  const items = cart?.state?.items || [];
  const itemInCart = items.find((item: any) => item.id === product.id);
  const quantityInCart = itemInCart?.quantity || 0;
  const stockLeft = stock - quantityInCart;

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0]?.src || "",
      quantity,
      stock_status: product.stock_status,
      short_description:
        typeof product.short_description === "string"
          ? product.short_description.replace(/<[^>]+>/g, "")
          : "",
    });

    // Dispatch a custom event to notify cart updates in this tab
    window.dispatchEvent(new Event("cart-updated"));
  };

  // Handle quantity increment/decrement
  const handleQuantity = (type: "i" | "d") => {
    setQuantity((prev) => {
      if (type === "i" && prev < stock - quantityInCart) return prev + 1;
      if (type === "d" && prev > 1) return prev - 1;
      return prev;
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <h4 className="font-medium">Choose a Quantity</h4>
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-gray-100 py-2 px-4 rounded-3xl flex items-center justify-between w-32">
            <button
              className="cursor-pointer text-xl disabled:opacity-30"
              onClick={() => handleQuantity("d")}
              disabled={quantity === 1}
            >
              -
            </button>
            {quantity}
            <button
              className="cursor-pointer text-xl disabled:opacity-30"
              onClick={() => handleQuantity("i")}
              disabled={quantity + quantityInCart >= stock}
            >
              +
            </button>
          </div>
          {stock < 1 ? (
            <div className="text-xs text-red-500">Product is out of stock</div>
          ) : (
            <div className="text-xs">
              Only <span className="text-orange-500">{stock - quantityInCart} items</span> left!
              <br /> Don’t miss it!
            </div>
          )}
        </div>
        <button
          onClick={handleAddToCart}
          className="w-36 text-sm rounded-3xl ring-1 border border-red-500 text-red-500 py-2 px-4 hover:bg-red-500 hover:text-white disabled:cursor-not-allowed disabled:bg-pink-200"
          disabled={addCartDisable || stock < 1}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Add;
